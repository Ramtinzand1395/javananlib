const Yup = require("yup");

exports.schema = Yup.object().shape({
    username: Yup.string()
        .required("نام و نام خانوادگی الزامی می باشد")
        .min(3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
        .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
    email: Yup.string()
        .email("ایمیل معتبر نمی باشد")
        .required("ایمیل الزامی می باشد"),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
        status: Yup.mixed().oneOf(
            ["pendding", "qualified"],
            "یکی از 2 وضعیت زیر را انتخاب کنید"
        ),
    confirmpassword: Yup.string()
        .required("تکرار کلمه عبور الزامی می باشد")
        .oneOf([Yup.ref("password"), null], "کلمه های عبور یکسان نیستند"),
});


