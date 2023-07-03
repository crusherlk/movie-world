import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div>
      <nav className="fixed h-24 w-full bg-tmdbDarkBlue text-white flex items-center z-50">
        <div className="container mx-auto flex items-center justify-between px-8">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold cursor-pointer select-none">
              Cinema World
            </h1>
          </Link>

          <span
            className="block md:hidden link text-2xl"
            onClick={() => {
              // console.log("clicked");
              setShowMobileMenu(true);
            }}
          >
            <HiMenuAlt3 />
          </span>
          {/* md and higher menu */}
          <ul className="hidden md:flex gap-4">
            <li>
              <Link className="link" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to={"/popular"}>
                Popular
              </Link>
            </li>
            <li>
              <Link className="link" to={"/top-rated"}>
                Top rated
              </Link>
            </li>
            <li>
              <Link className="link" to={"/contact"}>
                Contact
              </Link>
            </li>
          </ul>
          {/* mobile menu */}
          <ul
            className={`menu absolute top-0 left-0 bg-tmdbDarkBlue min-h-screen w-screen flex md:hidden flex-col items-center justify-center gap-16 ${
              showMobileMenu ? `open-menu` : null
            }`}
          >
            <li className="text-2xl">
              <Link
                className="link"
                to={"/"}
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Home
              </Link>
            </li>
            <li className="text-2xl">
              <Link
                className="link"
                to={"/popular"}
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Popular
              </Link>
            </li>
            <li className="text-2xl">
              <Link
                className="link"
                to={"/top-rated"}
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Top rated
              </Link>
            </li>
            <li className="text-2xl">
              <Link
                className="link"
                to={"/contact"}
                onClick={() => {
                  setShowMobileMenu(false);
                }}
              >
                Contact
              </Link>
            </li>
            <li
              className="text-2xl link absolute top-8 right-8"
              onClick={() => {
                setShowMobileMenu(false);
              }}
            >
              <CgClose />
            </li>
          </ul>
        </div>
      </nav>
      <div className="pt-24">
        <Outlet />
      </div>
      <footer className="h-24 mt-20 bg-tmdbDarkBlue flex items-center justify-center">
        <p className="font-semibold text-white">
          Developed by{" "}
          <a
            href="http://crusherlk.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-500"
          >
            Crusherlk
          </a>{" "}
          - 2023 &copy;
        </p>
      </footer>
    </div>
  );
};

export default Layout;
