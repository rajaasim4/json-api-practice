import { useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";
import useClickOutsideDetector from "../../Hooks/useClickOutsideDetector";
const Navbar = () => {
  const [show, setShow] = useState(false);
  let mainmenu = useRef("main_nav");
  useClickOutsideDetector(mainmenu, () => {
    setShow(false);
  });
  return (
    <>
      <nav className="w-full  h-24 flex items-center justify-center mb-10 ">
        <div className="w-11/12   flex items-center justify-evenly  md:justify-between md:w-10/12 ">
          <Link to="/" className="cursor-pointer">
            <h2>API Integeration</h2>
          </Link>
          <div
            className={` ${
              show ? "md:w-9/12" : "md:w-0"
            } w-4/5  flex items-center justify-around md:fixed md:top-0 md:left-0 md:h-full md:flex-col md:bg-slate-200 md:justify-evenly md:overflow-hidden md:duration-300 ease-in z-20`}
            ref={mainmenu}
          >
            <div className="w-5/12 md:h-3/5 sm:w-7/12 ">
              <ul className="flex justify-evenly md:flex-col md:h-full">
                <li>
                  <Link to="/" className=" text-base">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/AddProduct"
                    className=" text-base"
                    onClick={() => setShow(!show)}
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/DeleteProduct"
                    className=" text-base"
                    onClick={() => setShow(!show)}
                  >
                    Delete Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Paginated"
                    className=" text-base"
                    onClick={() => setShow(!show)}
                  >
                    Paginated
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="text-3xl hidden md:block  cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <VscChromeClose /> : <BiMenuAltRight />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
