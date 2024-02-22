import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Root from './routes/root';
import ProfilePage from './routes/profile-page';
import ErrorPage from './error-page';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/profile/:profileId",
        element: <ProfilePage/>
    }
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);