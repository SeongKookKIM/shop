import React from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminLanding from "../../components/admin/home/AdminLanding";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import AdminUser from "../../components/admin/user/AdminUser";
import AdminUserDetail from "../../components/admin/user/AdminUserDetail";
import AdminProductAdd from "../../components/admin/product/AdminProductAdd";
import AdminProductEdit from "../../components/admin/product/AdminProductEdit";

function AdminHome() {
  const adminPage = useSelector((state: RootState) => state.adminPageChange);

  return (
    <div className="admin-home">
      <AdminNav />
      {adminPage.pages === "" && <AdminLanding />}
      {adminPage.pages === "user" && <AdminUser />}
      {adminPage.pages === "userDetail" && <AdminUserDetail />}
      {adminPage.pages === "productAdd" && <AdminProductAdd />}
      {adminPage.pages === "productEdit" && <AdminProductEdit />}
    </div>
  );
}

export default AdminHome;
