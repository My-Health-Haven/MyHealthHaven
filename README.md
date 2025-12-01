# MyHealth Haven

MyHealth Haven is a modern web application designed to guide Americans in accessing world-class medical care in Mexico. It serves as a bridge between patients and vetted hospitals, offering transparency, safety, and personalized support.

## 🛠️ Technology Stack

This project is built with a modern, performance-oriented stack:

- **[React](https://react.dev/)**: The library for web and native user interfaces.
- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling for fast development and building.
- **[Material UI (MUI)](https://mui.com/)**: A comprehensive library of React UI components that implements Google's Material Design.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development (specifically used for new components like the Hero animation).
- **[React Router](https://reactrouter.com/)**: For client-side routing.

## 📂 Project Structure

Here is a quick overview of the most important files and folders:

```text
/
├── public/              # Static assets (images, logos)
├── src/
│   ├── components/      # Reusable UI components
│   │   └── Squares/     # The animated background component
│   ├── layout/          # Layout components (Navbar, Footer)
│   ├── pages/           # Page components (Home, MedicalTravel, etc.)
│   ├── theme.js         # Global MUI theme configuration (colors, fonts)
│   ├── App.jsx          # Main application component and routing setup
│   ├── main.jsx         # Application entry point
│   └── tailwind.css     # Tailwind CSS imports
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🚀 Getting Started

To run this project locally on your machine:

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Start Development Server**:

    ```bash
    npm run dev
    ```

    This will start the local server, usually at `http://localhost:5173`.

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🎨 Customization Guide

### 1. Changing Colors & Fonts (Theme)

The global design system is managed by Material UI in `src/theme.js`.

- **Colors**: Edit the `palette` object.
  - `primary.main`: The main teal color.
  - `secondary.main`: The purple accent color.
- **Fonts**: Edit the `typography` object.
- **Layout**: The `maxWidth` for containers is set here (currently `xl`).

### 2. Editing Page Content

Each page has its own file in `src/pages/`.

- **Home Page**: `src/pages/Home.jsx`
- **Medical Travel**: `src/pages/MedicalTravel.jsx`
- **Procedures**: `src/pages/Procedures.jsx`

You can edit the text, images, and layout directly in these files using JSX.

### 3. Modifying Navigation

To add or change menu items in the top navigation bar:

- Open `src/layout/Navbar.jsx`.
- Update the `navItems` array at the top of the file.
- Links use `react-router-dom`, so ensure the `href` matches a route defined in `src/App.jsx`.

### 4. Adding New Components

- Create a new folder in `src/components/` (e.g., `src/components/MyNewComponent/`).
- Add your `.jsx` and `.css` files there.
- Import and use it in your pages.

**Note on Tailwind**: If you are adding new components that use Tailwind CSS, they will work automatically as Tailwind is configured to scan all files in `src/`.

## 📝 License

This project is proprietary software. All rights reserved.
