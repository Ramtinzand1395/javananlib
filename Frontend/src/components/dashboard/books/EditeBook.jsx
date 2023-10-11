import { Field, ErrorMessage, Formik, Form } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { updateAuthorService } from "../../../services/authorServices";
import { toast } from "react-toastify";
import { useState } from "react";
import CreateBookImg from "./CreateBookImg";
import { bookvalidation } from "../../../validation/bookValidation";
import { updateBookService } from "../../../services/booksServices";

const EditeBook = ({ visible, onClose, book, Authors ,setChangedStatus}) => {
  const [BookImg, setBookImg] = useState(null);

  if (!visible) return null;

  const handleonClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const updateBook = async (values) => {
    setChangedStatus(false)
    try {
      const payload = {
        ...values,
        bookId: book._id,
        bookLastImg: book.bookImage,
        BookImg,
      };
      const { data, status } = await updateBookService(payload);
      if (status === 201) {
        toast.success(data.message);
        onClose();
        setChangedStatus(true)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      id="container"
      onClick={handleonClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm block md:flex md:justify-center md:items-center"
    >
      <div className="bg-white p-2 rounded-xl w-auto  px-5">
        <div className="flex justify-between items-center font-tanha font-bold text-2xl">
          <h2 className="">ویرایش {book.name} </h2>
          <button onClick={onClose}>
            <AiFillCloseCircle color="red" />
          </button>
        </div>
        <label
          className={`block md:text-base font-medium text-xs text-black font-vazir text-start mt-2`}
        >
          تغییر تصویر نویسنده
        </label>
        <CreateBookImg setBookImg={setBookImg} />
        <Formik
          initialValues={{
            bookname: book.bookname,
            AuthoroftheBook: book.AuthoroftheBook,
            description: book.description,
            PublicationDate: book.PublicationDate,
          }}
          onSubmit={(values) => {
            updateBook(values);
          }}
          validationSchema={bookvalidation}
        >
          <Form className="">
            <h1 className="font-tanha text-base md:text-2xl text-black font-bold">
              ساخت کتاب جدید
            </h1>
            <label
              className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
            >
              عنوان کتاب
            </label>
            <Field
              name="bookname"
              type="text"
              className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
            />

            <ErrorMessage
              name="bookname"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />
            <label
              className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
            >
              نام نویسنده
            </label>

            <Field
              name="AuthoroftheBook"
              as="select"
              className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
            >
              <option value=""> انتخاب نویسنده </option>
              {Authors.map((auther) => (
                <option key={auther._id} value={auther._id}>
                  {" "}
                  {auther.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="AuthoroftheBook"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />

            <label
              className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
            >
              در مورد نویسنده
            </label>
            <Field
              name="description"
              type="text"
              as="textarea"
              className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
            />

            <ErrorMessage
              name="description"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />
            <label
              className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
            >
              تاریخ انتشار
            </label>
            <Field
              name="PublicationDate"
              type="date"
              className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
            />

            <ErrorMessage
              name="PublicationDate"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />

            <div className="mx-2 flex items-start flex-col">
              <button
                type="submit"
                className="px-10 py-3 bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 transition-all delay-75"
              >
                ذخیره کتاب
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditeBook;
