import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRoot from "../pages/Admin/AdminRoot";
import AddDetail from "../pages/Admin/Blogs/BlogDetail/AddDetail";
import AdminBlogDetail from "../pages/Admin/Blogs/BlogDetail/AdminBlogDetail";
import EditBlogDetail from "../pages/Admin/Blogs/BlogDetail/EditBlogDetail";
import AddBlogSlider from "../pages/Admin/Blogs/BlogSliders/AddBlogSlider";
import AdminBlogSliders from "../pages/Admin/Blogs/BlogSliders/AdminBlogSliders";
import EditBlogSlider from "../pages/Admin/Blogs/BlogSliders/EditBlogSlider";
import AddBlog from "../pages/Admin/Blogs/MyBlogs/AddBlog";
import AdminBlogs from "../pages/Admin/Blogs/MyBlogs/AdminBlogs";
import EditBlog from "../pages/Admin/Blogs/MyBlogs/EditBlog";
import AdminContact from "../pages/Admin/Contact/ContactData/AdminContact";
import EditContact from "../pages/Admin/Contact/ContactData/EditContact";
import AdminContactSliders from "../pages/Admin/Contact/ContactSlider/AdminContactSliders";
import EditContactSlider from "../pages/Admin/Contact/ContactSlider/EditContactSlider";
import AddCategory from "../pages/Admin/Counts/AddCategory";
import AdminCategories from "../pages/Admin/Counts/AdminCategories";
import EditCategory from "../pages/Admin/Counts/EditCategory";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminLogos from "../pages/Admin/Logo/AdminLogos";
import EditLogo from "../pages/Admin/Logo/EditLogo";
import AdminNotFound from "../pages/Admin/NotFound/AdminNotFound";
import AddPrice from "../pages/Admin/Prices/AddPrice";
import AdminPrices from "../pages/Admin/Prices/AdminPrices";
import EditPrice from "../pages/Admin/Prices/EditPrice";
import AddProduct from "../pages/Admin/Products/AddProduct";
import AdminProducts from "../pages/Admin/Products/AdminProducts";
import EditProduct from "../pages/Admin/Products/EditProduct";
import AdminProductSliders from "../pages/Admin/Products/ProductSliders/AdminProductSliders";
import EditProductSlider from "../pages/Admin/Products/ProductSliders/EditProductSlider";
import AddServices from "../pages/Admin/Services/AddServices";
import AdminServices from "../pages/Admin/Services/AdminServices";
import EditService from "../pages/Admin/Services/EditService";
import AddProgress from "../pages/Admin/Skills/AddProgress";
import AddSkill from "../pages/Admin/Skills/AddSkill";
import AdminSkills from "../pages/Admin/Skills/AdminSkills";
import EditProgress from "../pages/Admin/Skills/EditProgress";
import EditSkill from "../pages/Admin/Skills/EditSkill";
import AddSlider from "../pages/Admin/Sliders/AddSlider";
import AdminSliders from "../pages/Admin/Sliders/AdminSliders";
import EditSlider from "../pages/Admin/Sliders/EditSlider";
import AddPerson from "../pages/Admin/Team/AddPerson";
import AdminTeam from "../pages/Admin/Team/AdminTeam";
import EditPerson from "../pages/Admin/Team/EditPerson";
import AddWork from "../pages/Admin/Works/AddWork";
import AdminWorks from "../pages/Admin/Works/AdminWorks";
import EditWork from "../pages/Admin/Works/EditWork";
import Blog from "../pages/Main/Blog/Blog";
import MyBlogDetail from "../pages/Main/Blog/MyBlogs/MyBlogDetail";
import Contact from "../pages/Main/Contact/Contact";

import Home from "../pages/Main/Home/Home";
import MainRoot from "../pages/Main/MainRoot";
import NotFound from "../pages/Main/NotFound/NotFound";
import Basket from "../pages/Main/Shop/Basket";
import ProductDetail from "../pages/Main/Shop/ProductDetail";
import ShopPage from "../pages/Main/Shop/ShopPage";
import UserLogin from "../pages/Main/UserLogin";

