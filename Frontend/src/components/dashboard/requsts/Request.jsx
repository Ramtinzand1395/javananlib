import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  confirmMessageService,
  getMessageService,
} from "../../../services/booksDataServices";
import { getAllUsers } from "../../../services/userServices";
import { ChangeBookStatus, getAllBooks } from "../../../services/booksServices";
import { toast } from "react-toastify";

const Request = () => {
  const [Message, setMessage] = useState([]);
  const [Books, setBooks] = useState([]);
  const [Users, setUsers] = useState([]);
  const [ShowBorrowBook, setShowBorrowBook] = useState(false);

  useEffect(() => {
    const messages = async () => {
      const { data } = await getMessageService();
      const { data: user } = await getAllUsers();
      const { data: books } = await getAllBooks();
      setMessage(data.requsts);
      setBooks(books);
      setUsers(user);
    };
    messages();
  }, []);

  const findUserById = (userId) => {
    return Users.find((user) => user._id === userId);
  };

  // Function to find book by bookId
  const findBookById = (bookId) => {
    return Books.find((book) => book._id === bookId);
  };

  const handleconfirm = async (message, status) => {
    try {
      const { data } = await confirmMessageService(message, status);
      toast.success(data.mymessage);
      if(data.message.status === "confirmed"){
        setShowBorrowBook(true);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const handledelivery = async (message) => {
    try {
      const { data, status } = await ChangeBookStatus(message);
      if (status === 200) {
        toast.success(data.message);
      }
    } catch (error) {
      // Handle error if the API call fails
      console.error(error);
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-10 mt-5">
        {Message.map((message) => (
          <div
            className="bg-gray-400 text-white w-auto p-2 flex items-center mt-2"
            key={message._id}
          >
            <p>
              شما پیامی از طرف{" "}
              <span className="text-red-400 font-bold text-xl">
                {findUserById(message.userId)?.username}
              </span>{" "}
              برای به امانت گرفتن کتاب{" "}
              <span className="text-red-400 font-bold text-xl">
                {findBookById(message.bookId)?.bookname}
              </span>
              دارید
            </p>
            {/**btn */}
            <div className="mx-2 flex items-center">
              <button
                onClick={() => handleconfirm({ message, status: "confirmed" })}
                className="bg-green-400 py-1 px-4 rounded-lg mx-2"
              >
                {" "}
                تایید{" "}
              </button>
              <button
                onClick={() => handleconfirm({ message, status: "Rejected" })}
                className="bg-red-400 py-1 px-4 rounded-lg mx-2"
              >
                {" "}
                رد درخواست{" "}
              </button>
              {ShowBorrowBook && (
                <button
                onClick={() => handledelivery({ message })}
                className="bg-orange-400 py-1 px-4 rounded-lg mx-2"
                >
                  {" "}
                  تحویل کتاب{" "}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
