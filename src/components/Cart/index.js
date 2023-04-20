import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { CartState } from '../../store/Context';
import { useState } from 'react';
import SidebarOderSummary from '../SidebarOderSummary';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
  const {
    state: { quantity, products,isCheckOut},
    dispatch,
    increment,
    decrement,
    removeProduct
  } = CartState();
  const [isLessOne,setIsLessOne] = useState(false);
  
  const handleDecrese = () => {
    dispatch({type:"TOTALPRODUCTDECREASE"})
  }

  const handleIncrese = () => {
    setIsLessOne(false);
    dispatch({type:"TOTALPRODUCTINCREASE"});
  }

  const EmptyCart = () => {
    return (
      <div className={cx("wrapper")}>
        <h3 className={cx("title")}>Giỏ hàng của bạn</h3>
        <div className={cx("content")}>
          <div className={cx("wrap")}>
            <span className={cx("sentence")}>Giỏ hàng trống</span>
            <span className={cx("sentence")}>
              Vui lòng tiếp tục tìm kiếm sản phẩm để thêm vào giỏ hàng
            </span>
            <Link to="/" className={cx("btn-cart")}>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  };
  console.log(products)
  return (
    <>
      {quantity === 0 ? (
        <EmptyCart />
      ) : (
        <div className={cx("wrapper")}>
          <h3 className={cx("title")}>Giỏ hàng của bạn</h3>
          <div className={cx("wrap-content")}>
            <div className={cx("list")}>
              {products.map((product, index) => (
                <div className={cx("item")} key={index}>
                  <img src={product.images[0]} alt="" className={cx("img")} />
                  <div className={cx("wrap-name-price")}>
                    <h3 className={cx("name")}>{product.title}</h3>
                    <span className={cx("price")}>{product.price}.000 VND</span>
                  </div>
                  <div className={cx("container")}>
                    <div className={cx("wrap-btn")}>
                      <button
                        className={cx("btn-decrease")}
                        onClick={() => {product.qty>1?decrement(product._id):setIsLessOne(true);handleDecrese();}}
                        disabled={isLessOne}
                      >
                        -
                      </button>
                      <span className={cx("number")}>{product.qty}</span>
                      <div
                        className={cx("btn-increase")}
                        onClick={() => {increment(product._id);handleIncrese()}}
                      >
                        +
                      </div>
                    </div>
                    <span className={cx("price","hide")}>{product.price}.000 VND x {product.qty}</span>
                  </div>
                    <div className={cx("btn-delete")} onClick={() => removeProduct(product._id,product.qty,product.price)}>&times;</div>
                </div>
              ))}
            </div>
            <div className={cx("sidebar-oder-summary")}>
              <SidebarOderSummary />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;