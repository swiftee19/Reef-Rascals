import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import ProfilePage from './routes/profile-page';
import ErrorPage from './error-page';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Home from './routes/home-page';
import HomePage from './routes/home-page';
import MarketPage from './routes/market-page';
import MatchPage from './routes/match-page';

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
    },
    {
        path: "/match",
        element: <MatchPage/>,
    }
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);