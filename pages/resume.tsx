import Head from 'next/head';
import { Inter } from '@next/font/google';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Container from '@/components/Container';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  data: any;
  error: any;
  seo: any;
  profileData: any;
}

const Resume = ({ data, seo, profileData }: Props) => {
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

      <Container profileData={profileData}>
        <div className="container px-4 sm:px-5 md:px-10 lg:px-14">
          <div className="py-12">
            <h2 className="after-effect after:left-44">
              {data.data.attributes.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6 mt-[30px]">
              <Education
                education={data.data.attributes.education}
                title={data.data.attributes.education_title}
              />
              <Experience
                experience={data.data.attributes.experience}
                title={data.data.attributes.experience_title}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/resume?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const profile = await fetch(`${process.env.API_URL}/api/profile?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const profileData = await profile.json();
  const data = await res.json();
  const error = data.error || null;
  const education = data.data.attributes.education;
  const experience = data.data.attributes.experience;
  const seo = data.data.attributes.seo;

  return {
    props: {
      data,
      error,
      education,
      experience,
      seo,
      profileData,
    },
  };
};

export default Resume;
