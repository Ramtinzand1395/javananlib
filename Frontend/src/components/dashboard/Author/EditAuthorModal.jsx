import { Field, ErrorMessage, Formik, Form } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { updateAuthorService } from "../../../services/authorServices";
import { toast } from "react-toastify";
import { useState } from "react";
import CreateAuthorImg from "./CreateAuthorImg";

const EditAuthorModal = ({ visible, onClose, author }) => {
  const [AuthorImg, setAuthorImg] = useState(null);
  if (!visible) return null;
  const handleonClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  const updateAuthor = async (values) => {
    try {
      const payload = {
        ...values,
        authorId: author._id,
        authorLastImg: author.authorImage,
        AuthorImg,
      };
      const { data, status } = await updateAuthorService(payload);
      if (status === 201) {
        toast.success(data.message);
        onClose();
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
          <h2 className="">ویرایش {author.name} </h2>
          <button onClick={onClose}>
            <AiFillCloseCircle color="red" />
          </button>
        </div>
        <label
          className={`block md:text-base font-medium text-xs text-black font-vazir text-start mt-2`}
        >
          تغییر تصویر نویسنده
        </label>
        <CreateAuthorImg setAuthorImg={setAuthorImg} />
        <Formik
          initialValues={{
            name: author.name,
            description: author.description,
          }}
          onSubmit={(values) => {
            updateAuthor(values);
          }}
          // validationSchema={authorValidation}
        >
          <Form>
            <div className="mt-5">
              {/**author pic */}

              <label
                className={`block md:text-base font-medium text-xs text-black font-vazir text-start mt-2`}
              >
                نام نویسنده
              </label>
              <Field
                name="name"
                type="text"
                className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-auto p-1 md:p-2.5 m-4"
              />

              <ErrorMessage
                name="name"
                render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
              />
            </div>
            <div className="">
              <label
                className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
              >
                در مورد نویسنده
              </label>
              <Field
                name="description"
                type="text"
                as="textarea"
                className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-auto p-1 md:p-2.5 m-4"
              />

              <ErrorMessage
                name="description"
                render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
              />
            </div>
            <div className="mx-2 flex items-start flex-col">
              <button
                type="submit"
                className="px-10 py-3 bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 hover:text-white transition-all delay-100"
              >
                ثبت تغییرات
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditAuthorModal;
