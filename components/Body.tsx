import React from "react";
import HTMLReactParser from "html-react-parser";

interface Props {
  body: any;
  skills: any;
  skills_title: any;
}

const Body = ({ body, skills, skills_title }: Props) => {
  return (
    <>
      <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
        <h2 className="after-effect after:left-64">{body.title}</h2>
        <div className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center ">
          <div className="col-span-12 space-y-2.5">
            <div className="lg:mr-16">{HTMLReactParser(body.body)}</div>
          </div>
        </div>
      </div>
      <section className="pb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
        <h3 className="text-[35px] dark:text-white font-medium pb-5">
          {skills_title}
        </h3>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
          {skills.map((group: any) => (
            <div className="border-2 bg-transparent flex rounded-xl gap-4 border-gray-600 p-6" key={group.id}>
                <div className="space-y-2 break-all">
                    <h4 className="text-white text-xl font-semibold">{group.title}</h4>
                    <ul className="flex gap-x-3 gap-y-3 md:gap-y-3 md:gap-x-3 flex-wrap mt-8">
                        {group.skill.map((item: any) => (
                            <li className="inline-block bg-[#1D1D1D] px-5 py-1.5 rounded-lg text-[#A6A6A6]" key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Body;
