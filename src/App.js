import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Orders from "./pages/Orders";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route index element={<Home />}/>
      <Route path="home" element={<Home />}/>
      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  );
}

export default App;
