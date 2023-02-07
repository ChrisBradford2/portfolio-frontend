import Head from "next/head";
import { Inter } from "@next/font/google";
import ProfileCard from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { GetStaticProps } from "next";

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
                    <ProfileCard profile={data.data.attributes.profile} />
                    <div className="col-span-12 lg:col-span-8">
                        <Navbar />
                        <div className="lg:rounded-2xl bg-white dark:bg-[#111111]">
                            <div data-aos="fade" className="aos-init aos-animate">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                                        Resume
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Coming soon...
                                    </p>
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
    const seo = data.data.attributes.seo;

    return {
        props: {
            data,
            error,
            seo,
        },
    };
};

export default Resume;