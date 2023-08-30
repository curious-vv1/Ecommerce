import { EyeIcon, PencilIcon,ArrowDownIcon,ArrowUpIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [editOrderId, setEditOrderId] = useState(-1);
  const [sort, setSort] = useState({});

//copied sort not able to understand the logic completely
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  

  const handleEdit = (order) => {
    setEditOrderId(order.id);
    console.log(order);
  };

  const handleShow = () => {
    console.log("handleShow");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderId(-1);
    console.log(order);
  };

  const handlePage = (page) => {
    setPage(page);
  }

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const choices = ["pending", "dispatched", "delivered", "cancelled"];

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'id',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    Order Number {' '}
                    {sort._sort === 'id' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                    className="py-3 px-6 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: 'finalAmount',
                        order: sort?._order === 'asc' ? 'desc' : 'asc',
                      })
                    }
                  >
                    FInal Amount {' '}
                    {sort._sort === 'finalAmount' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span className="mr-2 text-sm font-sans font-semibold">
                              {item.title} - #{item.quantity} - $
                              {Math.round(
                                item.price * (1 - item.discountPercentage / 100)
                              )}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center font-semibold">
                          ${order.finalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div>
                          <div className="font-bold">
                            {order.selectedAddress.name},
                          </div>
                          <div className="font-semibold">
                            {order.selectedAddress.street},
                          </div>
                          <div className="font-semibold">
                            {order.selectedAddress.city},{" "}
                          </div>
                          <div className="font-semibold">
                            {order.selectedAddress.state},{" "}
                          </div>
                          <div className="font-semibold">
                            {order.selectedAddress.pinCode},{" "}
                          </div>
                          <div className="font-semibold">
                            {order.selectedAddress.phone},{" "}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            {choices.map((choice) => (
                              <option value={choice}>{choice}</option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-6"
                              onClick={(e) => handleShow()}
                            ></EyeIcon>
                          </div>
                          <div className="w-4 mr- transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalOrders}
              ></Pagination>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
