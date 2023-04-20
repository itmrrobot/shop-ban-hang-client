import { useState } from "react";
import styles from "./EditAccount.module.scss";
import classNames from "classnames/bind";
import { AuthState } from "../../store/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../constants";
import { MessageState } from "../../store/MessageContext";

const cx = classNames.bind(styles);

function EditAccount() {
  const {user} = AuthState();
  const initialValues = {fullname:user?.user.fullname,name:user?.user.name,email:user?.user.email,address:user?.user.address,phone:user?.user.phone,password:''};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const {setIsSuccess,setIsShow} = MessageState();
  const navigate = useNavigate();

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
    if(!values.password) {
        msg.password = 'Vui lòng nhập mật khẩu mới hoặc mật khẩu cũ';
    }
    return msg;
  }

  const handleBack = () => {
    navigate('/account');
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    try {
        const res = await axios.patch(url+'/user/me',formValues,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        setIsSuccess(true);
        setIsShow(true);
    } catch(e) {
        setIsSuccess(false);
        setIsShow(true);
    }
  };

  return (
    <form className={cx("wrap")} onSubmit={handleSubmit}>
      <h2 className={cx("title")}>Thông tin tài khoản</h2>
      <div className={cx("form-container")}>
        <div className={cx("form-group-wrap")}>
          <div className={cx("form-account-group")}>
            <label className={cx('form-name')}>Họ tên</label>
            <input
              type="text"
              name="fullname"
              placeholder="Họ tên"
              value={formValues.fullname}
              className={cx("form-input","w-400")}
              autoComplete="off"
              onChange={handleChange}
            />
            {formErrors.fullname && (
              <p className={cx("message-error")}>{formErrors.fullname}</p>
            )}
          </div>
          <div className={cx("form-account-group")}>
            <label className={cx('form-name')}>Tên đăng nhập</label>
            <input
              type="text"
              name="name"
              placeholder="Tên đăng nhập"
              value={formValues.name}
              className={cx("form-input","w-400")}
              autoComplete="off"
              onChange={handleChange}
            />
            {formErrors.name && (
              <p className={cx("message-error")}>{formErrors.name}</p>
            )}
          </div>
          <div className={cx("form-account-group")}>
            <label className={cx('form-name')}>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              className={cx("form-input","w-400")}
              autoComplete="off"
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className={cx("message-error")}>{formErrors.email}</p>
            )}
          </div>
        </div>
        <div className={cx("form-group-wrap")}>
          <div className={cx("form-account-group")}>
            <label className={cx('form-name')}>Địa chỉ</label>
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formValues.address}
              className={cx("form-input","w-400")}
              autoComplete="off"
              onChange={handleChange}
            />
            {formErrors.address && (
              <p className={cx("message-error")}>{formErrors.address}</p>
            )}
          </div>
          <div className={cx("form-account-group")}>
            <label className={cx('form-name')}>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formValues.phone}
              className={cx("form-input","w-400")}
              autoComplete="off"
              onChange={handleChange}
            />
            {formErrors.phone && (
              <p className={cx("message-error")}>{formErrors.phone}</p>
            )}
          </div>
          <div className={cx("form-account-group")}>
            <label className={cx('form-name')}>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Mật Khẩu"
              value={formValues.password}
              className={cx("form-input","w-400")}
              autoComplete="off"
              onChange={handleChange}
            />
            {formErrors.password && (
              <p className={cx("message-error")}>{formErrors.password}</p>
            )}
          </div>
        </div>
      </div>
      <div className={cx("form-account-group-btn")}>
        <button className={cx("btn-back")} onClick={handleBack}>Quay lại</button>
        <button className={cx("btn-update")}>Cập nhật</button>
      </div>
    </form>
  );
}

export default EditAccount;
