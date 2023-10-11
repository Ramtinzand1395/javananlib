import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { ChangeStatus, getAllUsers } from "../../../services/userServices";
import Userstable from "./Userstable";
import { toast } from "react-toastify";

const Users = () => {
  const [Users, setUsers] = useState([]);
  const [ChangedStatus, setChangedStatus] = useState(false);
  const handleStatusChange = async ({ userId, selectedStatus }) => {
    setChangedStatus(false)
    try {
      const { data, status } = await ChangeStatus(userId, selectedStatus);
      if (status === 201) {
        toast.success(data.message);
        setChangedStatus(true);
      }
    } catch (error) {
      // Handle error if the API call fails
      console.error(error);
    }
  };
  useEffect(() => {
    const GetAuthors = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    GetAuthors();
  }, [ChangedStatus]);
  return (
      <div className="flex">
        <Sidebar />
        <div className="mx-10">
          <Userstable setChangedStatus={setChangedStatus} handleStatusChange={handleStatusChange} Users={Users} />
        </div>
      </div>
  );
};

export default Users;
