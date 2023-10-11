import { useEffect, useState } from "react";
import getMenuLinks from "../data/sidbarLinks"; // Adjust the import path
import {
  BsArrowRightShort,
  Bs0SquareFill,
  BsChevronDown,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [Open, setOpen] = useState(true);
  const [SubmenuOpen, setSubmenuOpen] = useState(false);
  const [MenuLinks, setMenuLinks] = useState([]);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token")
    toast.info("برگرد");
    navigate("/");
  };
  useEffect(() => {
    const MenuLinks = getMenuLinks();
    setMenuLinks(MenuLinks);
  }, []);
  return (
    <div
      className={`bg-purple-600 h-[100vh] p-5 pt-8  duration-300 relative ${
        Open ? "w-72" : "w-20"
      }`}
    >
      <div className="absolute top-9 -left-3">
        <BsArrowRightShort
          onClick={() => setOpen(!Open)}
          className={`bg-white text-3xl rounded-full   border border-black cursor-pointer duration-500 ${
            !Open && "rotate-180"
          }`}
        />
      </div>

      <div className="inline-flex">
        <Bs0SquareFill
          className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left ml-2 duration-500 ${
            Open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-2xl duration-300 ${
            !Open && "scale-0"
          }`}
        >
          logo
        </h1>
      </div>

      {/**li */}
      {MenuLinks.map((menu, index) => (
        <div key={index}>
          {menu.to === undefined ? (
            <button
              onClick={menu.title === "خروج" ? (() => handlelogout()) : undefined}
              className={`font-vazir text-white duration-150 text-sm flex items-center gap-x-4 cursor-pointer w-full p-2 hover:bg-purple-900 hover:border rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              } `}
            >
              {menu.icon}
              <p
                onClick={
                  menu.title === "سرور ها " ?
                  (() => setSubmenuOpen(!SubmenuOpen))
                  :
                  undefined
                }
                className={`text-base text-start font-tanha font-medium flex-1 duration-200 ${
                  !Open && "hidden"
                }`}
              >
                {menu.title}
              </p>
              {menu.submenu && Open && (
                <BsChevronDown
                  className={`${SubmenuOpen && "rotate-180"} duration-300`}
                  onClick={() => setSubmenuOpen(!SubmenuOpen)}
                />
              )}
            </button>
          ) : (
            <Link
              to={menu?.to}
              className={`font-vazir text-white duration-150 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-purple-900 hover:border rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              } `}
            >
              {menu.icon}
              <button
                className={`text-base text-start font-tanha font-medium flex-1 duration-200 ${
                  !Open && "hidden"
                }`}
              >
                {menu.title}
              </button>
            </Link>
          )}

          {menu.submenu && SubmenuOpen && Open && (
            <ul>
              {menu.subitems.map((item, index) => (
                <li
                  key={index}
                  className={`text-start font-tanha text-white  duration-150 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-purple-900 hover:border rounded-md ${
                    menu.spacing ? "mt-9" : "mt-2"
                  }`}
                >
                  <span>{item.icon}</span>
                  <Link
                    to={item.to}
                    className={`text-base font-medium flex-1 duration-200 ${
                      !Open && "hidden"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
