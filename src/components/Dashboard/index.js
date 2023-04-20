import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx("wrap")}>
            <h3 className={cx("title")}>Bảng điều khiển</h3>
            <div className={cx("content")}>
                <div className={cx("statistical")}>
                    <div className={cx("statistical-wrap-icon","order-bg")}>
                        <svg width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#fff" d="M320 64h-49.61C262.1 27.48 230.7 0 192 0S121 27.48 113.6 64H64C28.65 64 0 92.66 0 128v320c0 35.34 28.65 64 64 64h256c35.35 0 64-28.66 64-64V128C384 92.66 355.3 64 320 64zM192 48c13.23 0 24 10.77 24 24S205.2 96 192 96S168 85.23 168 72S178.8 48 192 48zM336 448c0 8.82-7.178 16-16 16H64c-8.822 0-16-7.18-16-16V128c0-8.82 7.178-16 16-16h18.26C80.93 117.1 80 122.4 80 128v16C80 152.8 87.16 160 96 160h192c8.836 0 16-7.164 16-16V128c0-5.559-.9316-10.86-2.264-16H320c8.822 0 16 7.18 16 16V448z"/></svg>
                    </div>
                    <div className={cx("wrapper")}>
                        <div className={cx("quantity")}>0</div>
                        <span className={cx("statistical-title")}>Đơn đặt hàng</span>
                    </div>
                </div>
                <div className={cx("statistical")}>
                    <div className={cx("statistical-wrap-icon","product-bg")}>
                    <svg width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"/></svg>
                    </div>
                    <div className={cx("wrapper")}>
                        <div className={cx("quantity")}>0</div>
                        <span className={cx("statistical-title")}>Sản phẩm</span>
                    </div>
                </div>
                <div className={cx("statistical")}>
                    <div className={cx("statistical-wrap-icon","user-bg")}>
                    <svg width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </div>
                    <div className={cx("wrapper")}>
                        <div className={cx("quantity")}>0</div>
                        <span className={cx("statistical-title")}>Người dùng</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;