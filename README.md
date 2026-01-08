# Kanban Board Application

This is a simple Kanban board application with a React frontend and a Node.js/Express backend. Tasks can be added, moved between columns (To Do, In Progress, Done), edited, and deleted. The tasks are persisted using a JSON file on the backend.

## Features

-   Add new tasks with title, description, and status.
-   Move tasks between "To Do", "In Progress", and "Done" columns using drag-and-drop.
-   Edit task title and description.
-   Delete tasks.
-   Persists tasks using a local JSON file on the backend.

## Project Structure

-   `backend/`: Contains the Node.js/Express server.
    -   `server.js`: Main server file.
    -   `routes/tasks.js`: API routes for task CRUD operations.
    -   `models/tasks.json`: Simple JSON file for data persistence.
-   `frontend/`: Contains the React application.
    -   `src/App.jsx`: Main React component.
    -   `src/components/Board.jsx`: Kanban board component with drag-and-drop.
    -   `src/components/Column.jsx`: Component for each Kanban column.
    -   `src/components/Task.jsx`: Component for individual task cards.

## How to Run Locally

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (comes with Node.js)

### 1. Clone the repository (if applicable)

If you have cloned this project from a repository, navigate to the project root directory.

### 2. Start the Backend Server

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Start the backend server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000` (by default) and will automatically restart if you make changes to the backend code.

### 3. Start the Frontend Application

1.  Open a new terminal window and navigate to the `frontend` directory from the project root:
    ```bash
    cd frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install --legacy-peer-deps
    ```
    (Note: `--legacy-peer-deps` is used to avoid peer dependency conflicts with `react-beautiful-dnd`.)
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173`.

You should now see the Kanban board in your browser.

## Extra Credit Notes

-   **Deployment:** This setup can be easily deployed. The `backend` could be deployed to a service like Render or Vercel (for serverless functions), and the `frontend` to Netlify or Vercel.
-   **Database:** The current backend uses a simple `tasks.json` file for persistence. For a production environment, you would replace this with a proper database like MongoDB, PostgreSQL, or MySQL, and update the `tasks.js` routes accordingly.
-   **Styling:** Basic inline styles and `App.css`/`index.css` are used for styling. For a more robust solution, a CSS framework (e.g., Tailwind CSS, Bootstrap) or a styling library (e.g., Styled Components) could be integrated.
# kanban
