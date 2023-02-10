// Get profile information from Strapi and display it in the ProfileCard component

import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  MdPhoneIphone,
  MdLocationOn,
  MdEmail,
  MdCalendarToday,
  MdDownload,
  MdCheckCircle,
} from "react-icons/md";
import { FaLinkedin, FaGithub, FaGitlab, FaDrupal, FaWordpress } from "react-icons/fa";

const ProfileCard = () => {
  // Fetch the data from Strapi and display it in the ProfileCard component``

  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [birthday, setBirthday] = React.useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      setProfile(JSON.parse(storedData));
      setLoading(false);
      setBirthday(getAge(JSON.parse(storedData).birthday));
    }
    const fetchProfile = async () => {
      const res = await fetch(`${process.env.API_URL}/api/profile?populate=*`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      });
      const data = await res.json();
      setProfile(data.data.attributes);
      setLoading(false);
      setBirthday(getAge(data.data.attributes.birthday));
      localStorage.setItem('profileData', JSON.stringify(data.data.attributes));
    };
    fetchProfile();
  }, []);

  const getAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!profile) {
    return (
      <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44">
        <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
          <div className="pt-[100px] pb-8">
            <h1 className="mt-6 mb-1 text-4xl font-semibold dark:text-white">
              Loading
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44">
      <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
          <>
            <Image
              priority
              src={`${process.env.API_URL}${profile.avatar.data.attributes.url}`}
              width={profile.avatar.data.attributes.formats.thumbnail.width}
              height={profile.avatar.data.attributes.formats.thumbnail.height}
              title={profile.avatar.data.attributes.caption || null}
              alt={profile.avatar.data.attributes.alternativeText || null}
              className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
            />
            <div className="pt-[100px] pb-8">
              <h1 className="mt-6 mb-1 text-4xl font-semibold dark:text-white">
                {profile.title}
              </h1>
              <p className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6] ">
                {profile.job}
              </p>
              <div className="flex justify-center space-x-3">
                <Link href={profile.link_github} title="Github" target="_blank">
                  <span className="socialbtn text-[#44566C] bg-[#1D1D1D]">
                    <FaGithub />
                  </span>
                </Link>

                <Link href={profile.link_gitlab} title="Gitlab" target="_blank">
                  <span className="socialbtn text-[#E24428] bg-[#1D1D1D]">
                    <FaGitlab />
                  </span>
                </Link>

                <Link
                  href={profile.link_linkedin}
                  title="Linkedin"
                  target="_blank"
                >
                  <span className="socialbtn text-[#0D66C2] bg-[#1D1D1D]">
                    <FaLinkedin />
                  </span>
                </Link>

                <Link href={profile.link_drupal} title="Drupal" target="_blank">
                  <span className="socialbtn text-[#0578BE] bg-[#1D1D1D]">
                    <FaDrupal />
                  </span>
                </Link>

                <Link href={profile.link_blog} title="Blog" target="_blank">
                  <span className="socialbtn text-[#44566C] bg-[#1D1D1D]">
                    <FaWordpress />
                  </span>
                </Link>
              </div>
              <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
                <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
                  <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#E93B81] shadow-md">
                    <MdPhoneIphone />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                      Phone
                    </p>
                    <p className="dark:text-white break-all">
                      <Link
                        href={`tel:${profile.phone}`}
                        title="Téléphone"
                        className="hover:text-[#FA5252] duration-300 transition"
                      >
                        {`${profile.phone}`}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
                  <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#6AB5B9]  shadow-md">
                    <MdLocationOn />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                      Location
                    </p>
                    <p className="dark:text-white break-all">
                      {profile.location}
                    </p>
                  </div>
                </div>
                <div className="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]">
                  <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#FD7590] shadow-md">
                    <MdEmail />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                      Email
                    </p>
                    <p className="dark:text-white break-all">
                      <Link
                        href={`mailto:${profile.email}`}
                        title="Email"
                        className="hover:text-[#FA5252] duration-300 transition"
                      >
                        {profile.email}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex py-2.5">
                  <span className="flex-shrink-0 socialbtn bg-white dark:bg-black text-[#C17CEB] shadow-md">
                    <MdCalendarToday />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                      Age
                    </p>
                    <p className="dark:text-white break-all">{birthday} ans</p>
                  </div>
                </div>
              </div>
              <Link
                href={`${process.env.API_URL}${
                  profile.resume && profile.resume.data.attributes.url
                }`}
                title={
                  (profile.resume && profile.resume.data.attributes.name) ||
                  null
                }
                target="_blank"
                type={profile.resume && profile.resume.data.attributes.mime}
                className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476] to-[#fa5252ef] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
              >
                <MdDownload className="mr-2" />
                {(profile.resume && profile.resume.data.attributes.caption) ||
                  "null"}
              </Link>
            </div>
          </>
      </div>
    </div>
  );
};

export default ProfileCard;
