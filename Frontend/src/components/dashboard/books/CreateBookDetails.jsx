import { Field, ErrorMessage, Formik, Form } from "formik";
import {
  getAllAuthors,
} from "../../../services/authorServices";
import { toast } from "react-toastify";
import { bookvalidation } from "../../../validation/bookValidation";
import { useEffect, useState } from "react";
import { createBookDetails } from "../../../services/booksServices";

const CreateBookDetails = ({ BookImg }) => {
  const [Authors, setAuthors] = useState([]);

  useEffect(() => {
    const GetAuthors = async () => {
      const { data } = await getAllAuthors();
      setAuthors(data);
    };
    GetAuthors();
  }, []);

  const createbook = async (values) => {
    try {
      const response = await createBookDetails({ values, BookImg });
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          bookname: "",
          AuthoroftheBook: "",
          description: "",
          PublicationDate: "",
        }}
        onSubmit={(values) => {
          createbook(values);
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
            در مورد کتاب
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
  );
};

export default CreateBookDetails;
