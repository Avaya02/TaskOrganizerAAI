import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { getInitials } from "../utils";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/dashboard', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="px-4">
      <Popover className="relative">
        <Popover.Button className="group inline-flex items-center outline-none">
          <span className="text-xl font-bold text-blue-600">
            {getInitials(user?.name)}
          </span>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-80 max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
            <div className="flex items-center gap-4 rounded-lg shadow-lg bg-white p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-white flex items-center justify-center text-2xl">
                <span className="text-center font-bold">
                  {getInitials(user?.name)}
                </span>
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-black text-xl font-bold">{user?.name || "No Name Available"}</p>
                <span className="text-base text-gray-500">{user?.title || "No title available"}</span>
                <span className="text-blue-500">
                  {user?.email || "email@example.com"}
                </span>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default UserInfo;
