import Link from "next/link";
import React from "react";
import { MdCode, MdHome, MdOutlineArticle, MdOutlineContacts } from "react-icons/md";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const currentPath = "w-full h-20 rounded-[10px]  cursor-pointer  font-poppins  bg-[#F3F6F6]  font-medium px-2.5  text-xtiny text-gray-lite dark:text-[#A6A6A6]    justify-center flex flex-col items-center   transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] lg:text-white lg:dark:text-white   lg:bg-gradient-to-r from-[#FA5252] to-[#DD2476] "
  const inactivePath = "w-full h-20 rounded-[10px]  cursor-pointer  font-poppins  bg-[#F3F6F6]  font-medium px-2.5  text-xtiny text-gray-lite dark:text-[#A6A6A6]    justify-center flex flex-col items-center   transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] "
  return (
    <header className="lg:w-[526px] h-[144px] hidden lg:block p-[30px] ml-auto mb-10 rounded-[16px] bg-white dark:bg-[#111111]">
      <nav className="hidden lg:block">
        <ul className="flex justify-around">
          <li>
            <Link
              href="/"
              title="Accueil"
              className={router.pathname === "/" ? currentPath : inactivePath}
            >
              <span className="text-xl mb-1">
                <MdHome className="text-xl" />
              </span>
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              title="Resume"
              className={router.pathname === "/resume" ? currentPath : inactivePath}
            >
              <span className="text-xl mb-1">
                <MdOutlineArticle className="text-xl" />
              </span>
              Parcours
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              title="Projets"
              className={router.pathname === "/projects" ? currentPath : inactivePath}
            >
              <span className="text-xl mb-1">
                <MdCode className="text-xl" />
              </span>
              Projets
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              title="Contact"
              className={router.pathname === "/contact" ? currentPath : inactivePath}
            >
              <span className="text-xl mb-1">
                <MdOutlineContacts className="text-xl" />
              </span>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
