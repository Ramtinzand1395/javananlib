import { useState } from "react";
import RegCss from "./register.module.css";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Field, ErrorMessage, Formik, Form } from "formik";
import {  useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../../services/userServices";
import { toast } from "react-toastify";
import { uservalidation } from "../../validation/userValidation";

const Register = () => {
  const [signInClicked, setSignInClicked] = useState(false);
  const navigate = useNavigate()
const createuser = async(values) =>{
try {
  const {data:user} = await createUser(values);
  if(user){
    toast.success("اطلاعات شما با موفقیت ذخیره شد.");
    navigate("/");
  }
} catch (err) {
  toast.error(err.response.data)
  console.log(err)
}
};

const loginuser = async(values)=>{
  try {
    const {data:user} = await loginUser(values);
    localStorage.setItem("token", user.token);
    toast.success("خوش آمدید.");
    navigate(`/dashboard/${user.userId}`);
  } catch (err) {
  toast.error(err.response.data)
  console.log(err)
  }
};

  return (
    <div className={RegCss.bg}>
      <div>
        <div
          className={`${
            signInClicked ? RegCss.rightPanelActive : RegCss.container
          } ${RegCss.container} w-[100vw] h-[80vh] md:w-[70vw] md:h-[90vh]`}
          id="container"
        >
          <div className={`${RegCss.signUpContainer} ${RegCss.formContainer}`}>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                createuser(values);
              }}
              validationSchema={uservalidation}
            >
              <Form className={RegCss.regform}>
                <h1 className="font-tanha text-base md:text-2xl text-black font-bold">
                  ساخت حساب جدید
                </h1>
                <div className="flex items-center justify-between w-40 my-2 ">
                  <FaInstagram className="text-red-500" size={25} />
                  <FaWhatsapp className="text-green-500" size={25} />
                  <FaTelegram className="text-blue-500" size={25} />
                </div>
                <span className="font-tanha text-xs  md:text-base my-2">
                  برای ایجاد حساب جدید ثبت نام کنید و منتظر تایید ادمین باشید.
                </span>
                <div className="w-full">
                  <label
                    className={`block text-xs md:text-base font-medium  text-black font-vazir text-start`}
                  >
                    نام کاربری{" "}
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 p-1 md:p-2.5 mb-4"
                  />

                  <ErrorMessage
                    name="username"
                    render={(msg) => (
                      <div className="text-red-500 font-vazir">{msg}</div>
                    )}
                  />
                </div>
                <div className="w-full">
                  <label
                    className={`block text-start text-xs md:text-base font-medium  font-vazir text-black`}
                  >
                    ایمیل{" "}
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 p-1 md:p-2.5 mb-4 "
                  />

                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <div className="text-red-500  ">{msg}</div>
                    )}
                  />
                </div>
                <div className="w-full">
                  <label
                    className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
                  >
                    رمز عبور{" "}
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 p-1 md:p-2.5 mb-4"
                  />

                  <ErrorMessage
                    name="password"
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
                <div className="w-full">
                  <label
                    className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
                  >
                    تکرار رمز عبور{" "}
                  </label>
                  <Field
                    name="confirmpassword"
                    type="password"
                    className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 p-1 md:p-2.5 mb-4"
                  />

                  <ErrorMessage
                    name="confirmpassword"
                    render={(msg) => <div className="text-red-500 ">{msg}</div>}
                  />
                </div>
                <div className="mx-2 flex items-start flex-col">
                  <button type="submit" className="px-10 py-3 bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 transition-all delay-75">
                    ثبت نام
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className={`${RegCss.signInContainer} ${RegCss.formContainer}`}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                loginuser(values);
              }}
            >
              <Form className={RegCss.regform}>
                <h1 className="font-tanha text-base md:text-2xl text-black font-bold">
                  ورود به حساب کاربری
                </h1>
                <div className="flex items-center justify-between w-40 my-5">
                  <FaInstagram className="text-red-500" size={25} />
                  <FaWhatsapp className="text-green-500" size={25} />
                  <FaTelegram className="text-blue-500" size={25} />
                </div>
                <div>
                  <label
                    className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
                  >
                    ایمیل{" "}
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
                  />

                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <div className="text-red-500 m-4">{msg}</div>
                    )}
                  />
                </div>
                <div className="">
                  <label
                    className={`block md:text-base font-medium text-xs text-black font-vazir text-start`}
                  >
                    پسورد
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="bg-blue-400 focus:bg-blue-600 border border-black text-white text-base rounded-lg block w-11/12 md:w-full p-1 md:p-2.5 m-4"
                  />

                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <div className="text-red-500 m-4">{msg}</div>
                    )}
                  />
                </div>
                <div className="mx-2 flex items-start flex-col">
                  <button type="submit"  className="px-10 py-3 bg-blue-400 font-vazir mt-5 rounded-full hover:bg-blue-500 transition-all delay-75">
                    ورود
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className={`${RegCss.overlayContainer}`}>
            <div className={`${RegCss.overlay}`}>
              <div className={`${RegCss.overlayLeft} ${RegCss.overlayPanel}`}>
                <h1 className="font-tanha text-base md:text-2xl text-white font-bold">
                  خوش آمدید
                </h1>
                <p className="font-tanha text-xs my-2">
                  برای استفاده از نرم افزار و تماس با ما
                </p>
                <button
                  className="bg-transparent bg-white whitespace-nowrap text-black px-10 py-2 font-vazir mt-5 rounded-full"
                  onClick={() => setSignInClicked(false)}
                  id="signIn"
                >
                  وارد شوید
                </button>
              </div>
              <div className={`${RegCss.overlayRight} ${RegCss.overlayPanel}`}>
                <h1 className="font-tanha text-base md:text-2xl text-white font-bold">
                  دوست کتابخوان من سلام
                </h1>
                <p className="font-tanha text-xs my-2">
                  اطلاعات حساب خود را تکمیل کنید و به ما بپیوندید.
                </p>
                <button
                  className="bg-transparent bg-white whitespace-nowrap text-black px-10 py-2 font-vazir mt-5 rounded-full"
                  onClick={() => setSignInClicked(true)}
                  id="signUp"
                >
                  ثبت نام
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
