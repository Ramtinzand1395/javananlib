import { PiBooksDuotone } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { FaInfoCircle } from "react-icons/fa";

export const BtnLinks = [
  {
    id: "1",
    title: "کتاب خانه",
    to: `#library`,
    onclick: true,
    icon: <PiBooksDuotone className="md:w-10 md:h-10 w-5 h-5 mx-1" />,
  },
  {
    id: "2",
    title: "ورود/ثبت نام  ",
    onclick: false,
    to: `/register`,
    icon: <FiLogIn className="md:w-10 md:h-10 w-5 h-5 mx-1" />,
  },
  {
    id: "3",
    title: "درباره ما",
    onclick: false,
    to: `/about-us`,
    icon: <FaInfoCircle className="md:w-10 md:h-10 w-5 h-5 mx-1" />,
  },
];
