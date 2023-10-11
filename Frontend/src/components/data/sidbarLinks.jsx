import jwtDecode from "jwt-decode";
import { AiFillSignal, AiOutlineDashboard } from "react-icons/ai";
import { BiExit, BiUser } from "react-icons/bi";
import { FaHome, FaMoneyBill, FaUsers } from "react-icons/fa";
const getMenuLinks = () => {
  const token = localStorage.getItem("token");
  let menuLinks = [];

  if (token) {
    const user = jwtDecode(token);

    if (user.isAdmin === true) {
      menuLinks = [
        {
          id: "1",
          title: "خانه",
          to: `/`,
          icon: <FaHome className="text-3xl" />,
        },
        {
          id: "2",
          title: "داشبورد",
          to: `/dashboard/${user.userId}`,
          icon: <AiOutlineDashboard className="text-3xl" />,
        },
        {
          id: "3",
          title: "کاربران",
          to: `/dashboard/${user.userId}/users`,
          icon: <FaUsers className="text-3xl" />,
        },
        {
          id: "4",
          title: "درخواست ها",
          to: `/dashboard/${user.userId}/requests`,
          icon: <FaUsers className="text-3xl" />,
        },
        {
          id: "5",
          title: "خروج",
          icon: <BiExit className="text-3xl" />,
        },
        {
          id: "6",
          title: " جدید ",
          icon: <AiFillSignal className="text-3xl" />,
          spacing: true,
          submenu: true,
          subitems: [
            {
              title: "ساخت نویسنده جدید ",
              to: `/dashboard/${user.userId}/create-auther`,
              icon: <FaMoneyBill className="text-3xl" />,
            },
            {
              title: "ساخت کتاب جدید ",
              to: `/dashboard/${user.userId}/create-book`,
              icon: <BiUser className="text-3xl" />,
            },
          ],
        },
      ];
    } else {
      menuLinks = [
        {
          id: "1",
          title: "خانه",
          to: `/`,
          icon: <FaHome className="text-3xl" />,
        },
        {
          id: "2",
          title: "داشبورد",
          to: `/dashboard/${user.userId}`,
          icon: <AiOutlineDashboard className="text-3xl" />,
        },
        {
          id: "3",
          title: "ویرایش حساب کاربری",
          to: `/dashboard/${user.userId}/update-user`,
          icon: <AiOutlineDashboard className="text-3xl" />,
        },
        {
          id: "4",
          title: " پاسخ به درخواست ها ",
          to: `/dashboard/${user.userId}/response`,
          icon: <FaUsers className="text-3xl" />,
        },
        {
          id: "4",
          title: "خروج",
          icon: <BiExit className="text-3xl" />,
        },
      ];
    }
  }

  return menuLinks;
};

export default getMenuLinks;
