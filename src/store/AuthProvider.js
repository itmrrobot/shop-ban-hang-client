import {createContext,useContext,useState,useEffect} from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [auth,setAuth] = useState({});
    const [user,setUser] = useState(null||JSON.parse(localStorage.getItem('user')));
    const [isLogin,setIsLogin] = useState(false);
    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(user))
    },[user])
    return(
        <AuthContext.Provider value={{auth,setAuth,user,setUser,isLogin,setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const AuthState = () => {
    return useContext(AuthContext);
}
