import styles from "./RelatedProduct.module.scss";
import classnames from 'classnames/bind';
import {useEffect, useState,useRef} from "react";
import axios from "axios";
import { url } from "../../constants";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function RelatedProduct({...props}) {
    const [products,setProducts] = useState([]);
    const {categoryId} = props;
    const itemElement = useRef();
    let container = useRef();
    const newProducts = products.filter(p=>p.category?.id===categoryId).slice(0,10);
    
    useEffect(() => {
        const controller = new AbortController();
        try {
            const fetchData = async() => {
                let respone = await axios.get(url+"/products?offset=0&limit=10",{
                    signal: controller.signal
                });
                setProducts(respone.data);
            }
            fetchData();
        } catch(e) {
            console.log(e);
        }
        return () => {
            controller.abort();
        }
    },[])

    useEffect(() => {
        const scrollLeft = setInterval(() => {
            let width = itemElement.current.scrollWidth*2;
            if(container.current.scrollLeft===1800) {
                container.current.scrollLeft = 0;
            } else {
                container.current.scrollLeft = container.current.scrollLeft + width;
            }
        },5000);
        return () => {
            clearInterval(scrollLeft);
        }
    },[])

    const handleNext = () => {
        let width = itemElement.current.scrollWidth;
        container.current.scrollLeft = container.current.scrollLeft + width;
        console.log(container.current.scrollLeft);
    }

    const handlePrev = () => {
        let width = itemElement.current.scrollWidth;
        container.current.scrollLeft = container.current.scrollLeft - width;
    }

    return (
      <div className={cx("wrap")}>
        <h3 className={cx("related-title")}>SẢN PHẨM LIÊN QUAN</h3>
        <button className={cx("btn-prev")} onClick={handlePrev}>
            <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill='#fff' d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>
        <div className={cx("btn-next")} onClick={handleNext}>
          <svg
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="#fff"
              d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
            />
          </svg>
        </div>
        <div className={cx("slide")} ref={container}>
          {newProducts.map((product, index) => {
            return (
              product.images[0] !== "" &&
              product.images[0] !== null && (
                <div className={cx("item")} ref={itemElement} key={index}>
                  <Link
                    to={`/products/${product._id}`}
                    className={cx("item-link")}
                  >
                    <img src={product.images[0]} alt="" className={cx("img")} />
                    <h3 className={cx("title")}>{product.title}</h3>
                    <span className={cx("price")}>{product.price}.000 VND</span>
                  </Link>
                </div>
              )
            );
          })}
        </div>
      </div>
    );
}

export default RelatedProduct;