import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeBody from './components/HomeBody';
import ErrorPage from "./pages/Error";
import SignIn from "./components/SignIn";
import NavBarG from "./components/NavBarG";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeBody />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <HomeBody />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/user-sign-in",
        element: <SignIn name="user" />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/com-sign-in",
        element: <SignIn name="com" />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/man-sign-in",
        element: <SignIn name="man" />,
        errorElement: <ErrorPage />,
    }
]);


function App() {
    return (
        <div>
            <NavBarG />
            <div className="PageBody">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
