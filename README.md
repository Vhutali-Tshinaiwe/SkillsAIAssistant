# SkillsDesk AI – AI Workplace Productivity Assistant

## Project Overview

**SkillsDesk AI** is an AI-powered workplace productivity assistant designed specifically for administrators working at **skills development and training service providers**.

Administrators in this environment often have to manage a large amount of paperwork, documentation, emails, meeting notes, project information, contracts, deadlines and follow-ups. Handling these tasks manually can be time-consuming and make it difficult to keep information organised.

SkillsDesk AI aims to make these administrative responsibilities easier by using artificial intelligence to assist with everyday documentation and productivity tasks. The application brings several AI-powered tools into one workspace, helping administrators create professional emails, summarise meeting notes and organise their workload.

The application is designed to be simple and accessible, allowing users to access the tools without creating an account or signing in.

---

## Features Implemented

### 1. Smart Email Generator

The Smart Email Generator uses AI to create professional emails based on information provided by the user.

**Features include:**

* User-provided email purpose and context
* Key points/information input
* AI-generated email content
* Three tone options:

  * Formal
  * Friendly
  * Persuasive
* Editable AI-generated output
* Copy-to-clipboard functionality

### 2. Meeting Notes Summarizer

The Meeting Notes Summarizer uses AI to process lengthy meeting notes and convert them into a structured summary.

**The AI extracts:**

* Key Points
* Decisions
* Action Items
* Deadlines

The generated results can be reviewed, edited and copied by the user.

### 3. AI Task Planner

The AI Task Planner helps administrators organise their workload by generating structured schedules from their tasks, priorities and deadlines.

**Features include:**

* Daily planning
* Weekly planning
* AI-powered task prioritisation
* Urgency and deadline consideration
* Editable generated schedules

---

## Technologies & Tools Used

* **Frontend:** React
* **Language:** JavaScript / TypeScript
* **Styling:** CSS / Tailwind CSS
* **Build Tool:** Vite
* **AI:** AI model/API integration
* **Development Platform:** Lovable
* **Version Control:** Git / GitHub
* **Design Approach:** Responsive SaaS dashboard interface

> Technologies may vary depending on the final implementation.

---

## Setup Instructions

### Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* Access to the required AI API
* The project files downloaded or cloned from the repository

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd skillsdesk-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the AI API

Create a `.env` file in the root directory and add the required AI API credentials.

```env
VITE_AI_API_KEY=your_api_key_here
```

**Do not commit API keys or other sensitive credentials to GitHub.**

### 5. Start the Development Server

```bash
npm run dev
```

The application should then be available through the local development URL provided by Vite.

---

## Responsible AI

SkillsDesk AI is designed to assist administrators with workplace productivity and documentation. AI-generated information should be reviewed before being used for professional communication, documentation or decision-making.

The application displays the following disclaimer:

> **“AI-generated content may contain errors. Review and verify outputs before using them for professional decisions or communication.”**

Users remain responsible for reviewing and verifying AI-generated content.

---

## Access

SkillsDesk AI does not require users to create an account, register or sign in. The application is designed to be accessible immediately through the web interface.

No user accounts or persistent user database are required for the core application.

---

## Team Members

**Team Name:** SkillsDesk AI

**Team Members:**

* Vhutali Tshinaiwe

---

## Project Purpose

The purpose of **SkillsDesk AI** is to support administrators at **skills development and training service providers** who regularly deal with large amounts of paperwork, documentation and administrative communication.

By using AI to assist with tasks such as email writing, meeting documentation and task planning, SkillsDesk AI aims to **reduce repetitive administrative work, improve organisation and make everyday administrative processes more efficient**.
