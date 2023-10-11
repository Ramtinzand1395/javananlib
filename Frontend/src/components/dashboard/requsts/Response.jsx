import { useEffect, useState } from "react";
import {
  GetUserMessages,
  UserMarkAsReadService,
} from "../../../services/booksDataServices";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { getAllBooks } from "../../../services/booksServices";

const Response = () => {
  const [Message, setMessage] = useState([]);
  const [Books, setBooks] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    const messages = async () => {
      const { data } = await GetUserMessages(userId);
      const { data: books } = await getAllBooks();
      setBooks(books);
      setMessage(data.messages);
    };
    messages();
  }, [userId]);

  const findBookById = (bookId) => {
    return Books.find((book) => book._id === bookId);
  };

  const handleMarkAsRead = async (message) => {
    try {
      const { data } = await UserMarkAsReadService(message);
      setMessage(data.messages);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-10 mt-5">
        {Message?.map((message) => (
          <div
            className=" bg-gray-400 w-auto p-2 flex items-center mt-2"
            key={message._id}
          >
            <p>
              در خواست شما برای امانت گرفتن کتاب{" "}
              <span>{findBookById(message.bookId)?.bookname}</span>{" "}
              {message.status === "confirmed" ? " تایید شد " : " رد شد "}
            </p>
            {/**btn */}
            <div className="mx-2 flex items-center">
              <button
                onClick={() => handleMarkAsRead(message)}
                className="bg-green-400 py-1 px-4 rounded-lg mx-2"
              >
                {" "}
                تایید{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Response;
