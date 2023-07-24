import { useParams } from "react-router-dom";
import styles from "./EditUserAccount.module.scss";
import classNames from "classnames/bind";
import { MessageState } from "../../store/MessageContext";
import { useState } from "react";
import axios from "axios";
import { url } from "../../constants";
import { AuthState } from "../../store/AuthProvider";

const cx = classNames.bind(styles);

function EditUserAccount() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({});
  const { setIsSuccess, setIsShow } = MessageState();
  const { user } = AuthState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respone = await axios.patch(url + `/users/${id}`, formValues, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setIsSuccess(true);
      setIsShow(true);
      console.log(respone);
    } catch (e) {
      console.log(e);
      setIsSuccess(false);
      setIsShow(true);
    }
  };
  const handleReset = () => {
    formValues._id = "";
    setFormValues({});
  };
  return (
    <div className={cx("wrap")}>
      <h3 className={cx("title")}>Sửa tài khoản người dùng</h3>
      <div className={cx("content")}>
        <form className={cx("form-edit-product")}>
          <div className={cx("form-group-product")}>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title")}>Họ tên</h4>
              <input
                type="text"
                name="fullname"
                className={cx("form-product-input")}
                placeholder="Họ tên"
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title")}>Tên đăng nhập</h4>
              <input
                type="text"
                name="name"
                className={cx("form-product-input")}
                placeholder="Tên đăng nhập"
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title")}>Email</h4>
              <input
                type="text"
                name="email"
                className={cx("form-product-input")}
                placeholder="Ngày"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={cx("form-group-product")}>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title")}>Địa chỉ</h4>
              <input
                type="text"
                name="address"
                className={cx("form-product-input")}
                placeholder="Địa chỉ"
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title")}>SĐT</h4>
              <input
                type="text"
                name="phone"
                className={cx("form-product-input")}
                placeholder="Số điện thoại"
                onChange={handleChange}
              />
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title")}>Mật khẩu</h4>
              <input
                type="password"
                name="password"
                className={cx("form-product-input")}
                placeholder="Mật khẩu"
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <div className={cx("group-edit-btn")}>
          <div className={cx("btn-reset")} onClick={handleReset}>
            Reset
          </div>
          <div className={cx("btn-edit")} onClick={handleSubmit}>
            Sửa
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserAccount;
