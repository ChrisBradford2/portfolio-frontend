import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';
import AOS from "aos";
import "aos/dist/aos.css";
interface Props {
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
    React.useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    /* Preload the other pages */
    return (
      <main className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed bg-dark md:pb-16 w-full">
      <div className="container mx-auto grid grid-cols-12 md:gap-10 justify-between lg:pt-[220px]">
        <ProfileCard />
        <div className="col-span-12 lg:col-span-8">
          <Navbar />
          <div className="lg:rounded-2xl bg-[#111111]">
            <div data-aos="fade">
              { children }
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
    );
};

export default Container;