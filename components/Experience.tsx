import { MdWork, } from "react-icons/md";
import getYear from "../lib/getYear";

interface Props {
  experience: any;
  title: any;
}

const Experience = ({ experience, title }: Props) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-6xl text-[#F95054]">
          <MdWork className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      <div className="py-4 pl-5 pr-3 space-y-2 mb-6 rounded-lg border-[#212425] border-2">
        {experience.map((company: any) => (
          <div key={company.id}>
            <span className="text-tiny text-[#b7b7b7]">
              {getYear(company.start_date)} - {company.end_date ? getYear(company.end_date) : "Present"}
            </span>
            <h3 className="text-lg font-semibold text-white">
                {company.job}
            </h3>
            <p className="text-sm text-[#b7b7b7]">
                {company.company_name}
            </p>
            <p className="inline-block bg-[#1D1D1D] px-5 py-1.5 rounded-lg text-[#A6A6A6] mt-4">
              {company.contract}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
