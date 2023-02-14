import Head from 'next/head';
import React, { useState } from 'react';
import Container from '@/components/Container';
import * as yup from 'yup';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface Props {
  profileData: any;
}

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

export default function Contact({ profileData }: Props) {
  const [inputs, setInputs] = useState<Inputs>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [resStatus, setStatus] = useState<Status>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [sent, setSent] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const allFieldsFilled = Object.values(inputs).every(input => '' !== input);

  const handleResponse = (resStatus: number, msg: string) => {
    if (200 === resStatus) {
      setSent(true);
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
      toast.success('Message envoyé ! 👍', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      setError(true);
      setStatus((prevStatus) => ({
        ...prevStatus,
        info: { error: true, msg: msg },
      }));
      toast.error('Une erreur est survenue 😢', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
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
    try {
      await yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        subject: yup.string().required(),
        message: yup.string().required(),
      }).validate(inputs);
    } catch (err: any) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: err.errors[0] },
      });
      return;
    }
    console.log(resStatus.info.msg);
    if (setSent) {
      setSent(false);
    }
    if (error) {
      setError(false);
    }
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      <ToastContainer />
      <Container profileData={profileData}>
        <div className="container px-4 sm:px-5 md:px-10 lg:px-14">
          <div className="py-12">
            <h2 className="after-effect after:left-44 mt-12 lg:mt-0 mb-12 md:mb-[30px]">
              Contact
            </h2>
            <div className="border-[#212425] border-2 mb-8 md:p-[48px] p-4 bg-color-810 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Je peux vous aider ?</h3>
              <p className="mb-4">
                N&apos;hésitez pas à me contacter via le formulaire ci-dessous.
              </p>
              <form
                className="w-full max-w-lg mx-auto mt-12"
                onSubmit={handleSubmit}
              >
                {/* Form underlines */}
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block" htmlFor="firstName">
                      <span className="text-[#A6A6A6]">Prénom</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-[#1D1D1D] focus:ring-0 focus:border-red-500 bg-transparent"
                        id="firstName"
                        type="text"
                        placeholder="Jane"
                        value={inputs.firstName}
                        onChange={handleChange}
                      />
                    </label>
                    {'' === inputs.firstName && resStatus.info.error && (
                      <p className="text-red-500 text-xs italic">
                        Veuillez renseigner votre prénom
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block" htmlFor="lastName">
                      <span className="text-[#A6A6A6]">Nom</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-[#1D1D1D] focus:ring-0 focus:border-red-500 bg-transparent"
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={inputs.lastName}
                        onChange={handleChange}
                      />
                    </label>
                    {'' === inputs.lastName && resStatus.info.error && (
                      <p className="text-red-500 text-xs italic">
                        Veuillez renseigner votre nom
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block" htmlFor="email">
                      <span className="text-[#A6A6A6]">Email</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-[#1D1D1D] focus:ring-0 focus:border-red-500 bg-transparent"
                        id="email"
                        type="email"
                        placeholder="jane.doe@example.com"
                        value={inputs.email}
                        onChange={handleChange}
                      />
                    </label>
                    {'' === inputs.email && resStatus.info.error && (
                      <p className="text-red-500 text-xs italic">
                        Veuillez renseigner votre email
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block" htmlFor="subject">
                      <span className="text-[#A6A6A6]">Objet</span>
                      <input
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-[#1D1D1D] focus:ring-0 focus:border-red-500 bg-transparent"
                        id="subject"
                        type="text"
                        placeholder="Objet de votre message"
                        value={inputs.subject}
                        onChange={handleChange}
                      />
                    </label>
                    {'' === inputs.subject && resStatus.info.error && (
                      <p className="text-red-500 text-xs italic">
                        Veuillez renseigner l&apos;objet de votre message
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block" htmlFor="message">
                      <span className="text-[#A6A6A6]">Message</span>
                      <textarea
                        className="mt-0 block w-full px-0.5 border-0 border-b-2 border-[#1D1D1D] focus:ring-0 focus:border-red-500 bg-transparent"
                        id="message"
                        placeholder="Votre message"
                        value={inputs.message}
                        onChange={handleChange}
                        name="message"
                      />
                    </label>
                    {'' === inputs.message && resStatus.info.error && (
                      <p className="text-red-500 text-xs italic">
                        Veuillez renseigner votre message
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className={`inline-flex items-center mx-auto px-8 py-3 text-lg rounded-[35px] mt-6 ${
                        !allFieldsFilled && 'bg-[#1D1D1D] text-[#A6A6A6] cursor-not-allowed'
                      } ${allFieldsFilled && 'bg-gradient-to-r from-[#FA5252] to-[#DD2476] ease-linear hover:animate-pulse text-white'}`}
                    type="submit"
                    disabled={!allFieldsFilled}
                  >
                    Envoyer
                  </button>
                </div>
              </form>
              {/*sent && (
                <div className="flex items-center border-l-4 p-4 bg-[#1D1D1D] border-[#34D399] mt-12">
                  <div className="text-[#34D399] rounded-full mr-3 bg-[#1D1D1D]">
                    <MdCheckCircle />
                  </div>
                  <div className="text-sm text-[#34D399]">
                    <p>
                      <strong className="font-bold">Impeccable !</strong> Votre
                      message a été envoyé avec succès 👍
                    </p>
                  </div>
                </div>
              )*/}
              {/* error && (
                <div className="flex items-center border-l-4 p-4 bg-[#1D1D1D] border-[#F87171] mt-12">
                  <div className="text-[#F87171] rounded-full mr-3 bg-[#1D1D1D]">
                    <MdError />
                  </div>
                  <div className="text-sm text-[#F87171]">
                    <p>
                      <strong className="font-bold">Oups !</strong> Une erreur
                      est survenue lors de l&apos;envoi de votre message 😢
                    </p>
                  </div>
                </div>
              )*/}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export const getServersideProps = async () => {
  const profile = await fetch(`${process.env.API_URL}/api/profile?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  const profileData = await profile.json();

  return {
    props: {
      profileData,
    },
  };
};
