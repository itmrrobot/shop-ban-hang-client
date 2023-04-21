import styles from "./ListProduct.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../constants";
import { convertToVietnamese } from "../../utils/util";

const cx = classNames.bind(styles);

function ListProduct() {
    const [isClickCategory,setIsClickCategory] = useState(false);
    const [isClickQtyProduct,setIsClickQtyProduct] = useState(false);
    const category = ["Shoes","Electronics","Clothes"];
    const qtyProduct = [5,10,15,20];
    const [categoryChoose,setCategoryChoose] = useState("");
    const [qtyProductChoose,setQtyProductChoose] = useState(5);
    const [searchInput,setSearchInput] = useState('');
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    let products=data;
    if(categoryChoose==="Shoes") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(categoryChoose==="Furniture") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(categoryChoose==="Electronics") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(categoryChoose==="Clothes") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(qtyProductChoose === 10) {
        products=products.slice(0,qtyProductChoose);
    }
    if(qtyProductChoose === 15) {
        products=products.slice(0,qtyProductChoose);
    }
    if(qtyProductChoose === 20) {
        products=products.slice(0,qtyProductChoose);
    }
    if(searchInput) {
        products=products.filter((p) => {
            return p.title.toLowerCase()===searchInput.toLowerCase().trim()
                || p.title.toLowerCase().includes(searchInput.toLowerCase().trim());
        })
    } 
    useEffect(() => {
        const controller = new AbortController();
        try {
            const fetchData = async() => {
                let respone = await axios.get(url+"/products",{
                    signal: controller.signal
                })
                setLoading(true);
                setData(respone.data);
            }
            fetchData();
        } catch(e) {
            console.log(e);
        }
        return () => {
            controller.abort();
        }
    },[]);
    
    const handleDelete = (id) => {
        const newProducts = data.filter(p => p.id!==id);
        axios.delete(url+`/products/${id}`);
        setData(newProducts);
    }

    const handleSearch = (e) => {
        if(e.which===13) {
            setSearchInput(e.target.value);
        }
    }

    return (
        <div className={cx("wrap-products")}>
            <h3 className={cx("title")}>Sản phẩm</h3>
            <div className={cx("content")}>
                <Link to="/login/admin/products/create" className={cx("btn-create")}>Thêm mới</Link>
                <div className={cx("dropdown-category")} onClick={() => setIsClickCategory(!isClickCategory)}>
                    <span className={cx("select")}>Chọn danh mục</span>
                    <div className={cx("btn-dropdown")}>
                        <svg className={cx("icon-down")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                    </div>
                    <div className={cx("dropdown-list",{show: isClickCategory})}>
                        {category.map((categoryItem,index) => {
                            return <div className={cx("dropdown-item")} key={index} onClick={() => setCategoryChoose(categoryItem)}>{convertToVietnamese(categoryItem)}</div>
                        })}
                    </div>
                </div>
                <div className={cx("filter")}>
                    <div className={cx("show-product")}>
                        Hiển thị
                        <div className={cx("dropdown-numbers")} onClick={() => setIsClickQtyProduct(!isClickQtyProduct)}>
                            <span className={cx('number')}>{qtyProductChoose}</span>
                            <div className={cx("list-number",{show: isClickQtyProduct})}>
                                {qtyProduct.map((num,index) => {
                                    return <div className={cx("number-item")} key={index} onClick={() => setQtyProductChoose(num)}>{num}</div>
                                })}
                            </div>
                            <div className={cx("btn-dropdown")}>
                                <svg className={cx("icon-down")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className={cx("search-fiter")}>
                        Tìm kiếm:
                        <input type="text" className={cx("search-input")} onKeyDown={handleSearch}/>
                    </div>  
                </div>
                <div className={cx("wrap-table")}>
                <table className={cx("products-table")}>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Mô tả</th>
                            <th>Loại</th>
                            <th>Giá</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    {loading?<tbody>
                        {products.map((product,index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <img
                                    src={product.images[0]}
                                    alt=""
                                    className={cx("table-item-img")}
                                  />
                                </td>
                                <td >{product.title}</td>
                                <td className={cx("table-item-desc")}>{product.description}</td>
                                <td>{convertToVietnamese(product.category.name)}</td>
                                <td>{product.price}.000 VND</td>
                                <td>
                                  <div className={cx("group-btn")}>
                                    <Link to={`/login/admin/products/edit/${product._id}`} className={cx("btn-edit")}>Sửa</Link>
                                    <button className={cx("btn-delete")} onClick={() => handleDelete(product._id)}>Xóa</button>
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

export default ListProduct;