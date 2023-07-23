import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminLogos from "../pages/Admin/Logo/AdminLogos";
import EditLogo from "../pages/Admin/Logo/EditLogo";

import Home from "../pages/Main/Home/Home";
import MainRoot from "../pages/Main/MainRoot";
import UserLogin from "../pages/Main/UserLogin";

export const ROUTES = [
    {
        path:'/',
        element:<MainRoot/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            
            {
                path:'/login',
                element:<UserLogin/>
            }
            

        ]
    },

    


    {
        path:'/admin',
        element:<AdminRoot/>,
        children:[
            {
                path:'',
                element:<Dashboard/>
            },
            {
                path:'login',
                element:<AdminLogin/>
            },
            {
                path:'logo',
                element:<AdminLogos/>
            },
            {
                path:'logo/edit/:id',
                element:<EditLogo/>
            }
            ]
    }
]