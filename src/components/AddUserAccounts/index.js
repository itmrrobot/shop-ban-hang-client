import styles from "./AddUserAccounts.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MessageState } from "../../store/MessageContext";
import axios from "axios";
import { url } from "../../constants";
import { AuthState } from "../../store/AuthProvider";

const cx = classNames.bind(styles);

function AddUserAccounts() {
    const {user} = AuthState();
    const initialValues = {fullname:'',name:'',email:'',address:'',phone:'',password:''};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    //const newFormValues = {title:formValues.title,price:formValues.price,description:formValues.description,images:[formValues.images]}
    const {setIsSuccess,setIsShow} = MessageState();

    const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
    }

    const validate = (values) => {
      const msg = {};

      if(!values.name) {
        msg.name = 'Tên đăng nhập là bắt buộc';
      }

      if(!values.fullname) {
        msg.fullname = 'Họ tên là bắt buộc';
      }

      if(!values.email) {
        msg.email = 'Email là bắt buộc';
      }

      if(!values.address) {
        msg.address = 'Địa chỉ là bắt buộc';
      }

      if(!values.phone) {
        msg.phone = 'SĐT là bắt buộc';
      }

      if(!values.password) {
        msg.password = 'Mật khẩu là bắt buộc';
      } else if(values.password.length<7) {
        msg.password = 'Mật khẩu phải có từ 7 ký tự';
      }

      return msg;
    }

    const handleAdd = async(e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      try {
        const respone = await axios.post(url+'/users',formValues,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        setIsSuccess(true);
        setIsShow(true);
      } catch(e) {
        console.log(e);
        setIsSuccess(false);
        setIsShow(true);
      }
      console.log(formValues);
    }
    return (
        <div className={cx("wrap")}>
        <h3 className={cx("title")}>Thêm tài khoản</h3>
        <div className={cx("content")}>
          <form className={cx("form-add-product")}>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Họ tên</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="fullname"
                placeholder="Họ tên"
                value={formValues.fullname}
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.fullname}</p>            
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Tên đăng nhập</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="name"
                value={formValues.name}
                placeholder="Tên đăng nhập"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.name}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Email</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="email"
                value={formValues.email}
                placeholder="Địa chỉ email"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.email}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Địa chỉ</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="address"
                value={formValues.address}
                placeholder="Địa chỉ"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.address}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>SĐT</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                placeholder="SĐT"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.phone}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Mật khẩu</h4>
              <div className={cx('form-wrap')}>
              <input
                type="password"
                name="password"
                value={formValues.password}
                placeholder="Mật khẩu"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.password}</p>
              </div>
            </div>
            <div className={cx('group-btn')}>
              <button className={cx('btn-create')} onClick={handleAdd}>Thêm</button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddUserAccounts;