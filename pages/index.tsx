import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import Body from "@/components/Body";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  data: any;
  error: any;
  body: any;
  school: any;
  professional_experience: any;
  profile: any;
  env: string;
  seo: any;
}

const Home = ({
  data,
  body,
  profile,
  env,
  seo,
}: Props) => {
  return (
    <>
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
      </Head>

      <main className="bg-homeBg min-h-screen bg-no-repeat bg-center bg-cover bg-fixed dark:bg-homeTwoBg-dark md:pb-16 w-full">
        <div className="container mx-auto grid grid-cols-12 md:gap-10 justify-between lg:pt-[220px]">
          <ProfileCard profile={profile} env={env} />
          <div className="col-span-12 lg:col-span-8">
            <Navbar />
            <div className="lg:rounded-2xl bg-white dark:bg-[#111111]">
              <div data-aos="fade" className="aos-init aos-animate">
                <Body body={body} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Get data from Strapi with the token from the environment variable
Home.getInitialProps = async () => {
  const query = `?populate[]=seo&populate[]=profile.avatar&populate[]=profile.resume&populate[]=body`;
  const res = await fetch(`${process.env.API_URL}/api/homepage${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const data = await res.json();
  const error = data.error || null;
  const seo = data.data.attributes.seo;
  const body = data.data.attributes.body;
  const profile = data.data.attributes.profile;
  const env = process.env.API_URL;

  return {
    data: data.data,
    error: error,
    body: body,
    profile: profile,
    env: env,
    seo: seo,
  };
};

export default Home;
