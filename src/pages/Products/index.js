import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import Products from '../../components/Products'
import SideBar from '../../components/SideBar';

const cx = classNames.bind(styles);

function ProductsPage() {
    return (
      <div className={cx("wrap")}>
        <div className={cx("sidebar")}>
          <SideBar />
        </div>
        <div className={cx("products")}>
          <Products className={cx("products")} />
        </div>
      </div>
    );
}

export default ProductsPage;