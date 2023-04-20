import styles from "./Resgister.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import axios from 'axios';
import {url} from '../../constants/index';
import { AuthState } from "../../store/AuthProvider";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Resgister() {
    const avatarDefault = 'https://png.pngtree.com/png-clipart/20191121/original/pngtree-user-icon-png-image_5097430.jpg';
    const initialValue = {fullname:'',name:'',email:'',address:'',phone:'',password:'',avatar:avatarDefault};
    const [formValues,setFormValues] = useState(initialValue);
    const [formErrors,setFormErrors] = useState({});
    const [isSuccess,setIsSuccess] = useState(false);
    const {setUser,setIsLogin} = AuthState();
    const navigate = useNavigate();

    const validate = (values) => {
        const msg = {};
        const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.name) {
            msg.name = 'Tên là bắt buộc';
        } 
         if(!values.fullname) {
            msg.fullname = 'Họ tên là bắt buộc';
        } 
         if(!values.address) {
            msg.address = 'Địa chỉ là bắt buộc';
        } 
         if(!values.phone) {
            msg.phone = 'Số điện thoại là bắt buộc';
        }
        if(!values.email) {
            msg.email = 'Email là bắt buộc';
        } else if(!regex.test(values.email)) {
            msg.email = 'Email ko hợp lệ';
        } 

        if(!values.password) {
            msg.password = 'Mật khẩu là bắt buộc';
        } else if(values.password.length<6) {
            msg.password = 'Mật khẩu tối thiều phải 6 kí tự';
        }
        return msg;
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        // if(formErrors.name!==''&&formErrors.email!==''&&formErrors.password!=='') {
        //     setIsSuccess(true);
        //     setIsLogin(true);
        // } else {
        //     setIsSuccess(false);
        //     setIsLogin(false);
        // }
        try {
            const respone = await axios.post(url+'/user',formValues);
            setIsSuccess(true);
            setIsLogin(true);
            setUser(respone.data);
            localStorage.setItem("user",JSON.parse(respone.data));
        } catch(e) {
            throw new Error(e);
        }
    }

    const handleOK = () => {
        navigate('/');
    }

    const MessageSuccess = () => {
        return(
            <div className={cx('wrap-message')}>
                <div className={cx('icon-success')}>
                    <svg width='36px' height='36px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </div>
                <div className={cx('message-success')}>
                    <h3 className={cx('message-success-title')}>Đăng kí tài khoản thành công</h3>
                    <p className={cx('message-success-sentence')}>Vui lòng kiểm tra email</p>
                </div>
                <button className={cx('btn-ok')} onClick={handleOK}>OK</button>
            </div>
        )
    }

    return (
        <div className={cx('wrap-resgister')}>
            {isSuccess===false?
            <form className={cx('form-resgister')} onSubmit={handleSubmit}>
                <h3 className={cx('resgister-title')}>Đăng kí</h3>
                <div className={cx('form-resgister-group')}>
                    <input type="text" name="fullname" placeholder="Họ tên" value={formValues.fullname} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.fullname&&<p className={cx('message')}>{formErrors.fullname}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <input type="text" name="name" placeholder="Tên đăng nhập" value={formValues.name} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.name&&<p className={cx('message')}>{formErrors.name}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <input type="text" name="email" placeholder="Email" value={formValues.email} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.email&&<p className={cx('message')}>{formErrors.email}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <input type="text" name="address" placeholder="Địa chỉ" value={formValues.address} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.address&&<p className={cx('message')}>{formErrors.address}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <input type="text" name="phone" placeholder="Số điện thoại" value={formValues.phone} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.phone&&<p className={cx('message')}>{formErrors.phone}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <input type="password" name="password" placeholder="Mật Khẩu" value={formValues.password} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.password&&<p className={cx('message')}>{formErrors.password}</p>}
                </div>
                <button type="submit" className={cx('submit','submit-resgister')}>Đăng kí</button>
                <p>Bạn đã có tài khoản?<Link to="/login">Đăng nhập tại đây</Link></p>
            </form>
            :<MessageSuccess/>}
        </div>
    )
}

export default Resgister;