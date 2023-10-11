import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/userServices";

const Userstable = ({ Users , handleStatusChange , setChangedStatus }) => {
  

  //DeleteUser
  const deleteauthor = async (userId) => {
    setChangedStatus(false)
    try {
      const { data, status } = await deleteUser(userId);
      if (status === 201) {
        toast.success(data.message);
        setChangedStatus(true)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  //Alertuser
  const confirmDelete = (user) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            className="bg-indigo-900 border-2 rounded-2xl p-4 border-white w-[50vw] h-auto"
          >
            <h3 className="text-white font-bold font-vazir text-2xl">
              پاک کردن نویسنده
            </h3>
            <p className="text-white font-vazir my-5 ">
              آیا مطمعنی میخواهی
              <span className="text-red-400 font-bold text-xl">
                {" "}
                {user.username}{" "}
              </span>
              را حذف کنی؟
            </p>
            <button
              onClick={() => {
                deleteauthor(user._id);
                onClose();
              }}
              className="bg-green-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-green-400 ml-5"
            >
              حذف کاربر
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-red-400 ml-5"
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  return (
    <div>
      <table className="md:w-[80vw] text-right mt-5 rounded-2xl text-black border-2">
        <thead className="text-xs font-vazir text-white  bg-purple-500 border-b-2 border-white rounded-lg ">
          <tr className="text-right">
            <th scope="col" className="px-2 py-3">
              عکس کاربر
            </th>
            <th scope="col" className="px-2 py-3">
              نام کاربری
            </th>
            <th scope="col" className="px-2 py-3">
              ایمیل
            </th>
            <th scope="col" className="px-2 py-3">
              تاریخ ثبت نام
            </th>
            <th scope="col" className="px-2 py-3">
              وضعیت
            </th>
            <th scope="col" className="px-2 py-3">
              ویرایش
            </th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => (
            <tr
              key={user._id}
              className={`hover:bg-slate-100 font-vazir hover:text-black border-b-2 transition-all delay-100 hover:border-black border-white ${
                user.status === "qualified" ? "bg-green-300" : "bg-red-500"
              }`}
            >
              <th
                scope="row"
                className="px-2 py-4 font-medium whitespace-nowrap "
              >
                <img
                  src={user.authorImage}
                  className="w-20 h-20"
                  alt={user.name}
                />
              </th>
              <td className="px-2 py-4 text-sm whitespace-nowrap md:whitespace-normal">
                {user.username}
              </td>
              <td className="px-2 py-4"> {user.email}</td>
              <td className="px-2 py-4"> {user.createdAt}</td>
              <td className="px-2 py-4">
                <select
                  onChange={(e) => {
                    handleStatusChange({
                      userId: user._id,
                      selectedStatus: e.target.value,
                    }); // Pass the userId to the function
                  }}
                  className="border border-gray-400 p-1 rounded"
                >
                  <option value="" >{user.status === "qualified" ? "تایید شده" : "در انتظار تایید"}</option>
                  <option value="qualified">تایید شده</option>
                  <option value="pendding">در انتظار تایید</option>
                </select>
              </td>

              <td className="px-2 py-4 text-right flex items-center float-left">
                <button
                  className="button-container bg-red-400 py-1 px-4 rounded-lg border-2 border-black text-center text-white hover:bg-red-500 transition-all ease-in-out delay-100"
                  onClick={() => confirmDelete(user)}
                >
                  حذف کلاینت
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userstable;
