import TaskManager from "../../dashboard";

export const PrivateRoutes = [
    { path: "/dashboard/*", exact: true, name: 'Dashboard', component: TaskManager }
];
