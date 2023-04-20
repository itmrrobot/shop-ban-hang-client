import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { useEffect , useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { Link } from 'react-router-dom';
import { CartState } from '../../store/Context';
import Pagination from '../Pagination';

const cx = classNames.bind(styles);

function Products() {
    const [products,setProducts] = useState([]);
    const {productState:{clothess,electronics,furniture,shoes,priceRange,searchFilter},dispatch} = CartState();
    const [currentPage,setCurrentPage] = useState(1);
    const [productPerPage,setProductPerPage] = useState(16);
    const lastProductIndex = currentPage*productPerPage;
    const firstProductIndex = lastProductIndex - productPerPage;
    const [loading,setLoading] = useState(false);
    let newProducts = products && products.map((item) => {
        item.qty=1;
        return item;
    });
    let totalProduct= newProducts.length;
    let currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
    if(shoes==='4') {
        newProducts=newProducts.filter((item) => {
            return item.category.id===4;
        });
        currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
        totalProduct = newProducts.length;
    } 
    if(clothess==='1') {
        newProducts=newProducts.filter((item) => {
            return item.category.id===1;
        });
        currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
        totalProduct = newProducts.length;
    } 
    if(electronics==='2') {
        newProducts=newProducts.filter((item) => {
            return item.category.id===2;
        });
        currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
        totalProduct = newProducts.length;
    } 
    if(furniture==='3') {
        newProducts=newProducts.filter((item) => {
            return item.category.id===3;
        });
        currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
        totalProduct = newProducts.length;
    } 
    if(priceRange.length===2&&Number(priceRange[0])<Number(priceRange[1])) {
        newProducts=newProducts.filter((item) => {
            return item.price>=Number(priceRange[0])&&item.price<=Number(priceRange[1]);
        });
        currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
        totalProduct = newProducts.length;
    }
    if(searchFilter) {
        newProducts = newProducts.filter((item) => {
            return (item.category.name.toLowerCase()===searchFilter.toLowerCase().trim()
                ||item.title.toLowerCase()===searchFilter.toLowerCase().trim()
                ||item.title.toLowerCase().includes(searchFilter.toLowerCase().trim())
            );
        });
        currentProducts = newProducts.slice(firstProductIndex,lastProductIndex);
        totalProduct = newProducts.length;
    } 
    useEffect(() => {
        const controller = new AbortController();
        axios.get(url+'/products',{
            signal: controller.signal
        })
        .then((res) => {
            setProducts(res.data);
            setLoading(true);
            dispatch({type:"GET_PRODUCTS",payload:res.data})
        })
        .catch((err) => {

        })
        return () => {
            controller.abort();
        }
    },[dispatch]);
    const ShowProducts = () => {
        return(
            <>
                {currentProducts.map((product,index) => {
                    return (
                        product.images[0]!==''&&product.images[0]!==null&&<div className={cx("item")} key={index}>
                        <Link to={`/products/${product._id}`} className={cx("item-link")}>
                          <img src={product.images[0]} alt='' className={cx("img")} />
                          <h3 className={cx("title")}>{product.title}</h3>
                          <span className={cx("price")}>{product.price}.000 VND</span>
                        </Link>
                      </div>
                    );
                })}
            </>
        )
    }

    return (
        <div className={cx('wrap')}>
            <div className={cx('content')}>
                <div className={cx('list')}>
                    {loading?<ShowProducts/>:<div className={cx('loader')}></div>}
                </div>
                <Pagination 
                    setCurrentPage={setCurrentPage}
                    length={totalProduct}
                    productPerPage={productPerPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default Products;