import "./Login.css";
import {useState,useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import { AuthState } from "../../store/AuthProvider";
import axios from "axios";
import { url } from "../../constants";

//const url = "https://api.escuelajs.co/api/v1/auth/login";

function Login() {
    const {setAuth,setUser,setIsLogin} = AuthState();
    const navigate = useNavigate();
    const initialValues = {email:'',password:''};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [errorMeg,setErrorMeg] = useState('');
    const [dataUsers,setDataUsers] = useState([]);

    const validate = (values) => {
        const msg = {};
        const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.email) {
            msg.email = 'Email là bắt buộc';
        } else if(!regex.test(values.email)) {
            msg.email = 'Email ko hợp lệ';
        }
        if(!values.password) {
            msg.password = 'Mật khẩu là bắt buộc';
        } 
        return msg;
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    // useEffect(() => {
    //     const controller = new AbortController();
    //     try {
    //         const fetchData = async () => {
    //             const respone = await axios.get(url+'/users',{
    //                 signal: controller.signal
    //             })
    //             setDataUsers(respone.data)
    //         }
    //         fetchData();
    //     } catch(e) {
    //         console.log(e);
    //     }
    //     return () => {
    //         controller.abort();
    //     }
    // },[]);

    const handleSubmit = async(e) => {

        e.preventDefault();
        setFormErrors(validate(formValues));
        try {
            const res = await axios.post(url+'/user/login',formValues);
            setUser(res.data);
            setIsLogin(true);
            navigate('/');
        } catch(e) {
            throw new Error(e);
        }
        // const user = dataUsers.find((data) => {
        //     return data.email===formValues.email&&data.password===formValues.password;
        // })
        // if(user) {
        //     const {email,password,role} = user;
        //     setAuth({email,password,role});
        //     setUser(user);
        //     setIsLogin(true);
        //     if(user.role==='admin') navigate('/login/admin');
        //     else {
        //         navigate('/');
        //     }
        // } else {
        //     setErrorMeg("Missing email or password!");
        // }
    }
    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="form-title">Đăng nhập</h3>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" className="form-input" onChange={handleChange} value={formValues.email}/>
                    {formErrors.email && <p className='message-error'>{formErrors.email}</p>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" className="form-input" onChange={handleChange} value={formValues.password}/>
                    {formErrors.password && <p className='message-error'>{formErrors.password}</p>}
                </div>
                <div className="form-group-btn">
                    <div className="remember">
                        <input type="checkbox" name="remember" className="checkbox"/>
                        Nhớ mật khẩu
                    </div>
                    <a href="/">Quên?</a>
                </div>
                <button type="submit" className="submit">Đăng nhập</button>
                <p>Bạn chưa có tài khoản?<Link to="/register">Đăng ký tại đây</Link></p>
            </form>
        </div>
    )
}

export default Login;