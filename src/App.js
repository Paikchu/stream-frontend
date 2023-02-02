import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from "./pages/Error";
import SignIn from "./components/SignIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "sign-in",
        element: <SignIn/>,
    },
]);


function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
