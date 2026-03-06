# Job Portal Application



A full-stack job portal web application built with the MERN stack (MongoDB, Express, React, Node.js). 

This project allows job seekers to browse through various job listings, filter them by categories, and apply. Employers can seamlessly post new jobs, edit them, and delete old listings.



## Features



- **Job Listings**: View all available job postings with essential details (title, company, salary in ₹, type, and location).

- **Dynamic Search & Filters**: Search jobs by query and filter them by minimum salary, location, and job type.

- **Job Management Dashboard**: Create, Read, Update, and Delete (CRUD) operations for job postings.

- **Responsive & Modern UI**: A clean, fully responsive interface powered by Tailwind CSS, DaisyUI components, and Framer Motion animations.

- **Contact Direct Links**: Automatically provides an email "mailto" link for quick application to jobs.



## Technology Stack



### Frontend

- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)**

- **[React Router](https://reactrouter.com/)** for client-side routing

- **[Tailwind CSS](https://tailwindcss.com/)** and **[DaisyUI](https://daisyui.com/)** for styling

- **[Framer Motion](https://www.framer.com/motion/)** for animated UI transitions

- **[Lucide React](https://lucide.dev/)** for icons

- **[Axios](https://axios-http.com/)** for network requests

- **[@fontsource/plus-jakarta-sans](https://fontsource.org/fonts/plus-jakarta-sans)** for typography



### Backend

- **[Node.js](https://nodejs.org/en/)** and **[Express.js](https://expressjs.com/)**

- **[MongoDB](https://www.mongodb.com/)** + **[Mongoose](https://mongoosejs.com/)** to model data

- **[CORS](https://www.npmjs.com/package/cors)** for handling cross-origin requests

- **[Dotenv](https://www.npmjs.com/package/dotenv)** for securing environment variables

- **Nodemon** for smooth backend development



## Project Setup & Installation



### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed, and a MongoDB cluster configured.



### 1. Clone the Repository



```bash

git clone <repo-url>

cd job-portal-

```



### 2. Backend Setup



Open a terminal and navigate to the backend folder:



```bash

cd backend



# Install backend dependencies

npm install

```



Create a `.env` file in the `backend` root and configure the following variables:

```env

PORT=3000

MONGODB_URI=<your_mongodb_connection_string>

```



Start the backend server in development mode:

```bash

npm run dev

```

The backend server will run on `http://localhost:3000`.



### 3. Frontend Setup



Open a new terminal and navigate to the frontend folder:



```bash

cd frontend



# Install frontend dependencies

npm install

```



Create a `.env` file or verify that your `.env.local` file contains the base URL configurations to hit the backend if needed (by default runs on `http://localhost:5173` pointing to `http://localhost:3000` context root via proxy or Axios base URL setup).



Run the frontend development server:

```bash

npm run dev

```



## Project Structure



```

job-portal-/

│

├── backend/               # Express.js Server

│   ├── src/

│   │   ├── controllers/   # Route handler logic

│   │   ├── models/        # Mongoose Schema Definitions

│   │   ├── routes/        # Express Routing

│   │   └── server.js      # Main App Server

│   ├── package.json

│   └── ...

│

├── frontend/              # React App

│   ├── src/

│   │   ├── components/    # Reusable React components (e.g., JobCard)

│   │   ├── pages/         # Page Views (Home, CreateJob, EditJob, JobDetail)

│   │   ├── lib/           # Axois config & utility methods

│   │   ├── App.jsx

│   │   └── main.jsx

│   ├── package.json

│   └── ...

│

└── package.json           # Root workspace config (if implemented)

```
