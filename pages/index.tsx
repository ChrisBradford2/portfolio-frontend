import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  data: any;
  error: any;
  body: any;
  school: any;
  professional_experience: any;
  profile: any;
  env: string;
  meta: any;
}

const Home = ({
  data,
  body,
  school,
  professional_experience,
  profile,
  env,
  meta,
}: Props) => {
  return (
    <>
      <Head>
        <title>{meta.meta_title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content={meta.meta_viewport} />
        <meta name="description" content={meta.meta_description} />
        <meta name="keywords" content={meta.meta_keywords} />
        <meta name="author" content={meta.meta_author} />
        <meta name="robots" content={meta.meta_robots} />
      </Head>

      <main className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed dark:bg-homeTwoBg-dark md:pb-16 w-full">
        <div className="container mx-auto grid grid-cols-12 md:gap-10 justify-between lg:pt-[220px]">
          <ProfileCard profile={profile} env={env} />
          <Navbar />
        </div>
      </main>
    </>
  );
};

// Get data from Strapi with the token from the environment variable
Home.getInitialProps = async () => {
  const query = `?populate[]=profile_picture&populate[]=background_image&populate[]=sub_title&populate[]=body.resume&populate[]=school.comment&populate[]=professional_experience&populate[]=meta&populate[]=profile.links&populate[]=profile.avatar&populate[]=profile.resume`;
  const res = await fetch(`${process.env.API_URL}/api/homepage${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const data = await res.json();
  const error = data.error || null;
  const meta = data.data.attributes.meta;
  const body = data.data.attributes.body;
  const school = data.data.attributes.school;
  const professional_experience = data.data.attributes.professional_experience;
  const profile = data.data.attributes.profile;
  const env = process.env.API_URL;

  return {
    data: data.data,
    error: error,
    body: body,
    school: school,
    professional_experience: professional_experience,
    profile: profile,
    env: env,
    meta: meta,
  };
};

export default Home;
