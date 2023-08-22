import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserOrders } from "../userSlice";
import { useEffect } from "react";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link } from "react-router-dom";

function UserOrders() {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    console.log(user.id);
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        My Orders
      </h1>
      {orders.map((order) => (
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl rounded-md px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h1 className="text-4xl mt-3 my-5 font-bold tracking-tight text-gray-900">
                Order #{order.id}
              </h1>
              <h1 className="text-xl mt-3 my-9 font-bold tracking-tight text-gray-600">
                Order Status : {order.status}
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">
                              $
                              {Math.round(
                                item.price * (1 - item.discountPercentage / 100)
                              )}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-4 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="py-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total items</p>
                  <p>{order.totalItems} items</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
              </div>
              <p className="mt-0.5 text-base font-medium text-gray-500">
                Shipping Address
              </p>
              <li className="flex justify-between gap-x-6 px-5 py-5 border-solid ">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.pinCode}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {order.selectedAddress.city}
                  </p>
                </div>
              </li>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
