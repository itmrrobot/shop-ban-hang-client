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
import ManageOrders from "../components/ManageOrders";
import EditOrder from "../components/EditOrder";
import AddOrder from "../components/AddOrder";
import ManageUserAccounts from "../components/ManageUserAccounts";
import EditUserAccount from "../components/EditUserAccount";
import AddUserAccounts from "../components/AddUserAccounts";


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
    {path: '/login/admin/products/edit/:id',Component: EditProduct},
    {path:'/login/admin/orders',Component:ManageOrders},
    {path:'/login/admin/orders/edit/:id',Component:EditOrder},
    {path:'/login/admin/orders/create',Component:AddOrder},
    {path:'/login/admin/users',Component:ManageUserAccounts},
    {path:'/login/admin/users/edit/:id',Component:EditUserAccount},
    {path:'/login/admin/users/create',Component:AddUserAccounts}
]