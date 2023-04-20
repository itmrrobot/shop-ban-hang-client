import "./HeaderAD.css";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";
import { AuthState } from "../../store/AuthProvider";
import { url } from "../../constants";
import axios from "axios";
import { CartState } from "../../store/Context";
import { MessageState } from "../../store/MessageContext";

function HeaderAD() {
  const [isClick,setIsClick] = useState(false); 
  const {setIsLogin,user,setUser} = AuthState();
  const {dispatch} = CartState();
  const [isClickAvatar,setIsClickAvatar] = useState(false);
  const navigate = useNavigate();
  const {modalSuccess,setModalSuccess} = MessageState();

  const handleLogout = async() => {
    try {
      const res = await axios.post(url+'/user/logout',undefined,{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      setIsClick(false);
      setModalSuccess(false);
      setUser(null);
      localStorage.setItem('user',null);
      setIsLogin(false);
      dispatch({type:"CLEARCART"});
      navigate('/');
    } catch(e) {
      throw new Error(e);
    }
  }

    return (
      <div className="headerAD-wrap">
        <Link to="/" className="headerAD-title">CDIO SHOP</Link>
        <div className="headerAD-name">
          <div className="headerAD-wrapper">
            <div
              className="wrap-avatar hide"
              onClick={() => setIsClickAvatar(!isClickAvatar)}
            >
              <img src={user.user.avatar} alt="avatar" className="avatar-user" />
              <span className="avatar-name">{user&&user.user.name}</span>
              <div className="arrow-down">
                <svg
                  width="12px"
                  height="12px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="#fff"
                    d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                  />
                </svg>
              </div>
              <div
                className="avatar-dropdown t-36"
                onClick={(e) => e.stopPropagation()}
                style={
                  isClickAvatar === true
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <div className="avatar-dropdown-list">
                  <Link to="/login/admin" className="avatar-dropdown-item avatar-link">
                    <div className="item-icon">
                      <svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                    </div>
                    <span className="info-name">Quản lý</span>
                  </Link>
                  <div
                    className="avatar-dropdown-item"
                    onClick={handleLogout}
                  >
                    <svg
                      width="18px"
                      height="18px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                    </svg>
                    <span className="info-name">Đăng xuất</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sidenav-icon show hideOnPC"
              onClick={() => setIsClick(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="#fff"
                  d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </div>
            <div
              className="sidenav hideOnPC show"
              style={isClick === true ? { width: "100%" } : { width: "0" }}
            >
              <button className="closebtn" onClick={() => setIsClick(false)}>
                &times;
              </button>
              <Link
                to="/login/admin"
                className="sidenav-link"
                onClick={() => setIsClick(false)}
              >
                Quản lý
              </Link>
              <Link
                to="/login/admin/products"
                className="sidenav-link"
                onClick={() => setIsClick(false)}
              >
                Sản phẩm
              </Link>
              <Link to="/" className="sidenav-link">
                Đơn đặt hàng
              </Link>
              <Link
                to="/products"
                className="sidenav-link"
                onClick={() => setIsClick(false)}
              >
                Người dùng
              </Link>
              <Link
                to="/login"
                className="sidenav-link"
                onClick={handleLogout}
              >
                Đăng xuất
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HeaderAD;