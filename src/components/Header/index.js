import './Header.css';
import './HeaderResponsive.css';
import {Link,useNavigate} from 'react-router-dom';
import { CartState } from '../../store/Context';
import { useState } from 'react';
import { AuthState } from '../../store/AuthProvider';
import axios from 'axios';
import { url } from '../../constants';
import { MessageState } from '../../store/MessageContext';

function Header() {
    const {state:{quantity},productDispatch,dispatch} = CartState();
    const {user,isLogin,setIsLogin,setUser} = AuthState();
    const navigate = useNavigate();
    const [isClick,setIsClick] = useState(false);
    const [isClickAvatar,setIsClickAvatar] = useState(false);
    const {setModalSuccess} = MessageState();
    const handleSearch = (e) => {
      if(e.which===13) {
        navigate('/products');
        productDispatch({type:"GETSEARCH",payload:e.target.value});
      }
    }

    const listenHomeClick = () => {
      productDispatch({type:"CLEARFILTER"});
    }

    const handleLogout = async() => {
      try {
        const res = await axios.post(`${url}/user/logout`,undefined,{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        setModalSuccess(false);
        setIsClick(false);
        setIsClickAvatar(false);
        setUser(null);
        localStorage.setItem('user',null);
        setIsLogin(false);
        dispatch({type:"CLEARCART"})
        navigate('/');
      } catch(e) {
        throw new Error(e);
      }
    }

    //console.log(user.token)
    return (
      <div className="wrapper-header">
        <div className="navbar">
          <div className="nav">
            <div className="nav-wrap flx3">
              <div className="nav-item hide">
                <Link to="/" className="nav-link" onClick={listenHomeClick}>
                  CDIOSHOP
                </Link>
              </div>
              <div className="nav-item dropdown hide">
                <div className="dropdown-header">Danh mục</div>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/products">
                    Giày
                  </Link>
                  <Link className="dropdown-item" to="/products">
                    Đồng hồ
                  </Link>
                  <Link className="dropdown-item" to="/products">
                    Quần áo
                  </Link>
                </div>
              </div>
              <div className="search">
                <Link to="/products" className="search-icon">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#000"
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
                    />
                  </svg>
                </Link>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="input-search"
                  onKeyDown={handleSearch}
                />
              </div>
              <div className="nav-item hide">
                <Link to="/products" className="nav-link">
                  Sản phẩm
                </Link>
              </div>
            </div>
            <div className="nav-wrap flx1 flx-right">
              <div className="nav-item">
                <Link to="/cart" className="nav-link">
                  <div className="cart">
                    <svg
                      className="cart-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="#fff"
                        d="M24 0H0V48H24 76.1l60.3 316.5 3.7 19.5H160 488h24V336H488 179.9l-9.1-48H496L576 32H122l-2.4-12.5L115.9 0H96 24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"
                      />
                    </svg>
                    <div className="number-cart">
                      <span>{quantity}</span>
                    </div>
                  </div>
                </Link>
              </div>
              {isLogin===false&&user===null ? (
                <>
                  <div className="nav-item hide">
                    <Link to="/login" className="nav-link">
                      Đăng nhập
                    </Link>
                  </div>
                  <div className="nav-item hide">
                    <Link to="/register" className="nav-link">
                      Đăng kí
                    </Link>
                  </div>
                </>
              ) : (
                <div className="nav-item hide">
                  <div className="wrap-avatar" onClick={(e) => {setIsClickAvatar(!isClickAvatar)}}>
                    <img
                      src={user&&user.user.avatar}
                      alt="avatar"
                      className="avatar-user"
                    />
                    <span className="avatar-name">{user&&user.user.name}</span>
                    <div className="arrow-down">
                      <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#fff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                    </div>
                    <div className="avatar-dropdown t-56" onClick={(e) => e.stopPropagation()} style={isClickAvatar === true ? { display: "block" } : { display: "none" }}>
                      <div className="avatar-dropdown-list">
                        <Link to={user&&user.user.role==='admin'?'/login/admin':'/account'} className="avatar-dropdown-item avatar-link">
                          <div className="item-icon">
                            {user&&user.user.role!=='admin'?<svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                            </svg>:<svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>}
                          </div>
                          <span className="info-name">{user&&user.user.role==='admin'?'Quản lý':'Tài khoản'}</span>
                        </Link>
                        <div className="avatar-dropdown-item" onClick={handleLogout}>
                          <svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M534.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L434.7 224 224 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-53 0-96 43-96 96l0 256c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
                          <span className="info-name">Đăng xuất</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="sidenav-wrap">
                <div className="sidenav-icon" onClick={() => setIsClick(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="#fff"
                      d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="sidenav hideOnPC show"
                style={isClick === true ? { width: "100%" } : { width: "0" }}
              >
                <button className="closebtn" onClick={() => setIsClick(false)}>
                  &times;
                </button>
                <Link
                  to="/"
                  className="sidenav-link"
                  onClick={() => setIsClick(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="sidenav-link"
                  onClick={() => setIsClick(false)}
                >
                  Sản phẩm
                </Link>
                {isLogin===false?<><Link to="/login" className="sidenav-link" onClick={() => setIsClick(false)}>
                  Đăng nhập
                </Link>
                <Link to="/register" className="sidenav-link" onClick={() => setIsClick(false)}>
                  Đăng kí
                </Link></>:<>
                <Link to={user&&user.user.role==='admin'?'/login/admin':'/'} className="sidenav-link">{user&&user.user.admin==='admin'?'Quản lý':'Tài khoản'}</Link>
                <Link to="/" className="sidenav-link" onClick={handleLogout}>Đăng xuất</Link>
                </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Header;