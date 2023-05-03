import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchArticleDetails } from "../Logic/actions";

const UserDetails = () => {
  const { id } = useParams();
  const { data = [], isLoadingData } = useSelector(
    (state) => state.userReducer
  );

  const user = data.find((user) => user.name.first === id);

  console.log(data);
  return (
    <div className="p-4">
      <>
        <Link href="/">go back</Link>
      </>

      <div className="xl:w-1/3 lg:mx-3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5 mx-auto mt-4">
        <div className="rounded overflow-hidden shadow-md bg-white dark:bg-gray-900">
          <div className="absolute -mt-20 w-full flex justify-center">
            <div className="h-32 w-32">
              <img
                src={user?.picture.large}
                alt="Display"
                className="rounded-full object-cover h-full w-full shadow-md"
              />
            </div>
          </div>
          <div className="p-4 mt-16">
            <h1 className="font-bold dark:text-white text-3xl text-center mb-1">
              {user?.name.first} {user?.name.last}
            </h1>
            <p className="text-gray-800 dark:text-white text-sm text-center">
              {" "}
              {user?.email}
            </p>
            <p className="text-gray-800 dark:text-white text-sm text-center">
              {" "}
              {user?.phone}
            </p>
            <p className="text-gray-800 dark:text-white text-sm text-center">
              {" "}
              {user?.location.city}
            </p>
            <p className="text-gray-800 dark:text-white text-sm text-center">
              {" "}
              {user?.location.country}
            </p>
            <p className="text-center text-gray-600 dark:text-gray-200 text-base pt-3 font-normal">
              {" "}
              {/* {new Date(user?.dob?.date).toLocaleDateString()} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
