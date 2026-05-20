# Blog Application Frontend

This directory contains the user interface and client-side logic for the Blog Platform Capstone Project. It is a modern, responsive Single Page Application (SPA) built using React and Vite.

## Folder Structure

The frontend is structured to promote reusability and maintainability of UI components and state management.

```text
frontend/
├── public/                # Static assets (favicons, manifest, raw files) not processed by Vite
├── src/                   # Main source code for the React application
│   ├── assets/            # Images, global CSS files, and other media processed by Vite
│   ├── components/        # Reusable UI components used across different pages
│   │   ├── Header.jsx     # Navigation bar component
│   │   ├── Footer.jsx     # Footer component
│   │   └── ...            # Other shared components (Buttons, Cards, Modals)
│   ├── AuthStore/         # Zustand state management stores
│   │   └── useAuth.js     # Global state for managing user authentication, sessions, and roles
│   ├── App.jsx            # Main application component, handles routing configuration (React Router)
│   ├── main.jsx           # Entry point of the React app, mounts App to the DOM
│   ├── index.css          # Global TailwindCSS imports and root styling
│   └── App.css            # Component-specific global styles (if needed)
├── package.json           # Frontend dependencies and npm scripts
├── vite.config.js         # Configuration for the Vite bundler (plugins, server options)
└── tailwind.config.js     # Configuration for TailwindCSS theme, colors, and utility classes
```

## Packages & Technologies Used

- **`react` & `react-dom`**: The core library for building the interactive user interface using a component-based architecture.
- **`vite`**: A blazing fast frontend build tool and development server, providing near-instant Hot Module Replacement (HMR) and optimized production builds.
- **`react-router`** (v7): Standard routing library for React applications. Enables navigation between different views/pages (like Home, Login, Dashboard) without reloading the browser.
- **`zustand`**: A small, fast, and scalable bearbones state-management solution. Used in `AuthStore/` to globally manage the user's logged-in state and profile data across the app without prop drilling.
- **`tailwindcss` & `@tailwindcss/vite`**: A utility-first CSS framework for rapidly building custom, responsive designs directly in the JSX classes without leaving the HTML.
- **`axios`**: Promise-based HTTP client for the browser. Used to make asynchronous requests (GET, POST, PUT, DELETE) to the backend API.
- **`react-hook-form`**: Performant, flexible, and extensible forms with easy-to-use validation. Used to manage form state and inputs in Login, Registration, and Blog creation forms.
- **`react-hot-toast`**: A lightweight library for adding beautiful notifications and toast messages (e.g., "Login Successful", "Error occurred") to the application.
- **`lucide-react` & `react-icons`**: Extensive libraries of scalable, customizable SVG icons used throughout the UI to enhance visual cues and buttons.
- **`cors`**: Included for any local client-side dev requirements, though primarily handled by the backend.

## How It Works

1. **Entry & Routing**: The app starts at `main.jsx`, rendering the `App.jsx` component. `App.jsx` sets up the `react-router` allowing users to navigate to different views based on the URL path.
2. **State Management**: The `zustand` store (`AuthStore`) initializes and checks if a user session exists. The UI (like the `Header`) reacts to this state, showing either "Login/Register" or the user's profile and a "Logout" button.
3. **API Integration**: Components make calls to the backend using `axios`. Form submissions are handled effortlessly via `react-hook-form`, sending validated data to the server.
4. **Styling**: `tailwindcss` provides utility classes, ensuring the application is fully responsive across mobile, tablet, and desktop screens with minimal custom CSS.

## Setup & Running Locally

1. Install the necessary dependencies: 
   ```bash
   npm install
   ```
2. Start the Vite development server: 
   ```bash
   npm run dev
   ```
3. The application will run (typically on `http://localhost:5173` or `http://localhost:5176`), providing an interactive environment with instant feedback on code changes.

## Initial Project Setup Commands

If you are recreating this project from scratch, these are the initial commands used to initialize the frontend environment:

```bash
# 1. Create a new React project using Vite
npm create vite@latest frontend -- --template react

# 2. Navigate into the directory and install base dependencies
cd frontend
npm install

# 3. Install TailwindCSS (v4) and its Vite plugin
npm install @tailwindcss/vite tailwindcss

# 4. Install routing, state management, API client, and icons
npm install react-router zustand axios lucide-react react-icons

# 5. Install form handling and UI libraries
npm install react-hook-form react-hot-toast cors
```
