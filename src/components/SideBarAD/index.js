import "./SideBarAD.css";
import { Link } from "react-router-dom";
import { useState} from "react";

function SideBarAD() {
    const [active,setActive] = useState(1);

    return(
        <>
            <div className="listAD">
                <Link to="/login/admin" className={active===1?"itemAD itemActive":"itemAD"} onClick={() => setActive(1)}>
                    <div className="itemAD-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill={active===1?"#fff":"#2fa5ff"} d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                    </div>
                    Quản lý
                </Link>
                <Link to="/login/admin/products" className={active===2?"itemAD itemActive":"itemAD"} onClick={() => setActive(2)}>
                    <div className="itemAD-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill={active===2?"#fff":"#2fa5ff"} d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"/></svg>
                    </div>
                    Sản phẩm
                </Link>
                <Link to="" className={active===3?"itemAD itemActive":"itemAD"} onClick={() => setActive(3)}>
                    <div className="itemAD-icon">
                        <svg width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill={active===3?"#fff":"#2fa5ff"} d="M320 64h-49.61C262.1 27.48 230.7 0 192 0S121 27.48 113.6 64H64C28.65 64 0 92.66 0 128v320c0 35.34 28.65 64 64 64h256c35.35 0 64-28.66 64-64V128C384 92.66 355.3 64 320 64zM192 48c13.23 0 24 10.77 24 24S205.2 96 192 96S168 85.23 168 72S178.8 48 192 48zM336 448c0 8.82-7.178 16-16 16H64c-8.822 0-16-7.18-16-16V128c0-8.82 7.178-16 16-16h18.26C80.93 117.1 80 122.4 80 128v16C80 152.8 87.16 160 96 160h192c8.836 0 16-7.164 16-16V128c0-5.559-.9316-10.86-2.264-16H320c8.822 0 16 7.18 16 16V448z"/></svg>
                    </div>
                    Đơn đặt hàng
                </Link>
                <Link to="" className={active===4?"itemAD itemActive":"itemAD"} onClick={() => setActive(4)}>
                    <div className="itemAD-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill={active===4?"#fff":"#2fa5ff"} d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </div>
                    Người dùng
                </Link>
            </div>
        </>
    )
}

export default SideBarAD;