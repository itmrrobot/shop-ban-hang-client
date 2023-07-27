import style from "./ManageUserAccounts.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../../constants";
import { AuthState } from "../../store/AuthProvider";
import axios from "axios";
import moment from "moment";

const cx = classNames.bind(style);

function ManageUserAccounts() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { user } = AuthState();
  let users = data;
  if (searchInput) {
    users = users.filter((u) => {
      return (
        u.name.toLowerCase() === searchInput.toLowerCase().trim() ||
        u.fullname.toLowerCase() === searchInput.toLowerCase().trim() ||
        u.address.toLowerCase() === searchInput.toLowerCase().trim() ||
        u.phone === searchInput.trim()||
        u.name.toLowerCase().includes(searchInput.toLowerCase().trim())||
        u.fullname.toLowerCase().includes(searchInput.toLowerCase().trim())||
        u.address.toLowerCase().includes(searchInput.toLowerCase().trim())||
        u.phone.toLowerCase().includes(searchInput.toLowerCase().trim())
      );
    });
  }
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axios.get(url + "/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal: controller.signal,
        });
        setIsLoading(true);
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [user.token]);
  const handleDelete = async (id) => {
    await axios.delete(url + `/users/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const newUsers = data.filter((p) => p._id !== id);
    setData(newUsers);
  };
  const handleSearch = (e) => {
    if (e.which === 13) {
      setSearchInput(e.target.value);
    }
  };
  return (
    <div className={cx("wrap-products")}>
      <h3 className={cx("title")}>Người dùng</h3>
      <div className={cx("content")}>
        <div className={cx("filter")}>
          <Link to="/login/admin/users/create" className={cx("btn-create")}>
            Thêm mới
          </Link>
          <div className={cx("search-fiter")}>
            Tìm kiếm:
            <input
              type="text"
              className={cx("search-input")}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <div className={cx("wrap-table")}>
          <table className={cx("products-table")}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
                <th>Hành động</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user._id.slice(0, 8)}</td>
                      <td>{user.fullname}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                      <td>
                        <div className={cx("group-btn")}>
                          <Link
                            to={`/login/admin/users/edit/${user._id}`}
                            className={cx("btn-edit")}
                          >
                            Sửa
                          </Link>
                          <button
                            className={cx("btn-delete")}
                            onClick={() => handleDelete(user._id)}
                            type="button"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td className={cx("load")}>Loading...</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUserAccounts;
