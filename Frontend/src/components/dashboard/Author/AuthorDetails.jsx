import { Field, ErrorMessage, Formik, Form } from "formik";
import { createAuthorDetails} from "../../../services/authorServices";
import { toast } from "react-toastify";
import { authorValidation } from "../../../validation/authorValidation";

const AuthorDetails = ({ AuthorImg }) => {
  const createauthor = async (values) => {
    try {
      const response = await createAuthorDetails({ values, AuthorImg });
      toast.success(response.data.message)
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={(values) => {
          createauthor(values);
        }}
        validationSchema={authorValidation}
      >
        <Form className="">
          <h1 className="font-tanha text-base md:text-2xl text-black font-bold">
            اطلاعات نویسنده
          </h1>
          <div>
            <label
              className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
            >
              نام نویسنده
            </label>
            <Field
              name="name"
              type="text"
              className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
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
              className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
            />

            <ErrorMessage
              name="description"
              render={(msg) => <div className="text-red-500 m-4">{msg}</div>}
            />
          </div>
          <div className="mx-2 flex items-start flex-col">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 transition-all delay-75"
            >
              ثبت نویسنده
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthorDetails;
