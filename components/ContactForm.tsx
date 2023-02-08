import React, { useState } from "react";
import nodemailer from "nodemailer";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  object: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    object: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const transporter = nodemailer.createTransport({
        // SMTP server
        host: "smtp.example.com",
        port: 465,
        secure: true,
        auth: {
            user: "test",
            pass: "test",
        },
    });
  
      const mailOptions = {
        from: "noreply@example.com",
        to: formValues.email,
        subject: formValues.object,
        text: formValues.message,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  {
    /* Form with First Name, Last Name, Email, Object, Message, Submit with TailwindCSS form underline */
  }
    return (
  <form className="w-full max-w-lg" onSubmit={handleSubmit}>
    {/* Form underlines */}
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block" htmlFor="grid-first-name">
          <span className="text-gray-500">First Name</span>
          <input
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            onChange={handleChange}
            value={formValues.firstName}
          />
        </label>
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label className="block" htmlFor="grid-last-name">
          <span className="text-gray-500">Last Name</span>
          <input
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            onChange={handleChange}
            value={formValues.lastName}
          />
        </label>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block" htmlFor="grid-email">
          <span className="text-gray-500">Email</span>
          <input
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
            id="grid-email"
            type="email"
            placeholder="jane.doe@example.com"
            onChange={handleChange}
            value={formValues.email}
          />
        </label>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        {/* Object is a select */}
        <label className="block" htmlFor="grid-object">
          <span className="text-gray-500">Object</span>
          <select
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
            id="grid-object"
            onChange={handleChange}
            value={formValues.object}
          >
            <option disabled value="">
              Choose an object
            </option>
            <option value="Job offer">Job offer</option>
            <option value="Project">Project</option>
            <option value="Other">Other</option>
          </select>
        </label>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block" htmlFor="grid-message">
          <span className="text-gray-500">Message</span>
          <textarea
            className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-800 focus:ring-0 focus:border-red-500 bg-transparent"
            id="grid-message"
            placeholder="Hi, I'm interested in your profile"
            onChange={handleChange}
            value={formValues.message}
          />
        </label>
      </div>
    </div>
    <div className="flex justify-center">
      <button
        className="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l from-[#DD2476] to-[#fa5252ef] px-8 py-3 text-lg text-white rounded-[35px] mt-6"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
    )
};

export default ContactForm;
