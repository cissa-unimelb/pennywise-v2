import {createHashRouter} from "react-router-dom";
import PageOne from "../pages/PageOne";
import PageTwo from "../pages/PageTwo";
import {Login} from "../pages/Login";


const routes = [
    {
        path: '/',
        element: <PageOne />,
    },
    {
        path: '/pagetwo',
        element: <PageTwo />
    },
    {
        path: '/login',
        element: <Login />
    }
]

export const router = createHashRouter(routes);