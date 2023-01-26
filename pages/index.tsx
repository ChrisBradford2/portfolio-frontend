import Head from "next/head";
import { Inter } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

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
        <div className="container mx-auto grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
          <ProfileCard profile={profile} env={env} />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {data.attributes.title}
          </h1>
          <p>{data.description}</p>
          <h2>{body.title}</h2>
          {body.icon && <p>{body.icon}</p>}
          <p>{body.body}</p>
          <Link
            href={`${env}${body.resume.data.attributes.url}`}
            title={body.resume.data.attributes.name || null}
          >
            {body.title_resume}
          </Link>
          <h2>{data.attributes.school_title}</h2>
          {school.map((school: any) => (
            <div key={school.id}>
              <h3>{school.school_name}</h3>
              <p>{school.start_date}</p>
              <p>{school.end_date || "Present"}</p>
              <p>{school.grade_name}</p>
              {school.comment.map((comment: any) => (
                <p key={comment.id}>{comment.comment}</p>
              ))}
            </div>
          ))}
          <h2>{data.attributes.professional_experience_title}</h2>
          {professional_experience.map((professional_experience: any) => (
            <div key={professional_experience.id}>
              <h3>{professional_experience.company_name}</h3>
              <p>{professional_experience.start_date}</p>
              <p>{professional_experience.end_date || "Present"}</p>
              <p>{professional_experience.job_title}</p>
              {professional_experience.comment}
            </div>
          ))}
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
