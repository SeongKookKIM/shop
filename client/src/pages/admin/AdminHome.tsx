import React, { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminLanding from "../../components/admin/home/AdminLanding";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import AdminUser from "../../components/admin/user/AdminUser";
import AdminUserDetail from "../../components/admin/user/AdminUserDetail";
import AdminProductAdd from "../../components/admin/product/AdminProductAdd";
import AdminProductEdit from "../../components/admin/product/AdminProductEdit";
import AdminOrder from "../../components/admin/delivery/AdminOrder";
import AdminReturn from "../../components/admin/delivery/AdminReturn";
import AdminInqury from "../../components/admin/Inqury/AdminInqury";
import AdminInquryDetail from "../../components/admin/Inqury/AdminInquryDetail";
import { UserType } from "../../type/Type";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [user, setUser] = useState<UserType | null>();

  const adminPage = useSelector((state: RootState) => state.adminPageChange);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");

    if (userLocal !== null) {
      setUser(JSON.parse(userLocal));
    }
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        alert("관리자 페이지 권한이 없습니다.");
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div className="admin-home">
      {user ? (
        <>
          {" "}
          <AdminNav />
          {adminPage.pages === "" && <AdminLanding />}
          {adminPage.pages === "user" && <AdminUser />}
          {adminPage.pages === "userDetail" && <AdminUserDetail />}
          {adminPage.pages === "productAdd" && <AdminProductAdd />}
          {adminPage.pages === "productEdit" && <AdminProductEdit />}
          {adminPage.pages === "productOrder" && <AdminOrder />}
          {adminPage.pages === "productReturn" && <AdminReturn />}
          {adminPage.pages === "userInqury" && <AdminInqury />}
          {adminPage.pages === "userInquryDetail" && <AdminInquryDetail />}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>관리자 페이지 권한이 없습니다.</span>
        </div>
      )}
    </div>
  );
}

export default AdminHome;
