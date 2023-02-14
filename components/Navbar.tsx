import Link from 'next/link';
import React from 'react';
import { MdCode, MdHome, MdOutlineArticle, MdOutlineContacts } from 'react-icons/md';
import { SiSpinrilla } from 'react-icons/si';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState<string | null>(null);

  const handleClick = (link: string) => {
    setLoading(link);
    // Code pour charger la page ici
  };


  return (
    <header className="lg:max-w-lg h-36 block p-8 ml-auto mb-10 rounded-2xl bg-[#111111]">
      <nav className="block">
        <ul className="flex justify-around">
          <li>
            <Link
              href="/"
              title="Accueil"
              className={`inactive-path${'/' === router.pathname ? ' current-path' : ''}`}
              onClick={() => handleClick('/')}
            >
              <span className="text-xl mb-1">
                {'/' === isLoading ? <SiSpinrilla className="animate-spin" /> : <MdHome className="text-xl" />}
              </span>
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              title="Resume"
              className={`inactive-path${'/resume' === router.pathname ? ' current-path' : ''}`}
              onClick={() => handleClick('/resume')}
            >
              <span className="text-xl mb-1">
                {'/resume' === isLoading ? <SiSpinrilla className="animate-spin" /> : <MdOutlineArticle className="text-xl" />}
              </span>
              Parcours
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              title="Projets"
              className={`inactive-path${'/projects' === router.pathname ? ' current-path' : ''}`}
              onClick={() => handleClick('/projects')}
            >
              <span className="text-xl mb-1">
                {'/projects' === isLoading ? <SiSpinrilla className="animate-spin" /> : <MdCode className="text-xl" />}
              </span>
              Projets
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              title="Contact"
              className={`inactive-path${'/contact' === router.pathname ? ' current-path' : ''}`}
              onClick={() => handleClick('/contact')}
            >
              <span className="text-xl mb-1">
                {'/contact' === isLoading ? <SiSpinrilla className="animate-spin" /> : <MdOutlineContacts className="text-xl" />}
              </span>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
