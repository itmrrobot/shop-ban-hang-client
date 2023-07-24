import { useParams } from 'react-router-dom';
import styles from './EditOrder.module.scss';
import classNames from 'classnames/bind';
import { MessageState } from '../../store/MessageContext';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { AuthState } from '../../store/AuthProvider';

const cx = classNames.bind(styles);

function EditOrder() {
    const {id} = useParams();
    const [formValues,setFormValues] = useState({});
    const {setIsSuccess,setIsShow} = MessageState();
    const {user} = AuthState();

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const respone = await axios.patch(url+`/orders/${id}`,formValues,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });
            setIsSuccess(true);
            setIsShow(true);
            console.log(respone);
        } catch(e) {
            console.log(e);
            setIsSuccess(false);
            setIsShow(true);
        }
    }
    const handleReset = () => {
        formValues._id = '';
        setFormValues({});
    }
    return (
        <div className={cx('wrap')}>
            <h3 className={cx("title")}>Sửa hóa đơn</h3>
            <div className={cx("content")}>
                <form className={cx("form-edit-product")}>
                    <div className={cx('form-group-product')}>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Mã hóa đơn</h4>
                            <input type="text" name="_id" className={cx('form-product-input')} placeholder="Mã hóa đơn" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Tên khách hàng</h4>
                            <input type="text" name="userName" className={cx('form-product-input')} placeholder="Tên khách hàng" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Ngày đặt</h4>
                            <input type="text" name="orderDate" className={cx('form-product-input')} placeholder="Ngày" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className={cx('form-group-product')}>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Trạng thái</h4>
                            <input type="text" name="status" className={cx('form-product-input')} placeholder="Trạng thái" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Tổng</h4>
                            <input type="text" name="total" className={cx('form-product-input')} placeholder="Tổng hóa đơn" onChange={handleChange}/>
                        </div>
                    </div>
                </form>
                <div className={cx('group-edit-btn')}>
                    <div className={cx('btn-reset')} onClick={handleReset}>Reset</div>
                    <div className={cx('btn-edit')} onClick={handleSubmit}>Sửa</div>
                </div>
            </div>
        </div>
    )
}

export default EditOrder;