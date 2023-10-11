import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { ChangeBookStatus, deleteBook } from "../../../services/booksServices";

const BooksTable = ({
  setShowBookModal,
  onBookEdit,
  Books,
  Authors,
  setChangedStatus,
}) => {
  const handlemodal = (book) => {
    setShowBookModal(true);
    onBookEdit(book);
  };
  //change status
  const handleStatusChange = async ({ bookId, selectedStatus }) => {
    setChangedStatus(false);
    try {
      const { data, status } = await ChangeBookStatus(bookId, selectedStatus);
      if (status === 201) {
        toast.success(data.message);
        setChangedStatus(true);
      }
    } catch (error) {
      // Handle error if the API call fails
      console.error(error);
    }
  };
  //find Author
  const findAuthorById = (authorId, authors) => {
    return authors.find((author) => author._id === authorId);
  };

  //DeleteUser
  const deleteauthor = async (authorId, authorImage) => {
    setChangedStatus(false);
    try {
      const { data, status } = await deleteBook(authorId, authorImage);
      if (status === 200) {
        toast.success(data.message);
        setChangedStatus(true);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  //AlertBook
  const confirmDelete = (book) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            className="bg-indigo-900 border-2 rounded-2xl p-4 border-white w-[50vw] h-auto"
          >
            <h3 className="text-white font-bold font-vazir text-2xl">
              پاک کردن کتاب
            </h3>
            <p className="text-white font-vazir my-5 ">
              آیا مطمعنی میخواهی
              <span className="text-red-400 font-bold text-xl">
                {" "}
                {book.bookname}{" "}
              </span>
              را حذف کنی؟
            </p>
            <button
              onClick={() => {
                deleteauthor(book._id, book.bookImage);
                onClose();
              }}
              className="bg-green-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-green-400 ml-5"
            >
              حذف کتاب
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
              عکس
            </th>
            <th scope="col" className="px-2 py-3">
              عنوان کتاب
            </th>
            <th scope="col" className="px-2 py-3">
              اسم نویسنده
            </th>
            <th scope="col" className="px-2 py-3">
              تاریخ انتشار
            </th>
            <th scope="col" className="px-2 py-3">
              توضیحات
            </th>
            <th scope="col" className="px-2 py-3">
              تاریخ ایجاد پست
            </th>
            <th scope="col" className="px-2 py-3">
              ویرایش
            </th>
          </tr>
        </thead>
        <tbody>
          {Books.map((book) => {
            const author = findAuthorById(book.AuthoroftheBook, Authors);
            return (
              <tr
                key={book._id}
                className={` hover:bg-slate-300 font-vazir hover:text-black border-b-2 transition-all delay-100 hover:border-black border-white ${
                  book.status === "Available" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                <th
                  scope="row"
                  className="px-2 py-4 font-medium whitespace-nowrap "
                >
                  <img
                    src={book.bookImage}
                    className="w-20 h-20"
                    alt={book.bookname}
                  />
                </th>
                <td className="px-2 py-4 text-sm whitespace-nowrap md:whitespace-normal">
                  {book.bookname}
                </td>
                <td className="px-2 py-4 text-sm whitespace-nowrap md:whitespace-normal">
                  {author.name}
                </td>
                <td className="px-2 py-4 text-sm whitespace-nowrap md:whitespace-normal">
                  {book.PublicationDate}
                </td>
                <td className="px-2 py-4"> {book.description}</td>
                <td className="px-2 py-4"> {book.createdAt}</td>

                <td className="px-2 py-4 text-right flex items-center float-left">
                  <div className="button-container ml-2  bg-purple-500 py-1 px-4 rounded-lg border-2 border-black text-center text-white">
                    <button onClick={() => handlemodal(book)}>ویرایش</button>
                  </div>
                  <div className="button-container mx-2 bg-red-500 py-1 whitespace-nowrap px-4 rounded-lg border-2 border-black text-center text-white">
                    <button onClick={() => confirmDelete(book)}>حذف</button>
                  </div>
                 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
