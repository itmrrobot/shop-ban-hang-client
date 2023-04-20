import './Footer.css';
import './FooterResponsive.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
      <div className="wrapper-footer">
        <div className="footer">
          <div className="footer-list">
            <div className="footer-item">
              <h3 className="footer-title">CDIOSHOP</h3>
              <Link to="/" className="footer-link">
                Vận chuyển & Trả hàng{" "}
              </Link>
              <Link to="/" className="footer-link">
                Chính sách của cửa hàng{" "}
              </Link>
              <a href="/" className="footer-link">
                FAQ{" "}
              </a>
            </div>
            <div className="footer-item">
              <h3 className="footer-title">ĐỊA CHỈ</h3>
              <div className="footer-address">
                120 Hoàng Minh Thảo, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng
              </div>
            </div>
            <div className="footer-item">
              <h3 className="footer-title">GIỜ MỞ CỬA</h3>
              <span className="footer-time">Từ thứ 2 đến thứ CN</span>
              <span className="footer-time">Đóng cửa vào 21:00PM</span>
            </div>
            <div className="footer-item">
              <h3 className="footer-title">MẠNG XÃ HỘI</h3>
              <a href="/" className="footer-link">
                Facebook
              </a>
              <a href="/" className="footer-link">
                Instagram
              </a>
              <a href="/" className="footer-link">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Footer;