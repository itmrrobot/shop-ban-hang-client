import "./SideBar.css";
import { useState} from "react";
import Sidebar from "./Sidebar";

function SideBar() {
  const [isClick,setIsClick] = useState(false);
  return (
    <>
      <div className="hide">
        <Sidebar />
      </div>
      <button
        className="btnFilter"
        onClick={() =>
          window.innerWidth > 1024 ? setIsClick(false) : setIsClick(true)
        }
      >
        Bộ lọc
      </button>
      <div
        className="hideOnPC left sidenav show"
        style={isClick === true ? { width: "100%" } : { width: "0" }}
      >
        <button className="closebtn hideOnPC" onClick={() => setIsClick(false)}>
          &times;
        </button>
        <Sidebar/>
        <button className="btnApply hideOnPC show" onClick={() => setIsClick(false)}>
            Áp dụng
          </button>
      </div>
    </>
  );
}

export default SideBar;
