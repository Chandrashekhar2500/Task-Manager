// Export all the public routes
import LandingPage from "../../pages/Landing";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";

export const PublicRoutes = [
  { path: "/login", exact: true, name: 'SignIn', component: SignIn },
  { path: "/", exact: true, name: 'LandingPage', component: LandingPage },
  { path: "/register", exact: true, name: 'SignUp', component: SignUp },
];
