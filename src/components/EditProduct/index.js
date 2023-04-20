import styles from './EditProduct.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {url} from '../../constants/index';
import { MessageState } from '../../store/MessageContext';

const cx = classNames.bind(styles);

function EditProduct() {
    const {id} = useParams();
    const [formValues,setFormValues] = useState({});
    const {setIsSuccess,setIsShow} = MessageState();

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formValues.images) {
            formValues.images = [formValues.images];
        }
        try {
            const respone = await axios.patch(url+`/products/${id}`,formValues);
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
        
    }

    return (
        <div className={cx('wrap')}>
            <h3 className={cx("title")}>Sửa sản phẩm</h3>
            <div className={cx("content")}>
                <form className={cx("form-edit-product")}>
                    <div className={cx('form-group-product')}>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Tên</h4>
                            <input type="text" name="title" className={cx('form-product-input')} placeholder="Tên" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Giá</h4>
                            <input type="text" name="price" className={cx('form-product-input')} placeholder="Giá" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Mô tả</h4>
                            <textarea name='description' placeholder="Mô tả" className={cx("form-product-desc")} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className={cx('form-group-product')}>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Id loại sản phẩm</h4>
                            <input type="text" name="categoryId" className={cx('form-product-input')} placeholder="Id loại sản phẩm" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Url hình ảnh</h4>
                            <input type="text" name="images" className={cx('form-product-input')} placeholder="Url hình ảnh" onChange={handleChange}/>
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

export default EditProduct;