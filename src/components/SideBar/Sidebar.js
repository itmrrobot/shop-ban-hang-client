import "./SideBar.css";
import { CartState } from "../../store/Context";
import { useState} from "react";

function Sidebar() {
  const { state, productState, productDispatch } = CartState();
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);
  const handleClothess = () => {
    productDispatch({ type: "CLOTHESS", payload: "1" });
  };

  // const handleFurniture = () => {
  //   productDispatch({ type: "FURNITURE", payload: "3" });
  // };

  const handleElectronics = () => {
    productDispatch({ type: "ELECTRONICS", payload: "2" });
  };

  const handleShoes = () => {
    productDispatch({ type: "SHOES", payload: "4" });
  };

  const handleSubmit = () => {
    productDispatch({ type: "ADD PRICERANGE", payload: [priceFrom, priceTo] });
  };
  return (
    <>
      <h3 className="sidebar-title">Lọc Theo</h3>
      <div className="sidebar-content">
        <div className="sidebar-list">
          <h3 className="sidebar-list-title">Danh mục</h3>
          <div
            className="sidebar-item"
            onClick={() => productDispatch({ type: "ALL" })}
          >
            Tất cả
          </div>
          <div className="sidebar-item" onClick={handleClothess}>
            Quần áo
          </div>
          <div className="sidebar-item" onClick={handleElectronics}>
            Đồng hồ
          </div>
          <div className="sidebar-item" onClick={handleShoes}>
            Giày
          </div>
        </div>
        <div className="sidebar-price">
          <h3 className="sidebar-price-title">Khoảng giá</h3>
          <div className="sidebar-price-range">
            <input
              type="text"
              name="number"
              placeholder="TỪ"
              className="sidebar-input"
              onChange={(e) => setPriceFrom(e.target.value)}
            />

            <input
              type="text"
              name="number"
              placeholder="ĐẾN"
              className="sidebar-input"
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>
          <button className="sidebar-price-btn" onClick={handleSubmit}>
            Tìm
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;