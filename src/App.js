import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticleDetails, setCurrentPage } from "./Logic/actions";
import "../tailwind.output.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const {
    data = [],
    currentPage,
    totalItems,
    isLoadingData,
    pageSize
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize useHistory hook
  const totalPage = Math.ceil(totalItems / pageSize);

  console.log(data);
  useEffect(() => {
    dispatch(fetchArticleDetails(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePageClick = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleViewMoreClick = (user) => {
    // navigate to view more page and pass data
    navigate(`/${user.name.first}`);
  };

  const renderTable = () => {
    if (isLoadingData) {
      return <p className="text-center">Loading . . .</p>;
    } else if (data.length > 0) {
      return (
        <>
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Country</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
              </tr>
            </thead>
            {data?.map((item, i) => {
              return (
                <tbody
                  key={i}
                  onClick={() => handleViewMoreClick(item)}
                  className="cursor-pointer"
                >
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name.first + " " + item?.name?.last}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item?.location?.country}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.phone}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <div className="flex justify-center my-4">
            <button
              className={`mx-1 ${
                currentPage === 1
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-2 py-1 rounded`}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(Math.ceil(totalItems / pageSize)).keys()].map((page) => {
              const pageNumber = page + 1;
              return (
                <div>
                  <button
                    key={pageNumber}
                    className={`mx-1 ${
                      currentPage === pageNumber
                        ? "bg-blue-500 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100"
                    } text-black px-2 py-1 rounded`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </div>
              );
            })}
            <button
              className={`mx-1 ${
                currentPage === totalPage
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white px-2 py-1 rounded`}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
        </>
      );
    } else {
      return <p className="text-center p-10">No data found</p>;
    }
  };

  return (
    <div className="p-4">
      <div className="text-center mx-auto max-w-4xl w-full">
        <h1 className="font-bold text-3xl">Hello Emmanuel</h1>
        <h2 className="text-xl">Heres a starter code for your task</h2>
      </div>
      <main>{renderTable()}</main>
    </div>
  );
};

export default App;
