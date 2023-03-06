import {createHashRouter} from "react-router-dom";
import PageOne from "../pages/PageOne";
import PageTwo from "../pages/PageTwo";


const routes = [
    {
        path: '/pageone',
        element: <PageOne />,
    },
    {
        path: '/pagetwo',
        element: <PageTwo />
    }
]

export const router = createHashRouter(routes);