import Footer from "../../Footer";
import Header from "../../Header";
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import ModalCheckOut from "../../ModalCheckOut";
import MessageModal from "../../MessageModal";

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return (
      <div className={cx("wrap")}>
        <ModalCheckOut/>
        <MessageModal/>
        <Header />
        <div className={cx("container")}>{children}</div>
        <Footer />
      </div>
    );
}

export default DefaultLayout;