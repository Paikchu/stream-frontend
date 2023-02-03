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
        path: "sign-in",
        element: <SignIn/>,
        errorElement: <ErrorPage />,
    },
]);


function App() {
    return (
        <div>
            <NavBarG />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
