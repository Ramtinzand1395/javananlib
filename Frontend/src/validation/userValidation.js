import * as Yup from "yup";

export const uservalidation = Yup.object().shape({
    username: Yup.string()
        .required(" نام کاربری الزامی می باشد")
        .min(3, " نام کاربری نباید کمتر از 3 کاراکتر باشد")
        .max(255, " نام کاربری نباید بیشتر از 255 کاراکتر باشد"),
    email: Yup.string()
        .email("ایمیل معتبر نمی باشد")
        .required("ایمیل الزامی می باشد"),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
    confirmpassword: Yup.string()
        .required("تکرار کلمه عبور الزامی می باشد")
        .oneOf([Yup.ref("password"), null], "کلمه های عبور یکسان نیستند"),
});

export const updateUserValidation = Yup.object().shape({
    username: Yup.string()
        .required(" نام کاربری الزامی می باشد")
        .min(3, " نام کاربری نباید کمتر از 3 کاراکتر باشد")
        .max(255, " نام کاربری نباید بیشتر از 255 کاراکتر باشد"),
    email: Yup.string()
        .email("ایمیل معتبر نمی باشد")
        .required("ایمیل الزامی می باشد"),
});
