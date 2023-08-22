import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrderPage() {
  return (
    <div>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
}

export default UserOrderPage;