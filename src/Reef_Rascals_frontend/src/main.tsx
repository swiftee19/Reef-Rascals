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
import AquariumPage from './routes/aquarium-page';
import { AuthContextProvider } from './middleware/middleware';
import RascalDetailPage from './routes/rascal-detail-page';
import LoadingPage from "./components/loading-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/marketplace",
        element: <MarketPage/>,
    },
    {
        path: "/details/:rascalId",
        element: <RascalDetailPage/>,
    },
    {
        path: "/aquarium",
        element: <AquariumPage/>,
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
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </React.StrictMode>
);