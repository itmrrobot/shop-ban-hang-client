import { Link } from "react-router-dom";
import { AuthState } from "../../store/AuthProvider";
import styles from "./Account.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../constants/index";
import axios from "axios";
import moment from "moment";
import { CartState } from "../../store/Context";
import { MessageState } from "../../store/MessageContext";

const cx = classNames.bind(styles);

function Account() {
  const [ordersData, setOrdersData] = useState([]);
  const { user,setUser,setIsLogin } = AuthState();
  const navigate = useNavigate();
  const {dispatch} = CartState();
  const {modalSuccess,setModalSuccess} = MessageState();

  useEffect(() => {
    const controller = new AbortController();
    const fetchOrders = async () => {
      try {
        const res = await axios.get(url + "/orders", {
          signal: controller.signal,
          headers: {
            Authorization: `${user.token}`,
          },
        });
        setOrdersData(res.data);
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchOrders();
    return () => {
      controller.abort();
    };
  }, [user.token]);

  const handleLogout = async() => {
    try {
      const res = await axios.post(url+'/user/logout',undefined,{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
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
    <div className={cx("wrap")}>
      <h2 className={cx("account-title")}>Tài Khoản</h2>
      <div className={cx("user")}>
        <svg
          width="16px"
          height="16px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <span className={cx("btn-logout")} onClick={handleLogout}>
          Đăng xuất
        </span>
      </div>
      <div className={cx("info")}>
        <h3 className={cx("title")}>Thông tin tài khoản</h3>
        <span className={cx("detail")}>
          Họ Tên: {user.user.fullname},Địa chỉ: {user.user.address}
          <br />
          <br />
          Địa chỉ email: {user.user.email},Số điện thoại: {user.user.phone}
        </span>
        <Link to="/account/edit" className={cx("btn-change")}>
          Thay đổi thông tin tài khoản
        </Link>
      </div>
      <div className={cx("order")}>
        <h3 className={cx("title")}>Đơn hàng</h3>
        <div className={cx("order-table")}>
          <table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái</th>
                <th>Phương thức thanh toán</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {ordersData ? (
                ordersData.map((order, index) => {
                  const dateOrder = moment(order.orderDate).format(
                    "DD/MM/YYYY"
                  );
                  return (
                    <tr key={index}>
                      <td>{`#100${index}`}</td>
                      <td>{dateOrder}</td>
                      <td>{order.status}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.total.toLocaleString()}.000 VND</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td>Không đơn hàng nào cả</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Account;
