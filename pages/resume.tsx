import Head from "next/head";
import { Inter } from "@next/font/google";
import ProfileCard from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { GetStaticProps } from "next";
import Education from "@/components/Education";
import Experience from "@/components/Experience";

const inter = Inter({ subsets: ["latin"] });

interface Props {
    data: any;
    error: any;
    seo: any;
}

const Resume = ({ data, error, seo }: Props) => {

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
                    <ProfileCard />
                    <div className="col-span-12 lg:col-span-8">
                        <Navbar />
                        <div className="lg:rounded-2xl bg-white dark:bg-[#111111]">
                            <div data-aos="fade" className="aos-init aos-animate">
                                <div className="container px-4 sm:px-5 md:px-10 lg:px-14">
                                    <div className="py-12">
                                        <h2 className="after-effect after:left-56">
                                            {data.data.attributes.title}
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6 mt-[30px]">
                                            <Education education={data.data.attributes.education} title={data.data.attributes.education_title} />
                                            <Experience experience={data.data.attributes.experience} title={data.data.attributes.experience_title} />
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

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(`${process.env.API_URL}/api/resume?populate=*`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
    });
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
        },
    };
};

export default Resume;