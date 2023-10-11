import { confirmAlert } from "react-confirm-alert";
import { deleteAuthor } from "../../../services/authorServices";
import { toast } from "react-toastify";

const AuthorTable = ({ Authors, setShowModal, onAuthorEdit }) => {
  const handlemodal = (author) => {
    setShowModal(true);
    onAuthorEdit(author);
  };

  //DeleteUser
  const deleteauthor = async (authorId , authorImage) => {
    try {
      const { data, status } = await deleteAuthor(authorId , authorImage);
      if (status === 200) {
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  //AlertAuthor
  const confirmDelete = (author) => {
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
                {author.name}{" "}
              </span>
              را حذف کنی؟
            </p>
            <button
              onClick={() => {
                deleteauthor(author._id , author.authorImage);
                onClose();
              }}
              className="bg-green-500 rounded-lg py-2 px-10 border-white border-2 text-black hover:bg-green-400 ml-5"
            >
              حذف نویسنده
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
              اسم نویسنده
            </th>
            <th scope="col" className="px-2 py-3">
              توضیحات
            </th>
            <th scope="col" className="px-2 py-3">
              تاریخ ایجاد پست
            </th>
            <th scope="col" className="px-2 py-3">
              ویرایش کلاینت
            </th>
          </tr>
        </thead>
        <tbody>
          {Authors.map((author) => (
            <tr
              key={author._id}
              className=" hover:bg-slate-100 font-vazir hover:text-black border-b-2 transition-all delay-100 hover:border-black border-white"
            >
              <th
                scope="row"
                className="px-2 py-4 font-medium whitespace-nowrap "
              >
                <img
                  src={author.authorImage}
                  className="w-20 h-20"
                  alt={author.name}
                />
              </th>
              <td className="px-2 py-4 text-sm whitespace-nowrap md:whitespace-normal">
                {author.name}
              </td>
              <td className="px-2 py-4"> {author.description}</td>
              <td className="px-2 py-4"> {author.createdAt}</td>

              <td className="px-2 py-4 text-right flex items-center float-left">
                <div className="button-container ml-5  bg-purple-500 py-1 px-4 rounded-lg border-2 border-black text-center text-white">
                  <button onClick={() => handlemodal(author)}>ویرایش</button>
                </div>
                <div className="button-container bg-red-500 py-1 whitespace-nowrap px-4 rounded-lg border-2 border-black text-center text-white">
                  <button onClick={() => confirmDelete(author)}>
                    حذف کلاینت
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorTable;
