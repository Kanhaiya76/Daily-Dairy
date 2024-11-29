import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/Home';
import Layout from './Components/Layout';
import Login from './Components/Login';
import AddNew from './Components/AddNew';
import Entries from './Components/Entries';
import ViewEntry from './Components/ViewEntry';
import Register from './Components/Register';
import Journal from './Components/Journal';


const router = createBrowserRouter([
  {
    path: "/",
    element: < Home/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/journal",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Journal />,
      },
      {
        path: "new",
        element: <AddNew />
      },
      {
        path: "entries",
        children: [
          {
            path: "",
            element: <Entries />
          },
          {
            path: ":id",
            element: <ViewEntry />
          }
        ]
      }
    ],
  }
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
