import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import ProfileCard from './ProfileCard';

interface Props {
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => (
    <main className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed dark:bg-homeTwoBg-dark md:pb-16 w-full">
    <div className="container mx-auto grid grid-cols-12 md:gap-10 justify-between lg:pt-[220px]">
      <ProfileCard />
      <div className="col-span-12 lg:col-span-8">
        <Navbar />
        <div className="lg:rounded-2xl bg-white dark:bg-[#111111]">
          <div data-aos="fade" className="aos-init aos-animate">
            { children }
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </main>
);

export default Container;