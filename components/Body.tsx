import React from "react";
import HTMLReactParser from "html-react-parser";

interface Props {
    body: any;
}

const Body = ({ body }: Props) => {
    return (
        <>
            <div className="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
                <h2 className="after-effect after:left-64">{body.title}</h2>
                <div className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center ">
                    <div className="col-span-12 space-y-2.5">
                        <div className="lg:mr-16">
                            {HTMLReactParser(body.body)}
                        </div>
                    </div>
                </div>
            </div>
            <section className="pb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
                <h3 className="text-[35px] dark:text-white font-medium pb-5">{'Mes compétences'}</h3>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
                    Test
                </div>
            </section>
        </>
    );
};

export default Body;
