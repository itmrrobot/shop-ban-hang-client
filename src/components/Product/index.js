import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState ,useRef } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { CartState } from '../../store/Context';
import RelatedProduct from '../RelatedProduct';

const cx = classNames.bind(styles);

function Product() {
    const {id} = useParams();
    const [product,setProduct] = useState({});
    const  [count,setCount] = useState(1);
    const {state:{products},dispatch,increment} = CartState();
    const [imgs,setImgs] = useState([]);
    const [select,setSelect] = useState(0);
    let prevCount =0;
    product.qty = count;
   // let isMouted = true;
    const effectRun = useRef(false);

    useEffect(() => {
        const controller = new AbortController();
        axios
          .get(url + `/products/${id}`, {
            signal: controller.signal,
          })
          .then((res) => {
            setProduct(res.data);
            setImgs(res.data.images);
          })
          .catch((err) => {});
        return () => {
            controller.abort();
            effectRun.current = true;
        }
    },[id])
    const handleIncrease = () => {
        setCount(count+1);
    }

    const handleDecrease = () => {
        if(count>1) {
            setCount(count-1);
        }
    }

    
    const handleAddToCart = () => { 
        let exists = products.find(item => item._id===product._id)
        if(exists) {
            increment(product.id);
        } else {
            dispatch({type:"ADD_PRODUCT",payload: product});
            dispatch({type:"INCREASE",payload:prevCount+count});
            dispatch({type:"TOTALPRODUCTINCREASE",payload:product.price*product.qty});
        }
    }

    const ImagesItem = () => {
        
        return (
          <>
          {imgs.map((img,index) => {
            return <img src={img} alt="" className={cx("img-sub")} key={index} onClick={() => setSelect(index)}/>
          })}
          </>
        );
    }

    return (
      <div className={cx("wrap")}>
        <div className={cx("product-item")}>
          <div>
            <img src={imgs[select]} alt="" className={cx("img")} />
            <div className={cx("wrap-img-sub")}>
              <ImagesItem />
            </div>
          </div>
          <div className={cx("content")}>
            <h3 className={cx("title")}>{product.title}</h3>
            <p className={cx("desc")}>{product.description}</p>
            <div className={cx("rating")}>
              <div className={cx("rating-icon")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#09ac0e"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </div>
              <div className={cx("rating-icon")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#09ac0e"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </div>
              <div className={cx("rating-icon")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#09ac0e"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </div>
              <div className={cx("rating-icon")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#09ac0e"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </div>
              <div className={cx("rating-icon")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    fill="#09ac0e"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </div>
              <div className={cx("stock")}>(121)</div>
            </div>
            <span className={cx("price")}>{product.price}.000 VND</span>
            <p className={cx("policy")}>
              Các khoản thanh toán được đề xuất với tài trợ đặc biệt trong 6 tháng
            </p>
            <div className={cx("wrap-quantity")}>
              <span className={cx("quantity")}>Số lượng</span>
              <div className={cx("wrapper")}>
                <div className={cx("btn-decrease")} onClick={handleDecrease}>
                  -
                </div>
                <span className={cx("number")}>{count}</span>
                <div className={cx("btn-increase")} onClick={handleIncrease}>
                  +
                </div>
              </div>
            </div>
            <div className={cx("wrap-btn")}>
              <button className={cx("btn-add")} onClick={handleAddToCart}>
                Thêm vào giỏ
              </button>
              <Link to="/cart" className={cx("btn-go")}>
                Đi đến giỏ
              </Link>
            </div>
            <div className={cx("policy-wrap")}>
              <div className={cx("policy-item","bd-bottom")}>
                <div className={cx("icon-delivery")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM208 416c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zm272 48c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z" />
                  </svg>
                </div>
                <div className={cx("policy-content")}>
                  <h4 className={cx("policy-title")}>Miễn phí giao hàng</h4>
                  <span className={cx("postal-code")}>
                    Nhập mã bưu chính của bạn để có sẵn giao hàng
                  </span>
                </div>
              </div>
              <div className={cx("policy-item")}>
                <div className={cx("icon-clipboard")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64H48C21.5 64 0 85.5 0 112V464c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H282.5C269.4 26.7 233.8 0 192 0zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm-80 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                </div>
                <div className={cx("policy-content-other")}>
                  <h4 className={cx("policy-title")}>Trả lại hàng</h4>
                  <span className={cx("postal-desc")}>
                    Đổi trả hàng miễn phí trong 30 ngày. 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <RelatedProduct categoryId={product.category?.id}/>
      </div>
    );
}

export default Product;
