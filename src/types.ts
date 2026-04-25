export type EmergencyType = 'FIRE' | 'MEDICAL' | 'POLICE' | 'DISASTER' | 'OTHER';
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'PENDING' | 'ACTIVE' | 'RESPONDING' | 'RESOLVED';

export interface Location {
  latitude: number;
  longitude: number;
  roomNumber?: string;
}

export interface Alert {
  id: string;
  type: EmergencyType;
  severity: Severity;
  message: string;
  location: Location;
  status: AlertStatus;
  createdBy: string;
  createdAt: number; // timestamp
  updatedAt: number;
}

export interface UserProfile {
  uid: string;
  role: 'ADMIN' | 'STAFF' | 'GUEST';
  name: string;
  email: string;
}
