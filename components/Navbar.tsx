import Link from "next/link";
import React from "react";
import { MdCode, MdHome, MdOutlineArticle, MdOutlineContacts } from "react-icons/md";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <header className="lg:w-[526px] h-[144px] hidden lg:block p-[30px] ml-auto mb-10 rounded-[16px] bg-white dark:bg-[#111111]">
      <nav className="hidden lg:block">
        <ul className="flex justify-around">
          <li>
            <Link
              href="/"
              title="Accueil"
              className={`inactive-path${router.pathname === "/" ? " current-path" : ""}`}
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
              className={`inactive-path${router.pathname === "/resume" ? " current-path" : ""}`}
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
              className={`inactive-path${router.pathname === "/projects" ? " current-path" : ""}`}
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
              className={`inactive-path${router.pathname === "/contact" ? " current-path" : ""}`}
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
