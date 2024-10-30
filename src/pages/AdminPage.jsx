import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/pagination";
import "../components/courses.css";
import { useAuth } from "../store/tokenStore";
import courseService from "../services/courseService";

const AdminPage = () => {
  const { checkLogIn } = useAuth();
  const { checkAdmin } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(checkLogIn);
  const [isAdmin, setIsAdmin] = useState(checkAdmin);

  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchData = async () => {
    const res = await courseService.getAllOrders({
      page,
      limit,
      search,
    });
    setOrders(res.data.orders.docs);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000); // 3 seconds debounce

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page, limit, debouncedSearch]);

  return (
    <>
      <Navbar />
      <div className="userTable">
        <h3>Orders</h3>
        <input
          className="mt-4 col-sm-4 p-2"
          type="text"
          placeholder="Search the orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.courseTitle}</td>
                  <td>{order.price}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            page={page}
            limit={limit}
            totalPages={totalPages}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
