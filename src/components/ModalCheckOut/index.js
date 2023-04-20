import styles from './ModalCheckOut.module.scss';
import classNames from 'classnames/bind';
import { CartState } from '../../store/Context';
import { useEffect, useState } from 'react';
import { AuthState } from '../../store/AuthProvider';
import { Link } from 'react-router-dom';
import { url } from '../../constants/index';
import axios from 'axios';
import { MessageState } from '../../store/MessageContext';

const cx = classNames.bind(styles);

function ModalCheckOut() {
    const {state:{isCheckOut,products,paymentMethod,total},dispatch} = CartState();
    const {user} = AuthState();
    const initialValues = {fullname:user?.user.fullname,email:user?.user.email,address:user?.user.address,phone:user?.user.phone}
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const {modalSuccess,setModalSuccess} = MessageState();
    //const [success,setSuccess] = useState(false);
    const date = new Date();

    const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
    }

    const validate = (values) => {
      const msg = {};
      const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!values.fullname) {
        msg.fullname = 'Họ tên là bắt buộc';
      }
      if(!values.email) {
        msg.email = 'Email là bắt buộc';
      } else if(!regx.test(values.email)) {
        msg.email = 'Email không hợp lệ';
      }
      if(!values.address) {
        msg.address = 'Địa chỉ là bắt buộc';
      }
      if(!values.phone) {
        msg.phone = 'Số điện thoại là bắt buộc';
      }
      return msg;
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      try {
        if(formValues.fullname!==''&&formValues.address!==''&&formValues.email!==''&&formValues.phone!=='') {
          await axios.post(url+'/orders',{orderDate:date,status:"Đang vận chuyển",total:total,paymentMethod:paymentMethod},{
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          setModalSuccess(true);
          dispatch({type:"CLEARCARTBUTNOTCLOSEMESSAGE",payload:isCheckOut});
        } else {
          setModalSuccess(false);
        }
      } catch(e) {
        throw new Error(e);
      }
    }

    return (
      <>
        {user!==null?<>
        
        {isCheckOut && (
          <div
            className={cx("modal")}
            onClick={(e) => {
              dispatch({ type: "SHOWMESSAGE", payload: false });
              e.stopPropagation();
            }}
          ></div>
        )}
        {isCheckOut&& (
          <div className={cx("modal-content")}>
            {modalSuccess === false ?<>
              <h3 className={cx("modal-title")}>Xác nhận thông tin</h3>
              <div className={cx("modal-body")}>
                <form className={cx("modal-form")} onSubmit={handleSubmit}>
                  <div className={cx("modal-form-wrap")}>
                    <div className={cx("form-group-left")}>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Họ tên</span>
                        <input
                          type="text"
                          name="fullname"
                          placeholder="Họ tên"
                          value={formValues.fullname}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.name && (
                          <p className={cx("message")}>{formErrors.fullname}</p>
                        )}
                      </div>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Email</span>
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={formValues.email}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.email && (
                          <p className={cx("message")}>{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className={cx("form-group-right")}>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Địa chỉ</span>
                        <input
                          type="text"
                          name="address"
                          placeholder="Địa chỉ"
                          value={formValues.address}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.address && (
                          <p className={cx("message")}>{formErrors.address}</p>
                        )}
                      </div>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Số điện thoại</span>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Số điện thoại"
                          value={formValues.phone}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.phone && (
                          <p className={cx("message")}>{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={cx("right")}>
                    <button type="submit" className={cx("btn-submit")}>
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
              <button
                className={cx("btn-close")}
                onClick={(e) => {
                  dispatch({ type: "SHOWMESSAGE", payload: false });
                  e.stopPropagation();
                }}
              >
                &times;
              </button>
            </>:<>
              <h3 className={cx("modal-title")}>Cảm ơn vì đã mua sản phẩm của chúng tôi</h3>
              <div className={cx('model-content')}>Vui lòng kiểm tra email của bạn để nhận hàng</div>
              <button
                className={cx("btn-close")}
                onClick={(e) => {
                  dispatch({ type: "SHOWMESSAGE", payload: false });
                  e.stopPropagation();
                }}
              >
                &times;
              </button>
            </>}
          </div>
        )}
        </>:<>
        {isCheckOut && (
          <div
            className={cx("modal")}
            onClick={(e) => {
              dispatch({ type: "SHOWMESSAGE", payload: false });
              e.stopPropagation();
            }}
          ></div>
        )}
        {isCheckOut && (
          <div className={cx('modal-content')}>
            <h3 className={cx("modal-title")}>Bạn phải đăng nhập để thanh toán</h3>
            <Link to="/login" onClick={(e) => {dispatch({ type: "SHOWMESSAGE", payload: false });e.stopPropagation();}}>Đăng nhập tại đây</Link>
            <button
                className={cx("btn-close")}
                onClick={(e) => {
                  dispatch({ type: "SHOWMESSAGE", payload: false });
                  e.stopPropagation();
                }}
              >
                &times;
              </button>
          </div>
        )}
        </>}
      </>
    );
}

export default ModalCheckOut;