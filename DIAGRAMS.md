# 📊 HealthQueue: Diagrams

This document contains the process flow and use-case diagrams for the **HealthQueue** system.

## 🔄 Process Flow Diagram

The process flow illustrates how a patient moves through the system, from initial symptom submission to consultation completion.

```mermaid
graph LR
    A[Patient: Submit Symptoms] --> B{Clinical Triage Engine}
    B -- Emergency --> C[Priority 1: Red]
    B -- Severe --> D[Priority 2: Amber]
    B -- Routine --> E[Priority 3: Blue]
    
    C & D & E --> F[Dynamic Queue Update]
    
    F --> G[Real-time Patient Notifications]
    F --> H[Doctor: View Prioritized Queue]
    
    H --> I[Doctor: Call Next Patient] --> J[Patient Consultation] --> K[Consultation Complete] --> L[Removed from Queue]
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

---

## 🏛️ Architecture Diagram

The system follows a modern N-tier architecture, leveraging **Next.js** for both the frontend and application logic, with a focus on real-time state synchronization via the **React Context API**.

```mermaid
graph TD
    subgraph "Client Layer (Frontend)"
        PC[Patient Portal / Mobile]
        DD[Doctor Dashboard / Desktop]
    end

    subgraph "Application Layer (Next.js & React)"
        AR[App Router / Navigation]
        QM[Queue Management Context]
        TE[Clinical Triage Engine]
        AUTH[Auth Services]
    end

    subgraph "Logic & Standards (Business Layer)"
        ABDM[ABDM Clinical Standards]
        HL7[HL7 FHIR Interoperability]
    end

    subgraph "Data Layer"
        DB[(State / Database)]
    end

    %% Connectivity
    PC <--> AR
    DD <--> AR
    AR <--> QM
    QM <--> TE
    TE <--> ABDM
    QM <--> HL7
    QM <--> DB
    AR <--> AUTH
```

### 🧱 Component Breakdown

1.  **Client Layer**: Responsive web interfaces tailored for two distinct experiences: heavy data interaction for doctors and quick, intuitive symptom submission for patients.
2.  **Application Layer**: 
    - **Queue Management Context**: Acts as the "Single Source of Truth," managing state across the entire application.
    - **Clinical Triage Engine**: The core algorithm that processes patient symptoms and assigns priority levels.
3.  **Logic & Standards**: Ensures the system remains compliant with national (ABDM) and international (HL7 FHIR) healthcare data standards.
4.  **Data Layer**: Responsible for persistent storage and the integrity of the dynamic triage records.

