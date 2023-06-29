import { HiMenuAlt3 } from "react-icons/hi";
const Layout = (props) => {
  return (
    <div>
      <nav className="h-24 bg-tmdbDarkBlue text-white flex items-center">
        <div className="container mx-auto flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold">Cinema World</h1>
          <span className="block md:hidden text-2xl">
            <HiMenuAlt3 />
          </span>
          <ul className="hidden md:flex gap-4">
            <li>Popular</li>
            <li>Top rated</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>
      {props.children}
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
