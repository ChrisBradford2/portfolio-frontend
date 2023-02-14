// Get profile information from Strapi and display it in the ProfileCard component

import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  MdPhoneIphone,
  MdLocationOn,
  MdEmail,
  MdCalendarToday,
  MdDownload,
  MdCheckCircle,
} from 'react-icons/md';
import { FaLinkedin, FaGithub, FaGitlab, FaDrupal, FaWordpress } from 'react-icons/fa';

interface Props {
  profileData: any;
}

const ProfileCard = ({profileData}: Props) => {
  const [birthday, setBirthday] = React.useState<any>(null);

  const getAge = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (0 > m || (0 === m && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44">
      <div className="w-full mb-6 lg:mb-0 mx-auto relative text-center bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
          <>
            <Image
              priority
              src={`${process.env.API_URL}${profileData.avatar.data.attributes.url}`}
              width={profileData.avatar.data.attributes.formats.thumbnail.width}
              height={profileData.avatar.data.attributes.formats.thumbnail.height}
              title={profileData.avatar.data.attributes.caption || null}
              alt={profileData.avatar.data.attributes.alternativeText || null}
              className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px] object-cover"
            />
            <div className="pt-[100px] pb-8">
              <h1 className="mt-6 mb-1 text-4xl font-semibold text-white">
                {profileData.title}
              </h1>
              <p className="mb-4 inline-block bg-[#1D1D1D] px-5 py-1.5 rounded-lg text-[#A6A6A6] ">
                {profileData.job}
              </p>
              <div className="flex justify-center space-x-3">
                <Link href={profileData.link_github} title="Github" target="_blank">
                  <span className="socialbtn text-[#44566C] bg-[#1D1D1D]">
                    <FaGithub />
                  </span>
                </Link>

                <Link href={profileData.link_gitlab} title="Gitlab" target="_blank">
                  <span className="socialbtn text-[#E24428] bg-[#1D1D1D]">
                    <FaGitlab />
                  </span>
                </Link>

                <Link
                  href={profileData.link_linkedin}
                  title="Linkedin"
                  target="_blank"
                >
                  <span className="socialbtn text-[#0D66C2] bg-[#1D1D1D]">
                    <FaLinkedin />
                  </span>
                </Link>

                {profileData.link_drupal && (
                  <Link href={profileData.link_drupal} title="Drupal" target="_blank">
                    <span className="socialbtn text-[#0578BE] bg-[#1D1D1D]">
                      <FaDrupal />
                    </span>
                  </Link>
                )}

                <Link href={profileData.link_blog} title="Blog" target="_blank">
                  <span className="socialbtn text-[#44566C] bg-[#1D1D1D]">
                    <FaWordpress />
                  </span>
                </Link>
              </div>
              <div className="p-7 rounded-2xl mt-7 bg-[#1D1D1D]">
                <div className="flex py-2.5 border-b border-[#3D3A3A]">
                  <span className="flex-shrink-0 socialbtn bg-black text-[#E93B81] shadow-md">
                    <MdPhoneIphone />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#A6A6A6]">
                      Phone
                    </p>
                    <p className="text-white break-all">
                      <Link
                        href={`tel:${profileData.phone}`}
                        title="Téléphone"
                        className="hover:text-[#FA5252] duration-300 transition"
                      >
                        {`${profileData.phone}`}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex py-2.5 border-b border-[#3D3A3A]">
                  <span className="flex-shrink-0 socialbtn bg-black text-[#6AB5B9]  shadow-md">
                    <MdLocationOn />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#A6A6A6]">
                      Location
                    </p>
                    <p className="text-white break-all">
                      {profileData.location}
                    </p>
                  </div>
                </div>
                <div className="flex py-2.5 border-b border-[#3D3A3A]">
                  <span className="flex-shrink-0 socialbtn bg-black text-[#FD7590] shadow-md">
                    <MdEmail />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#A6A6A6]">
                      Email
                    </p>
                    <p className="text-white break-all">
                      <Link
                        href={`mailto:${profileData.email}`}
                        title="Email"
                        className="hover:text-[#FA5252] duration-300 transition"
                      >
                        {profileData.email}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex py-2.5">
                  <span className="flex-shrink-0 socialbtn bg-black text-[#C17CEB] shadow-md">
                    <MdCalendarToday />
                  </span>
                  <div className="text-left ml-2.5">
                    <p className="text-xs text-[#A6A6A6]">
                      Age
                    </p>
                    <p className="text-white break-all">{birthday} ans</p>
                  </div>
                </div>
              </div>
              <Link
                href={`${process.env.API_URL}${
                  profileData.resume && profileData.resume.data.attributes.url
                }`}
                title={
                  (profileData.resume && profileData.resume.data.attributes.name) ||
                  null
                }
                target="_blank"
                type={profileData.resume && profileData.resume.data.attributes.mime}
                className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:animate-pulse px-8 py-3 text-lg text-white rounded-[35px] mt-6"
              >
                <MdDownload className="mr-2" />
                {(profileData.resume && profileData.resume.data.attributes.caption) ||
                  'null'}
              </Link>
            </div>
          </>
      </div>
    </div>
  );
};

export default ProfileCard;
