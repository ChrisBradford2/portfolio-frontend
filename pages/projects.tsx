import Head from "next/head";
import { Inter } from "@next/font/google";
import ProfileCard from "@/components/ProfileCard";
import Navbar from "@/components/Navbar";
import { GetStaticProps } from "next";
import React from "react";
import Modal from "react-modal";
import Image from "next/image";
import HTMLReactParser from "html-react-parser";
import Link from "next/link";
import {
  FaChartPie,
  FaCode,
  FaGithub,
  FaGitlab,
  FaMicrosoft,
  FaSquare,
} from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { MdOpenInNew } from "react-icons/md";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  data: any;
  error: any;
}

interface Project {
  attributes: {
    id: number;
    title: string;
    body: string;
    project_type: string;
    release_year: string;
    repo_type: string;
    repo_link: string;
    preview_link: string;
    media: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    languages: {
      data: any;
    };
  };
}

const Projects = ({ data, error }: Props) => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredData = data.data.filter(
    (project: any) =>
      project.attributes.project_type === selectedCategory ||
      selectedCategory === "All"
  );

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null
  );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>Projects</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="author" content="Nicolas Barbarisi" />
        <meta name="description" content="Nicolas Barbarisi's portfolio" />
        <meta name="keywords" content="Nicolas Barbarisi, Portfolio" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nicolasbarbarisi" />
        <meta name="twitter:creator" content="@nicolasbarbarisi" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nicolas Barbarisi's Portfolio" />
        <meta
          property="og:description"
          content="Nicolas Barbarisi's portfolio"
        />
        <meta property="og:site_name" content="Nicolas Barbarisi's Portfolio" />
        <meta property="og:url" content="https://nicolasbarbarisi.com" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:image:secure_url" content="/images/og-image.png" />
        <meta property="og:image:alt" content="Nicolas Barbarisi's Portfolio" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Container>
        <div className="container mb-8 px-4 sm:px-5 md:px-10 lg:px-[60px]">
          <div className="py-12">
            <h2 className="after-effect after:left-56">Titre</h2>
            <ul className="mt-[40px] flex w-full justify-start md:justify-end flex-wrap font-medium pb-12">
              <li
                className={`${selectedCategory === "All" ? "text-[#FA5252]" : "text-[#A6A6A6]"} mr-4 md:mx-4 cursor-pointer`}
                onClick={() => handleCategory("All")}
              >
                All
              </li>
              <li
                className={`${selectedCategory === "Company" ? "text-[#FA5252]" : "text-[#A6A6A6]"} mr-4 md:mx-4 cursor-pointer`}
                onClick={() => handleCategory("Company")}
              >
                Company
              </li>
              <li
                className={`${selectedCategory === "Personal" ? "text-[#FA5252]" : "text-[#A6A6A6]"} mr-4 md:mx-4 cursor-pointer`}
                onClick={() => handleCategory("Personal")}
              >
                Personal
              </li>
              <li
                className={`${selectedCategory === "School" ? "text-[#FA5252]" : "text-[#A6A6A6]"} mr-4 md:mx-4 cursor-pointer`}
                onClick={() => handleCategory("School")}
              >
                School
              </li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredData.map((project: any) => (
                <div key={project.id}>
                  <div className="rounded-lg p-6 dark:border-[2px] border-[#212425]">
                    <div className="overflow-hidden rounded-lg">
                    <Image
                        className="object-cover object-center w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg h-auto"
                        src={`${process.env.API_URL}${project.attributes.media.data.attributes.url}`}
                        alt="content"
                        onClick={() => openModal(project)}
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="pt-5 text-[14px] font-normal text-gray-lite block dark:text-[#A6A6A6]">
                      {project.attributes.project_type}{" "}
                      {project.attributes.project_type === "Company"
                        ? `(Client: ${project.attributes.client})`
                        : null}
                    </div>
                    <h3
                      className="font-medium cursor-pointer text-xl duration-300 transition hover:text-[#FA5252] dark:hover:text-[#FA5252] dark:text-white mt-2"
                      onClick={() => openModal(project)}
                    >
                      {project.attributes.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            background: "none",
            overflow: "visible",
            padding: 0,
          },
        }}
        contentLabel="Project Modal"
      >
        {selectedProject && (
          <div className="w-full md:w-10/12 items-center lg:w-[850px] bg-white dark:bg-[#323232] mx-auto rounded-xl p-4 md:p-8 absolute left-1/2 top-1/2 transform -translate-x-[50%] -translate-y-[50%] shadow-lg z-50 overflow-auto max-h-[90vh] no-scrollbar">
            <div className=" overflow-hidden rounded-lg">
              <h2 className="text-[#ef4060] dark:hover:text-[#FA5252] text-4xl text-center font-bold">
                {selectedProject.attributes.title}
              </h2>
              {/* Subtitle with the year with Tailwind CSS badge */}
              <div className="flex justify-center items-center">
                <span className="bg-[#ef4060] dark:hover:bg-[#FA5252] text-white text-xs font-bold rounded-full px-2 py-1">
                  {selectedProject.attributes.release_year}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 my-6">
                <div className="space-y-2">
                  <p className="dark:text-white flex items-center mt-2 lg:mt-0 text-[15px] sm:text-lg ">
                    <FaChartPie className="mr-2" />
                    Project Type:{" "}
                    <span className="text-[#ef4060] dark:hover:text-[#FA5252] font-medium ml-2">
                      {selectedProject.attributes.project_type}
                    </span>
                  </p>
                  <p className="dark:text-white flex items-center text-[15px] sm:text-lg ">
                    <FaCode className="mr-2" />
                    Language :{" "}
                    {selectedProject.attributes.languages.data.map(
                      (language: any) => (
                        <span
                          key={language.id}
                          className="text-[#ef4060] hover:text-[#FA5252] font-medium ml-2"
                        >
                          {language.attributes.name}
                          {selectedProject.attributes.languages.data.length >
                            1 &&
                            selectedProject.attributes.languages.data.indexOf(
                              language
                            ) !==
                              selectedProject.attributes.languages.data.length -
                                1 && <span>, </span>}
                        </span>
                      )
                    )}
                  </p>
                </div>
                <div className="space-y-2">
                  {selectedProject.attributes.repo_type && (
                    <>
                      <p className="dark:text-white flex items-center text-[15px] sm:text-lg ">
                        {selectedProject.attributes.repo_type === "Github" ? (
                          <FaGithub className="mr-2" />
                        ) : selectedProject.attributes.repo_type ===
                          "Gitlab" ? (
                          <FaGitlab className="mr-2" />
                        ) : (
                          <VscAzure className="mr-2" />
                        )}
                        {selectedProject.attributes.repo_type}
                        {" :"}
                        <Link
                          href={selectedProject.attributes.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Lien vers le répo ${selectedProject.attributes.repo_type}`}
                          className="text-[#ef4060] dark:hover:text-[#FA5252] font-medium ml-2"
                        >
                          {`Lien vers le répo ${selectedProject.attributes.repo_type}`}
                        </Link>
                      </p>
                    </>
                  )}
                  {selectedProject.attributes.preview_link && (
                    <p className="dark:text-white flex items-center text-[15px] sm:text-lg ">
                      <MdOpenInNew className="mr-2" />
                      Preview{" : "}
                      <Link
                        href={selectedProject.attributes.preview_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Lien vers la preview`}
                        className="text-[#ef4060] dark:hover:text-[#FA5252] font-medium ml-2"
                      >
                        {selectedProject.attributes.preview_link}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
              <div className="dark:text-white text-2line font-normal text-[15px] sm:text-sm ">
                {HTMLReactParser(selectedProject.attributes.body)}
              </div>
              <Image
                src={`${process.env.API_URL}${selectedProject.attributes.media.data.attributes.url}`}
                alt="content"
                width={620}
                height={420}
                className="w-full md:h-[450px] h-auto object-cover rounded-xl mt-6"
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/projects?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const data = await res.json();
  const error = data.error || null;

  return {
    props: {
      data,
      error,
    },
  };
};

export default Projects;
