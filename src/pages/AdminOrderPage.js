import AdminOrders from "../features/admin/components/AdminOrder";
import Navbar from "../features/navbar/Navbar";


function AdminOrderPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </div>
  );
}

export default AdminOrderPage;