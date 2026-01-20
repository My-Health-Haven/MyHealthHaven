# MyHealth Haven

MyHealth Haven is a web application designed to guide Americans in accessing medical care in Mexico. It serves as a bridge between patients and vetted hospitals, offering transparency, safety, and personalized support.

## Technology Stack

This project is built with a performance-oriented stack:

- **React**: The library for web and native user interfaces.
- **Vite**: Next Generation Frontend Tooling for fast development and building.
- **Material UI (MUI)**: A comprehensive library of React UI components.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Router**: For client-side routing.
- **GSAP**: Professional-grade JavaScript animation.
- **Lucide React**: Icon library.

## Project Structure

Here is a quick overview of the most important files and folders:

```text
/
├── public/              # Static assets (images, pdfs, video)
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context definitions
│   ├── layout/          # Layout components (Navbar, Footer, Layout)
│   ├── pages/           # Page components
│   ├── theme.js         # Global MUI theme configuration
│   ├── App.jsx          # Main application component and routing setup
│   └── main.jsx         # Application entry point
├── Dockerfile           # Docker configuration
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## Getting Started

To run this project locally on your machine:

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

This will start the local server, usually at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

## Docker Deployment

This application includes a multi-stage `Dockerfile`.

### Build Container

```bash
docker build -t healthhaven .
```

### Run Container

```bash
docker run -p 8080:80 healthhaven
```

Access the application at `http://localhost:8080`.

## Customization Guide

### 1. Changing Colors & Fonts (Theme)

The global design system is managed by Material UI in `src/theme.js`.

- **Colors**: Edit the `palette` object.
- **Fonts**: Edit the `typography` object.

### 2. Editing Page Content

Each page has its own file in `src/pages/`. Most text content is centralized in `src/data/translations.js` to support internationalization.

- **Home Page**: `src/pages/Home.jsx`
- **Medical Travel**: `src/pages/MedicalTravel.jsx`
- **Procedures**: `src/pages/Procedures.jsx`
- **Navigators**: `src/pages/Navigators.jsx`
- **Contact**: `src/pages/Contact.jsx`
- **Schedule**: `src/pages/Schedule.jsx` (Appointment Calendar)

### 3. Modifying Navigation

- Open `src/layout/Navbar.jsx`.
- Update the `navItems` array.

## License

This project is proprietary software. All rights reserved.
