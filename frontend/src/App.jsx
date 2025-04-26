import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home"
import VerifyOtp from "./pages/VerifyOtp"
import AllPlants from "./pages/AllPlants"
import PlantDetails from "./components/core/Plant/PlantDetails"
import ForgotPassword from "./pages/ForgetPassword"
import Community from "./pages/Community"

function App() {

  return (
    <div className="">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyOtp />
            </OpenRoute>
          }
        />

        <Route
          path="/allplants"
          element={
              <AllPlants />
          }
        />
         <Route
          path="/plant/:id"
          element={
            <OpenRoute>
              <PlantDetails />
            </OpenRoute>
          }
        />
        <Route path="/forgot-password"
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>
        <Route path='/community'
        element={
           <Community/>
        }/>
      </Routes>
    </div>
  );
}

export default App
