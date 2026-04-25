import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Alert, EmergencyType, Severity, AlertStatus } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const alertService = {
  async createAlert(data: Omit<Alert, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) {
    const path = 'alerts';
    try {
      const docRef = await addDoc(collection(db, path), {
        ...data,
        createdBy: auth.currentUser?.uid || 'anonymous',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'ACTIVE'
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  },

  async updateAlertStatus(alertId: string, status: AlertStatus) {
    const path = `alerts/${alertId}`;
    try {
      const docRef = doc(db, 'alerts', alertId);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  subscribeToAlerts(callback: (alerts: Alert[]) => void) {
    const path = 'alerts';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const alerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Alert[];
      callback(alerts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
  }
};
