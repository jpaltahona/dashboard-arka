import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute.tsx';
import Home from './pages/Home/index.tsx';
import Login from './pages/Auth/Login.tsx';
import Users from './pages/Users/index.tsx';
import Journey from './pages/Journey/index.tsx';
import Learning from './pages/Learning/index.tsx';
import Supports from './pages/Supports/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth-content.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children:[
      {
        path: "Users",
        element: <Users />
      },
      {
        path: "Journey",
        element: <Journey />
      },
      {
        path: "Learning",
        element: <Learning />
      },
      {
        path: "Supports",
        element: <Supports />
      }, 
  ]
  },
 
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>,
)
