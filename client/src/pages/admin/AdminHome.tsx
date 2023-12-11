import React from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminLanding from "../../components/admin/home/AdminLanding";

function AdminHome() {
  return (
    <div className="admin-home">
      <AdminNav />
      <AdminLanding />
    </div>
  );
}

export default AdminHome;
