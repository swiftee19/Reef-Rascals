import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ProfilePage from './routes/profile-page';
import ErrorPage from './error-page';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import HomePage from './routes/home-page';
import MarketPage from './routes/market-page';
import MatchPage from './routes/match-page';
import TestingPage from './routes/testing-page';
import AquariumPage from './routes/aquarium-page';
import { AuthContextProvider } from './middleware/middleware';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/marketplace",
        element: <MarketPage />,
    },
    {
        path: "/aquarium",
        element: <AquariumPage />,
    },
    {
        path: "/profile/:profileId",
        element: <ProfilePage />,
    },
    {
        path: "/match",
        element: <MatchPage />,
    },
    {
        path: "/testing",
        element: <TestingPage />,
    }
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);