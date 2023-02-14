import Head from 'next/head';
import { Inter } from '@next/font/google';
import Body from '@/components/Body';
import Container from '@/components/Container';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  data: any;
  error: any;
  body: any;
  school: any;
  professional_experience: any;
  profileData: any;
  skills: any;
  seo: any;
}

const Home = ({
  data,
  body,
  profileData,
  skills,
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

      <Container profileData={profileData}>
        <Body body={body} skills={skills} skills_title={data.data.attributes.skills_title} />
      </Container>
    </>
  );
};

// Get data from Strapi with the token from the environment variable
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/homepage?populate[]=seo&populate[]=body&populate[]=skills.languages`, {
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
  const seo = data.data.attributes.seo;
  const body = data.data.attributes.body;
  const skills = data.data.attributes.skills;

  return {
    props: {
      data,
      error,
      body,
      skills,
      seo,
      profileData,
    },
  };
};

export default Home;