export const ROUTES = [
    {
        path: '/',
        element: <MainRoot />,
        children: [
            {
                path: '',
                element: <Home />
            },

            {
                path: '/login',
                element: <UserLogin />
            },

            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/blog/:id',
                element: <MyBlogDetail />
            },
            {
                path:'/shop',
                element:<ShopPage/>
            },
            {
                path:'/shop/favourites',
                element:<Basket/>
            },
            {
                path:'/shop/:id',
                element:<ProductDetail/>
            },
            {
                path:'/contact',
                element:<Contact/>
            },
            {
                path:'*',
                element:<NotFound/>
            }




        ]
    },




    {
        path: '/admin',
        element: <AdminRoot />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'login',
                element: <AdminLogin />
            },
            {
                path: 'logo',
                element: <AdminLogos />
            },
            {
                path: 'logo/edit/:id',
                element: <EditLogo />
            },
            {
                path: 'sliders',
                element: <AdminSliders />
            },
            {
                path: 'slider/edit/:id',
                element: <EditSlider />
            },
            {
                path: 'add-slider',
                element: <AddSlider />
            },
            {
                path: 'services',
                element: <AdminServices />
            },
            {
                path: 'service/edit/:id',
                element: <EditService />
            },
            {
                path: 'add-service',
                element: <AddServices />
            },
            {
                path: 'categories',
                element: <AdminCategories />
            },
            {
                path: 'category/edit/:id',
                element: <EditCategory />
            },
            {
                path: 'add-category',
                element: <AddCategory />
            },
            {
                path: 'works',
                element: <AdminWorks />
            },
            {
                path: 'work/edit/:id',
                element: <EditWork />
            },
            {
                path: 'add-work',
                element: <AddWork />
            },
            {
                path: 'prices',
                element: <AdminPrices />
            },
            {
                path: 'price/edit/:id',
                element: <EditPrice />
            },
            {
                path: 'add-price',
                element: <AddPrice />
            },
            {
                path: 'team',
                element: <AdminTeam />
            },
            {
                path: 'team/edit/:id',
                element: <EditPerson />
            },
            {
                path: 'add-person',
                element: <AddPerson />
            },
            {
                path: 'skills',
                element: <AdminSkills />
            },
            {
                path: 'skills/edit/:id',
                element: <EditSkill />
            },
            {
                path: 'add-skill',
                element: <AddSkill />
            },
            {
                path: 'progress/edit/:id',
                element: <EditProgress />
            },
            {
                path: 'add-progress',
                element: <AddProgress />
            },
            {
                path: 'blogs',
                element: <AdminBlogs />
            },
            {
                path: 'add-blog',
                element: <AddBlog />
            },
            {
                path: 'blog/edit/:id',
                element: <EditBlog />
            },
            {
                path: 'blog/:id',
                element: <AdminBlogDetail />
            },
            {
                path: 'blogs/slider',
                element: <AdminBlogSliders />
            },
            {
                path: 'blogs/slider/add-slider',
                element: <AddBlogSlider />
            },
            {
                path: 'blogs/slider/edit/:id',
                element: <EditBlogSlider />
            },
            {
                path:'blogdetail/edit/:id',
                element:<EditBlogDetail/>
            },
            {
                path:'blog-detail/add-detail',
                element:<AddDetail/>
            },
            {
                path: 'shop',
                element: <AdminProducts />
            },
            {
                path:'shop/edit/:id',
                element:<EditProduct/>
            },
            {
                path: 'add-product',
                element: <AddProduct/>
            },
            {
                path: 'product-slider',
                element: <AdminProductSliders/>
            },
            {
                path: 'product-slider/edit/:id',
                element: <EditProductSlider/>
            },
            
            {
                path: 'contact',
                element: <AdminContact/>
            },
            {
                path: 'contact/edit/:id',
                element: <EditContact/>
            },
            {
                path: 'contact-slider',
                element: <AdminContactSliders/>
            },
            {
                path: 'contact-slider/edit/:id',
                element: <EditContactSlider/>
            },
            {
                path: '*',
                element:<AdminNotFound/>
            }

]
    }
]