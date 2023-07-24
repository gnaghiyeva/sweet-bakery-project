import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import AddCategory from "../pages/Admin/Counts/AddCategory";
import AdminCategories from "../pages/Admin/Counts/AdminCategories";
import EditCategory from "../pages/Admin/Counts/EditCategory";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminLogos from "../pages/Admin/Logo/AdminLogos";
import EditLogo from "../pages/Admin/Logo/EditLogo";
import AddServices from "../pages/Admin/Services/AddServices";
import AdminServices from "../pages/Admin/Services/AdminServices";
import EditService from "../pages/Admin/Services/EditService";
import AddSlider from "../pages/Admin/Sliders/AddSlider";
import AdminSliders from "../pages/Admin/Sliders/AdminSliders";
import EditSlider from "../pages/Admin/Sliders/EditSlider";

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
            },
            {
                path:'sliders',
                element:<AdminSliders/>
            },
            {
                path:'slider/edit/:id',
                element:<EditSlider/>
            },
            {
                path:'add-slider',
                element:<AddSlider/>
            },
            {
                path:'services',
                element:<AdminServices/>
            },
            {
                path:'service/edit/:id',
                element:<EditService/>
            },
            {
                path:'add-service',
                element:<AddServices/>
            },
            {
                path:'categories',
                element:<AdminCategories/>
            },
            {
                path:'category/edit/:id',
                element:<EditCategory/>
            },
            {
                path:'add-category',
                element:<AddCategory/>
            }


            ]
    }
]