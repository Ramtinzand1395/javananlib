
import { useRef, useState } from "react";
import { ErrorMessage, Formik, Form } from "formik";
import { toast } from "react-toastify";
import { createBookImg } from "../../../services/booksServices";

const CreateBookImg = ({setBookImg}) => {
    const [Img, setImg] = useState(null);
    const [Preview, setPreview] = useState("");
    const inputRef = useRef(null);
    const handleImg = (e) => {
      const file = e.target.files[0];
      transform(file);
      setImg(file);
    };
    const transform = (file) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result);
        };
      }
    };
  
    const handleDeletePic = () => {
      setImg(null);
      setPreview("");
      setBookImg("");
      if (inputRef.current) {
        inputRef.current.value = ""; // Reset the input field value using the ref
      }
    };
  
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append("bookImage", Img);
      try {
        const { data, status } = await createBookImg(formData);
        if (status === 200) {
          setBookImg(data.data);
          toast.success(data.message);
        }
      } catch (err) {
        console.log(err); // Handle errors
        toast.error(err.response.data.message);
        toast.error(err.response.data);
      }
    };
  return (
    <div>
          <Formik
          initialValues={{
            bookImage: null,
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form className="flex items-center justify-center">
            {/* Other form fields */}
            <div className="mb-4">
              <label
                htmlFor="bookImage"
                className="block font-medium text-gray-700"
              >
                آپلود عکس کتاب
              </label>
              <input
                ref={inputRef}
                id="bookImage"
                name="bookImage"
                type="file"
                onChange={handleImg}
                className="mt-1 p-2 border rounded-md"
              />
            </div>

            <ErrorMessage
              name="bookImage"
              component="div"
              className="text-red-500"
            />
            {Img && (
              <>
                <img src={Preview} className="w-20 h-20 mx-3" alt="" />
              </>
            )}
            <div className="flex items-center justify-center">
              <button
                className="py-4 px-2 mx-2 rounded-lg bg-green-300 hover:bg-green-500 ease-in-out delay-75 transition-all hover:text-white"
                type="submit"
              >
                آپلود عکس
              </button>
              <button
                onClick={handleDeletePic}
                type="button"
                className="py-4 px-2 mx-2 rounded-lg bg-red-300  hover:bg-red-500 ease-in-out delay-75 transition-all hover:text-white"
              >
                حذف عکس
              </button>
            </div>
          </Form>
        </Formik>
    </div>
  )
}

export default CreateBookImg;
