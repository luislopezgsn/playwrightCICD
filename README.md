# Playwright & CICD Learning Repository

Welcome! This repository serves as a dedicated learning environment for mastering **Playwright** end-to-end testing and **CI/CD** processes.
It includes a custom-built React learning sandbox filled with interactive challenge scenarios (such as authentication forms, dynamic data loading delays, state verification, and tricky hover states) designed specifically for you to practice your browser automation skills.

## 🚀 Getting Started

### 1. Launching the Sandbox App
The target application is built using Vite and React. Run the following commands to launch it locally:

```bash
cd frontend
npm install
npm run dev
```

The app will be served at `http://localhost:5173/`. 

### 2. Writing and Running Playwright Tests

A beginner-friendly test boilerplate is located at `tests/example.spec.ts`. Open that file to start writing your own tests against the sandbox!

When you're ready to execute your tests, return to the project root and run:
```bash
npx playwright test
```

If you prefer to see your tests visually in action with the Playwright UI (highly recommended for learning!):
```bash
npx playwright test --ui
```

### Git Workflow
From now on, we follow a branching strategy! Every major change, feature, or new learning module will be placed in its own dedicated branch. 
