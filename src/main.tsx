import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,

  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.tsx';
import Chat from './pages/Chat.tsx';
import Register from './pages/Register.tsx';
import { ConversationsProvider } from './context/ConversationsContext.tsx';

const router = createBrowserRouter([

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Chat />,
  },


  {
    path: "/register",
    element: <Register />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(

  <ConversationsProvider>
    <RouterProvider router={router} />
  </ConversationsProvider>
)
