"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const QueueContext = createContext();

export const SEVERITY_LEVELS = {
  VERY_SERIOUS: { id: 1, label: "Very Serious", color: "#ef4444", priority: 1, waitTime: "5-10 mins" },
  MEDIUM: { id: 2, label: "Medium", color: "#f59e0b", priority: 2, waitTime: "20-40 mins" },
  DAILY_CHECK: { id: 3, label: "Daily Check", color: "#10b981", priority: 3, waitTime: "1-2 hours" },
};

export function QueueProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Mock Auth
  const [history, setHistory] = useState([]);

  // Mock initial data
  useEffect(() => {
    const initialPatients = [
      { id: "P1", name: "Rahul Sharma", age: 45, severity: SEVERITY_LEVELS.MEDIUM, timestamp: Date.now() - 1000 * 60 * 15, condition: "Severe Stomach Pain" },
      { id: "P2", name: "Anjali Gupta", age: 28, severity: SEVERITY_LEVELS.DAILY_CHECK, timestamp: Date.now() - 1000 * 60 * 30, condition: "Routine check-up" },
    ];
    setPatients(initialPatients);
  }, []);

  const addPatient = (patientData) => {
    const newPatient = {
      id: `P${Math.floor(Math.random() * 10000)}`,
      ...patientData,
      timestamp: Date.now(),
    };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  };

  const callNextPatient = () => {
    if (patients.length === 0) return null;

    const sorted = getSortedQueue();
    const nextPatient = sorted[0];
    
    setPatients(prev => prev.filter(p => p.id !== nextPatient.id));
    setHistory(prev => [nextPatient, ...prev]);
    
    return nextPatient;
  };

  const getSortedQueue = () => {
    return [...patients].sort((a, b) => {
      // First sort by priority (lower number = higher priority)
      if (a.severity.priority !== b.severity.priority) {
        return a.severity.priority - b.severity.priority;
      }
      // Then sort by timestamp (older first)
      return a.timestamp - b.timestamp;
    });
  };

  const login = (email, password) => {
    if (email && password) {
      setCurrentUser({ email, role: "doctor", name: "Dr. Aryan" });
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  return (
    <QueueContext.Provider value={{ 
      patients, 
      setPatients, 
      currentUser, 
      login, 
      logout, 
      addPatient, 
      callNextPatient,
      getSortedQueue,
      history 
    }}>
      {children}
    </QueueContext.Provider>
  );
}

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) throw new Error("useQueue must be used within a QueueProvider");
  return context;
};
