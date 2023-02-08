import Head from "next/head";
import { Inter } from "@next/font/google";
import ProfileCard from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";

const Contact: React.FC = () => {
  return (
    <>
      {/* SEO 
      <Head>
        <title>{seo.metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="canonical" href={seo.canonicalURL} />
        <meta name="viewport" content={seo.metaViewport} />
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="author" content={seo.metaAuthor} />
        <meta name="robots" content={seo.metaRobots} />
      </Head>*/}
      <main className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed dark:bg-homeTwoBg-dark md:pb-16 w-full">
        <div className="container mx-auto grid grid-cols-12 md:gap-10 justify-between lg:pt-[220px]">
          <ProfileCard />
          <div className="col-span-12 lg:col-span-8">
            <Navbar />
            <div className="lg:rounded-2xl bg-white dark:bg-[#111111]">
              <div data-aos="fade" className="aos-init aos-animate">
                <div className="container px-4 sm:px-5 md:px-10 lg:px-14">
                  <div className="py-12">
                    <h2 className="after-effect after:left-48 mt-12 lg:mt-0 mb-12 md:mb-[30px]">
                      Contact
                    </h2>
                    <div className="  dark:border-[#212425] dark:border-2 mb-16  md:p-[48px]  p-4   bg-color-810 rounded-xl dark:bg-[#111111] mb-[30px] md:mb-[60px]">
                      <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
                      <p className="mb-4">
                        I'm currently looking for new opportunities, my inbox is
                        always open. Whether you have a question or just want to
                        say hi, I'll try my best to get back to you!
                      </p>
                      <form className="w-full max-w-lg">
                        {/* Form underlines */}
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block" htmlFor="grid-first-name">
                              <span className="text-gray-500">First Name</span>
                              <input
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                                id="grid-first-name"
                                type="text"
                                placeholder="Jane"
                              />
                            </label>
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <label className="block" htmlFor="grid-last-name">
                              <span className="text-gray-500">Last Name</span>
                              <input
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                                id="grid-last-name"
                                type="text"
                                placeholder="Doe"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label className="block" htmlFor="grid-email">
                              <span className="text-gray-500">Email</span>
                              <input
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                                id="grid-email"
                                type="email"
                                placeholder="jane.doe@example.com"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            {/* Object is a select */}
                            <label className="block" htmlFor="grid-object">
                              <span className="text-gray-500">Object</span>
                              <select
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                                id="grid-object"
                              >
                                <option disabled value="">
                                  Choose an object
                                </option>
                                <option value="Job offer">Job offer</option>
                                <option value="Project">Project</option>
                                <option value="Other">Other</option>
                              </select>
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                          <div className="w-full px-3">
                            <label className="block" htmlFor="grid-message">
                              <span className="text-gray-500">Message</span>
                              <textarea
                                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                                id="grid-message"
                                placeholder="Hi, I'm interested in your profile"
                              />
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476] to-[#fa5252ef] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
