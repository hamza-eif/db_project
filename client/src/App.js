import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/Page-Comp/Footer";
import NavbarStudent from "./components/Page-Comp/NavbarStudent";
import LoginStudentComp from './components/authentication/student/LoginStudentComponent'

// add react-bootstrap css file:
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterStudentComponent from "./components/authentication/student/RegisterStudentComponent";

import MultiStepForm from "./components/authentication/student/StepperForm";


const loc = window.location.hostname;
const subdomain = loc.split('.')[0]; // Extract the subdomain
console.log("Subdomain:", subdomain);

let routes = [];

if (subdomain === 'teacher') {
  routes = [
    {
      path: "/",
      element: <LayoutForTeacher/>,
      children: [
        {
          path: "/",
          element: <h1>Welcome,  Teacher</h1>,
        },
        // Add teacher-specific routes here
      ],
    },
  ];
//   student Routes
} else {
  routes = [
    {
      path: "/",
      element: <LayoutForStudent />,
      children: [
        {
          path: "/",
          element:<MultiStepForm/>
        },
        // Add other routes here
      ],
    },
  ];
}

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

// Layout Component For student
function LayoutForStudent() {
  return (
    <div>
      <NavbarStudent/>
      <Outlet />
      <Footer />
    </div>
  );
}
// layout Cpmp for Teacher
function LayoutForTeacher() {
    return (
      <div>
        {/* <Navbar /> */}
        <Outlet />
        <Footer />
      </div>
    );
  }

export default App;
