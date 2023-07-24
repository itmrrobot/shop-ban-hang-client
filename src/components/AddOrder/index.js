import styles from "./AddOrder.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { MessageState } from "../../store/MessageContext";
import axios from "axios";
import { url } from "../../constants";
import { AuthState } from "../../store/AuthProvider";

const cx = classNames.bind(styles);

function AddOrder() {
    const {user} = AuthState();
    const initialValues = {orderId:'',orderDate:'',status:'',userName:'',total:0};
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

      if(!values.orderId) {
        msg.orderId = 'Mã hóa đơn là bắt buộc';
      }

      if(!values.orderDate) {
        msg.orderDate = 'Ngày đặt hàng là bắt buộc';
      }

      if(!values.status) {
        msg.status = 'Trạng thái là bắt buộc';
      }

      if(!values.userName) {
        msg.userName = 'Tên khách hàng là bắt buộc';
      }

      if(!values.total) {
        msg.total = 'Tổng hóa đơn là bắt buộc';
      }

      return msg;
    }

    const handleAdd = async(e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      try {
        const respone = await axios.post(url+'/orders',formValues,{
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
        <h3 className={cx("title")}>Thêm hóa đơn</h3>
        <div className={cx("content")}>
          <form className={cx("form-add-product")}>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Mã hóa đơn</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="orderId"
                placeholder="Mã hóa đơn"
                value={formValues.orderId}
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.orderId}</p>            
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Tên khách hàng</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="userName"
                value={formValues.userName}
                placeholder="Tên khách hàng"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.userName}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Ngày đặt hàng</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="orderDate"
                value={formValues.orderDate}
                placeholder="Ngày đặt hàng"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.orderDate}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Trạng thái</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="status"
                value={formValues.images}
                placeholder="Trạng thái"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.status}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Tổng</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="total"
                value={formValues.total}
                placeholder="Tổng"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.total}</p>
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

export default AddOrder;