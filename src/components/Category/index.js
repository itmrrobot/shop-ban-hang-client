import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { url } from '../../constants';

const cx = classNames.bind(styles);

function Category() {
    const [categories,setCategories] = useState([]);
    useEffect(() => {
      const controller = new AbortController();
      axios.get(url+'/categories',{
        signal: controller.signal
      })
      .then((res) => {
        const category = res.data.filter((item) => {
          return item.id >= 1 &&item.id <= 4;
        })  
        setCategories(category);
      })
      .catch((err) => {
        
      })
      return () => {
        controller.abort();
      }
    },[])

    return (
        <div className={cx("category")}>
          <h3 className={cx("title")}>Category</h3>
          <div className={cx("list")}>
            {categories.map((item,index) => (
              <div className={cx("item")} key={index}>
                <img src={item.image} alt="" className={cx('item-img')}/>
                <h4 className={cx("item-title")}>{item.name}</h4>
              </div>
            ))}
            </div>
        </div>
    )
}

export default Category;