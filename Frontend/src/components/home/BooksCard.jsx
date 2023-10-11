import { FaHeart } from "react-icons/fa";
import lib from "../../assets/lib.jpg";
import { getAllAuthors } from "../../services/authorServices";
import { getAllBooks } from "../../services/booksServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { borrowingBookMessageService } from "../../services/booksDataServices";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const BooksCard = () => {
  const navigate = useNavigate();

  const [Authors, setAuthors] = useState([]);
  const [Books, setBooks] = useState([]);
  const [ChangedStatus, setChangedStatus] = useState(false);

  const findAuthorById = (authorId, authors) => {
    return authors.find((author) => author._id === authorId);
  };

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const borrowBook = async (bookId) => {
    setChangedStatus(false);
    try {
      if (!userId) {
        toast.error("لازم است وارد شوید");
        navigate("/register");
      } else {
        const { data, status } = await borrowingBookMessageService(userId, bookId);
        if (status === 200) {
          toast.success(data.message);
          setChangedStatus(true);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const GetAuthors = async () => {
      const { data } = await getAllAuthors();
      const { data: books } = await getAllBooks();
      setBooks(books);
      setAuthors(data);
    };
    GetAuthors();
  }, [ChangedStatus]);
  return (
    <div className="container pl-5 pr-5 md:pl-0 md:pr-0" id="library">
      <h2>کتاب ها</h2>
      <div className="box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
        {Books.map((book) => {
          const author = findAuthorById(book.AuthoroftheBook, Authors);
          return (
            <div key={book._id} className="card">
              <div className="face face1">
                <div className="content flex items-center">
                  <img
                    src={book.bookImage}
                    className="w-40 h-40"
                    alt={book.bookname}
                  />
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p className="text-base font-tanha ">{book.description}</p>
                  <p className="text-base font-tanha ">{author.name}</p>
                  <p className="text-base font-tanha ">
                    {book.PublicationDate}
                  </p>
                  {/**btns */}
                  <div className="flex items-center justify-start">
                    <button
                      onClick={() => borrowBook(book._id)}
                      className={`py-2 px-4 ${book.status === "Available" ? "bg-blue-500" : "bg-red-500"}  rounded-lg mx-5 text-white font-vazir mt-4`}
                    >
                      {`${
                        book.status === "Available"
                          ? "به امانت گرفتن"
                          : "به امانت گرفته شده"
                      }`}
                    </button>
                    <button className="py-2 px-4 bg-blue-500 rounded-lg text-white font-vazir mt-4 relative group">
                      <FaHeart />
                      <span className="hidden w-40 group-hover:block absolute top-2 left-50 mt-8 bg-black text-white px-2 py-1 rounded text-xs">
                        افزودن به لیست علاقه مندی ها
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2>نویسنده گان ها</h2>
      <div className="box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
        {Authors.map((author) => {
          return (
            <div key={author._id} className="card">
              <div className="face face1">
                <div className="content flex items-center">
                  <img
                    src={author.authorImage}
                    className="w-40 h-40"
                    alt={author.authorname}
                  />
                </div>
              </div>
              <div className="face face2">
                <div className="content">
                  <p className="text-base font-tanha ">{author.description}</p>
                  <p className="text-base font-tanha ">{author.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksCard;
