import {Home} from './pages/Home.jsx'
import {About} from './pages/About.jsx'
import {ToyApp} from './pages/ToyApp.jsx'
import {ToyDetails} from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Login } from './pages/Login.jsx';
import { ReviewsPage } from './pages/ReviewsPage.jsx';
import { UserDetails } from './pages/UserDetails.jsx';

const routes = [
    {
        path:'/',
        component: Home,
    },
    {
        path:'/toy',
        component: ToyApp,
    },
    {
        path:'/about',
        component: About,
    },
    {
        path:'/dashboard',
        component: Dashboard,
    },
    {
        path:'/login',
        component: Login,
    },
    {
        path:'/reviews',
        component: ReviewsPage,
    },
    {
        path:'/user/:id',
        component: UserDetails,
    },
    {
        path:'/toy/details/:toyId',
        component: ToyDetails,
    },
    {
        path:'/toy/edit/:toyId',
        component: ToyEdit,
    }
]

export default routes;