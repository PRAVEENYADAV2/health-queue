# 📊 HealthQueue: Diagrams

This document contains the process flow and use-case diagrams for the **HealthQueue** system.

## 🔄 Process Flow Diagram

The process flow illustrates how a patient moves through the system, from initial symptom submission to consultation completion.

```mermaid
graph TD
    A[Patient: Submit Symptoms] --> B{Clinical Triage Engine}
    B -- Emergency --> C[Priority 1: Red]
    B -- Severe --> D[Priority 2: Amber]
    B -- Routine --> E[Priority 3: Blue]
    
    C --> F[Dynamic Queue Update]
    D --> F
    E --> F
    
    F --> G[Real-time Patient Notifications]
    F --> H[Doctor: View Prioritized Queue]
    
    H --> I[Doctor: Call Next Patient]
    I --> J[Patient Consultation]
    J --> K[Consultation Complete]
    K --> L[Removed from Queue]
```

---

## 👥 Use Case Diagram

The use-case diagram defines the interactions between the different actors (Patient, Doctor, and System) and the core functionalities of HealthQueue.

```mermaid
graph LR
    subgraph Actors
        P[Patient]
        D[Doctor]
        S[Triage System]
    end

    subgraph "HealthQueue System"
        UC1((Register & Login))
        UC2((Submit Symptoms & Book))
        UC3((Track Live Queue Position))
        UC4((View Prioritized List))
        UC5((Call Next Patient))
        UC6((Perform Clinical Triage))
        UC7((Manage Dynamic Ranks))
    end

    P --- UC1
    P --- UC2
    P --- UC3

    D --- UC1
    D --- UC4
    D --- UC5

    UC2 -.-> UC6
    UC6 -.-> UC7
    S --- UC6
    S --- UC7
```

---

## 📋 Role Definitions

| Actor | Responsibilities |
| :--- | :--- |
| **Patient** | Registers, provides medical symptoms, and monitors their position in the queue digitally. |
| **Doctor** | Accesses the live triage list, manages patient call-outs, and provides medical care based on priority. |
| **Triage System** | Automatically sorts patients based on clinical severity (ABDM standards) and maintains a dynamic queue. |
