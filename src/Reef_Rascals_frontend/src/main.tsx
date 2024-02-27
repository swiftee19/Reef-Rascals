import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProfilePage from './routes/profile-page';
import ErrorPage from './error-page';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import HomePage from './routes/home-page';
import MarketPage from './routes/market-page';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/marketplace",
        element: <MarketPage/>,
    },
    {
        path: "/profile/:profileId",
        element: <ProfilePage/>,
    }
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);