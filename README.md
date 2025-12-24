# 🏥 HealthQueue: Digital Triage & Queue Management

**Prioritizing Care, Not Just Position.**

HealthQueue is a modern, smart triage system designed for government hospitals to move beyond the traditional First-In-First-Out (FIFO) model. By leveraging clinical triage standards (ABDM), the system ensures that patients with urgent medical needs are prioritized dynamically, reducing critical wait times and improving healthcare outcomes.

---

## ✨ Features

- 🩺 **Clinical Triage Engine**: Automatically categorizes patients into priority levels (Emergency, Urgent, Routine) based on symptom severity.
- 👨‍⚕️ **Doctor Dashboard**: A specialized workspace for healthcare providers to manage the live priority queue, call patients, and view clinical history.
- 📱 **Real-time Patient Tracking**: Live queue updates accessible via smartphones, significantly reducing overcrowding in waiting halls.
- 🔒 **Secure & Compliant**: Built with **HL7 FHIR** standards and **AES-256 encryption** to ensure maximum data privacy and interoperability.
- 📊 **Queue Insights**: Real-time analytics on wait times, patient flow, and triage accuracy.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context API
- **Typography**: Outfit & Geist Sans
- **Icons**: Lucide-inspired SVG components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/health-queue.git
    cd health-queue
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```text
health-queue/
├── app/                  # Next.js App Router
│   ├── book/             # Patient appointment booking
│   ├── context/          # Global state (Queue Management)
│   ├── doctor/           # Doctor dashboard & workspace
│   ├── login/            # Authentication
│   ├── signup/           # User registration
│   └── queue/            # Live queue visualization
├── public/               # Static assets
└── Health care Management system.pdf # Original project requirements
```


## 🎨 Design Philosophy

HealthQueue uses a **Medical-Grade Aesthetic**:
- **Clean & Accessible**: High contrast and readable typography.
- **Glassmorphism**: Subtle translucent layers for a modern, digital health feel.
- **Priority Signaling**: Intuitive color coding (Red for Emergency, Amber for Severe, Blue for Routine).
- **Responsive**: Fully optimized for tablets, desktops, and mobile screens.

## 📄 License

This project is licensed under the MIT License.

---

*Developed with ❤️ for better healthcare accessibility.*

