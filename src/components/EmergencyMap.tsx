import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { Alert } from '../types';
import { alertService } from '../services/alertService';

export const EmergencyMap: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [center, setCenter] = useState<[number, number]>([40.7128, -74.006]); // Default NYC

  useEffect(() => {
    const unsubscribe = alertService.subscribeToAlerts((data) => {
      setAlerts(data);
      if (data.length > 0 && data[0].location.latitude) {
        setCenter([data[0].location.latitude, data[0].location.longitude]);
      }
    });

    // Try to get current location for map center
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.log('Geolocation disabled or failed', err)
    );

    return () => unsubscribe();
  }, []);

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#FF0000';
      case 'HIGH': return '#FF6600';
      case 'MEDIUM': return '#FFCC00';
      default: return '#00CC00';
    }
  };

  return (
    <Map height={500} center={center} zoom={13}>
      {alerts.map((alert) => (
        <Marker 
          key={alert.id}
          width={50}
          anchor={[alert.location.latitude, alert.location.longitude]} 
          color={getMarkerColor(alert.severity)}
        />
      ))}
    </Map>
  );
};
