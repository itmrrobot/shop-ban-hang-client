import Home from "../pages/Home";
import Login from "../components/Login";
import Product from "../components/Product";
import ProductsPage from "../pages/Products";
import Cart from "../components/Cart";
import ListProduct from "../components/ListProduct";
import AddProduct from "../components/AddProduct";
import Dashboard from "../components/Dashboard";
import Resgister from "../components/Resgister";
import EditProduct from "../components/EditProduct";
import EditAccount from "../components/EditAccount";
import Account from "../components/Account";


export const publicRoutes = [
    {path: '/',Component: Home},
    {path: '/login',Component: Login},
    {path: '/register',Component: Resgister},
    {path:'/products',Component: ProductsPage},
    {path:'/products/:id',Component: Product},
    {path:'/cart',Component: Cart}
]

export const privateUserRoutes = [
    {path:'/account',Component:Account},
    {path:'/account/edit',Component:EditAccount}
]

export const privateRoutes = [
    {path: '/login/admin',Component: Dashboard},
    {path: '/login/admin/products',Component: ListProduct},
    {path: '/login/admin/products/create',Component: AddProduct},
    {path: '/login/admin/products/edit/:id',Component: EditProduct}
]