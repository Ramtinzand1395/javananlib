import { Link } from "react-router-dom";
import { BtnLinks } from "../../data/navbarLinks";
import { useRef } from "react";

const Navbar = () => {
  const ScrollTolibrarySection = () => {
    const librarySectionRef = useRef(null);
    librarySectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="h-[10vh] container mt-2">
      <div className="grid grid-cols-3 gap-4 md:gap-4 m-auto justify-center">
        {BtnLinks.map((btn) => (
          <div key={btn.id} className="justify-center flex">
            <Link onClick={btn.onclick  ? ScrollTolibrarySection : null} to={btn.to}>
              <button className="px-2 py-2 text-white bg-blue-500 flex items-center justify-center text-xs font-vazir rounded-lg whitespace-nowrap md:text-lg md:px-5 hover:bg-blue-800 transition-all delay-100">
                {btn.icon}
                {btn.title}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
