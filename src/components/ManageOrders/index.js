import axios from 'axios';
import style from './ManageOrders.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../constants';
import { AuthState } from '../../store/AuthProvider';
import moment from 'moment';

const cx = classNames.bind(style);

function ManageOrders() {
    const [isLoading,setIsLoading] = useState(false);
    const [orders,setOrders] = useState([]);
    const {user} = AuthState();
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const res = await axios.get(url+'/orders',{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    },
                    signal:controller.signal
                })
                setIsLoading(true);
                setOrders(res.data);               
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
        return () => {
            controller.abort();
        }
    },[user.token])
    const handleDelete = (id) => {
        const newOrders = orders.filter(p => p._id!==id);
        axios.delete(url+`/orders/${id}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        });
        setOrders(newOrders);
    }
    return (
        <div className={cx("wrap-products")}>
            <h3 className={cx("title")}>Đơn hàng</h3>
            <div className={cx("content")}>
                <Link to="/login/admin/orders/create" className={cx("btn-create")}>Thêm mới</Link>
                <div className={cx("wrap-table")}>
                <table className={cx("products-table")}>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Ngày đặt hàng</th>
                            <th>Trạng thái</th>
                            <th>Tổng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    {isLoading?<tbody>
                        {orders.map((order,index) => {
                            const dateOrder = moment(order.orderDate).format(
                                "DD/MM/YYYY"
                              );
                            return (
                              <tr key={index}>
                                <td>{order._id.slice(0,8)}</td>
                                <td >{order.userName}</td>
                                <td>{dateOrder}</td>
                                <td>{order.status}</td>
                                <td>{order.total}.000 VND</td>
                                <td>
                                  <div className={cx("group-btn")}>
                                    <Link to={`/login/admin/orders/edit/${order._id}`} className={cx("btn-edit")}>Sửa</Link>
                                    <button className={cx("btn-delete")} onClick={() => handleDelete(order._id)}>Xóa</button>
                                  </div>
                                </td>
                              </tr>
                            );
                        })}
                    </tbody>:<tbody><tr><td className={cx("load")}>Loading...</td></tr></tbody>}
                </table>
                </div>
            </div>
        </div>
    )
}

export default ManageOrders;