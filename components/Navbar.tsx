import Link from "next/link";
import React from "react";
import { MdHome } from "react-icons/md";

export default function Navbar() {
  return (
    <header className="lg:w-[526px] h-[144px] hidden lg:block p-[30px] ml-auto mb-10 rounded-[16px] bg-white dark:bg-[#111111]">
      <nav className="hidden lg:block">
        <ul className="flex">
          <li>
            <Link
              href="/"
              title="Accueil"
              className="w-full h-20 rounded-[10px] cursor-pointer font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-white dark:text-white justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white lg:text-white lg:dark:text-white lg:bg-gradient-to-r from-[#FA5252] to-[#DD2476]"
            >
              <span className="text-xl mb-1">
                <MdHome className="text-[#6AB5B9] text-[20px] " />
              </span>
              Accueil
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
