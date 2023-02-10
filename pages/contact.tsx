import Head from "next/head";
import React, { useState } from "react";
import Container from "@/components/Container";
import sendEmail from "./api/contact";
import { MdCheckCircle, MdError } from "react-icons/md";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface Status {
  submitted: boolean;
  submitting: boolean;
  info: {
    error: boolean;
    msg: string | null;
  };
}

export default function Contact() {
  const [inputs, setInputs] = useState<Inputs>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [resStatus, setStatus] = useState<Status>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleResponse = (resStatus: number, msg: string) => {
    if (resStatus === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus((prevStatus) => ({
        ...prevStatus,
        info: { error: true, msg: msg },
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const text = await res.text();
    handleResponse(res.status, text);
  };
  return (
    <>
      <Head>
        <title>Nicolas Barbarisi - Contact</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="canonical"
          href="https://www.nicolas-barbarisi.com/contact"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Nicolas Barbarisi's portfolio" />
        <meta name="keywords" content="Nicolas Barbarisi, Portfolio" />
        <meta name="author" content="Nicolas Barbarisi" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container>
        <div className="container px-4 sm:px-5 md:px-10 lg:px-14">
          <div className="py-12">
            <h2 className="after-effect after:left-48 mt-12 lg:mt-0 mb-12 md:mb-[30px]">
              Contact
            </h2>
            <div className="border-[#212425] dark:border-2 mb-8 md:p-[48px] p-4 bg-color-810 rounded-xl dark:bg-[#111111]">
              <h3 className="text-2xl font-bold mb-4">Je peux vous aider ?</h3>
              <p className="mb-4">
                N'hésitez pas à me contacter via le formulaire ci-dessous.
              </p>
              <form
                className="w-full max-w-lg mx-auto mt-12"
                onSubmit={handleSubmit}
              >
                {/* Form underlines */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block" htmlFor="firstName">
                      <span className="text-gray-500">Prénom</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                        id="firstName"
                        type="text"
                        placeholder="Jane"
                        value={inputs.firstName}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block" htmlFor="lastName">
                      <span className="text-gray-500">Nom</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={inputs.lastName}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block" htmlFor="email">
                      <span className="text-gray-500">Email</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                        id="email"
                        type="email"
                        placeholder="jane.doe@example.com"
                        value={inputs.email}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block" htmlFor="subject">
                      <span className="text-gray-500">Objet</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                        id="subject"
                        type="text"
                        placeholder="Objet de votre message"
                        value={inputs.subject}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block" htmlFor="message">
                      <span className="text-gray-500">Message</span>
                      <textarea
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
                        id="message"
                        placeholder="Votre message"
                        value={inputs.message}
                        onChange={handleChange}
                        name="message"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476] to-[#fa5252ef] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
                    type="submit"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
              {!resStatus.info.error && (
                <div className="flex items-center bg-[#E3FCEF] border-l-4 border-[#34D399] p-4 dark:bg-[#1D1D1D] dark:border-[#34D399] mt-12">
                  <div className="text-[#34D399] rounded-full bg-[#E3FCEF] mr-3 dark:bg-[#1D1D1D]">
                    <MdCheckCircle />
                  </div>
                  <div className="text-sm text-[#34D399] dark:text-[#34D399]">
                    <p>
                      <strong className="font-bold">Impeccable !</strong> Votre
                      message a été envoyé avec succès 👍
                    </p>
                  </div>
                </div>
              )}
              {resStatus.info.error && (
                <div className="flex items-center bg-[#FEE2E2] border-l-4 border-[#F87171] p-4 dark:bg-[#1D1D1D] dark:border-[#F87171] mt-4">
                  <div className="text-[#F87171] rounded-full bg-[#FEE2E2] mr-3 dark:bg-[#1D1D1D]">
                    <MdError />
                  </div>
                  <div className="text-sm text-[#F87171] dark:text-[#F87171]">
                    <p>
                      <strong className="font-bold">Oups !</strong> Une erreur
                      est survenue lors de l&apos;envoi de votre message 😢
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
