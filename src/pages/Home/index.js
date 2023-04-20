import Slider from "../../components/slider";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Products from "../../components/Products";
import Category from "../../components/Category";
import policy1 from "../../assets/images/policy1.png";
import policy2 from "../../assets/images/policy2.png";
import policy3 from "../../assets/images/policy3.png";
import policy4 from "../../assets/images/policy4.png";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";

const cx = classNames.bind(styles);

function Home() {
    return (
      <div className={cx("wrap")}>
        <Slider />
        <div className={cx("content")}>
          <div className={cx("policy-list")}>
            <div className={cx("policy-item")}>
              <img src={policy1} alt="" className={cx("policy-img")} />
              <h4 className={cx("policy-title")}>MIỄN PHÍ GIAO HÀNG</h4>
            </div>
            <div className={cx("policy-item")}>
              <img src={policy2} alt="" className={cx("policy-img")} />
              <h4 className={cx("policy-title")}>HOÀN TIỀN</h4>
            </div>
            <div className={cx("policy-item")}>
              <img src={policy3} alt="" className={cx("policy-img")} />
              <h4 className={cx("policy-title")}>THANH TOÁN AN TOÀN</h4>
            </div>
            <div className={cx("policy-item")}>
              <img src={policy4} alt="" className={cx("policy-img")} />
              <h4 className={cx("policy-title")}>
                XÁC THỰC ĐẢM BẢO 100%
              </h4>
            </div>
          </div>
          <div className={cx("banner-wrap")}>
            <img src={banner1} alt="" className={cx("banner-img")} />
            <img src={banner2} alt="" className={cx("banner-img")} />
          </div>
          <h3 className={cx("title")}>Sản phẩm</h3>
          <Products />
        </div>
      </div>
    );
}

export default Home;