import styles from './SidebarOderSummary.module.scss';
import classNames from 'classnames/bind';
import { CartState } from '../../store/Context';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SidebarOderSummary() {
  const {state:{total},dispatch} = CartState();
  const [isChecked,setIsChecked] = useState(false); 
  const [errorMsg,setErrorMsg] = useState('');

    const handlePayment = (e) => {
      console.log(e.target.checked)
      if(!e.target.checked) {
        setIsChecked(false)
      } else {
        setErrorMsg('');
        setIsChecked(true);
        if(e.target.value==="money") {
          dispatch({type:"ADDPAYMENTMETHOD",payload:"Tiền mặt"})
        } else {
          dispatch({type:"ADDPAYMENTMETHOD",payload:"Thẻ tín dụng"})
        }
      }
    }

    return (
      <>
        <h3 className={cx("title")}>Tổng hóa đơn</h3>
        <div className={cx("content")}>
          <div className={cx('wrap')}>
            <span className={cx('subtotal')}>Tổng phụ</span>
            <span className={cx('subtotal-price')}>{total.toLocaleString()}.000 VND</span>
          </div>
          <div className={cx('wrapper')}>
            <span>Phương thức thanh toán</span>
              <br/>
              <br/>
              <input type='radio' id="money" name="method" value="money" onClick={handlePayment}/>
              <label htmlFor="money">Tiền mặt</label><br/><br/>
              <input type='radio' id="credit" name="method" value="credit" onClick={handlePayment}/>
              <label htmlFor="credit">Thẻ tín dụng</label><br/>
              {errorMsg&&<p className={cx('message-error')}>{errorMsg}</p>}
          </div>
          <div className={cx('wrap')}>
            <span className={cx('name')}>Giao hàng</span>
            <span className={cx('free')}>FREE</span>
          </div>
          <div className={cx('wrap-total')}>
            <span className={cx('total')}>Tổng</span>
            <span className={cx('total-price')}>{total.toLocaleString()}.000 VND</span>
          </div>
          <button className={cx('btn-checkout')} onClick={() => {isChecked?dispatch({type:"SHOWMESSAGE",payload:true}):dispatch({type:"SHOWMESSAGE",payload:false});setErrorMsg('Bạn cần phải chọn phương thức thanh toán');}}>Thanh toán</button>
        </div>
      </>
    );  
}

export default SidebarOderSummary;