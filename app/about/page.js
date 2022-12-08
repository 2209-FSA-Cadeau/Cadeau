import React from "react";
import TeamMember from "./TeamMember";

const AboutPage = () => {
  return (
    // Header
    <div className="w-full h-full  text-cgold-900">
      <div className="border-b-2 border-cgold-900 uppercase tracking-widest mb-4">
        <h1>About</h1>
      </div>
      {/* Picture */}
      <div className="w-full h-[30%] rounded-md mx-auto bg-[url('/assets/aboutPage_1.jpeg')] bg-no-repeat bg-cover bg-left pl-[10%] shadow-md">
        <div className="flex justify-start items-center w-full h-full">
          <div className="text-cgold-900 text-2xl font-semibold">
            <p className="">
              <span className="text-4xl font-extrabold tracking-wide">
                cadeau
              </span>{" "}
              <span className="italic">m (plural cadeaux):</span>{" "}
            </p>
            <p className="indent-4">1. present, gift</p>
            <p className="italic indent-4">pronunciation: /ka.do/</p>
          </div>
        </div>
      </div>
      {/* Mid page headline */}
      <div className="mx-auto text-center my-6 p-8 w-[90%]">
        <h1 className="text-4xl">
          The perfect hub to manage gift-giving for the
          <span className="text-cgold-400 "> people that matter</span>
        </h1>
      </div>
      {/* Features */}
      <div className="flex justify-between w-full h-[35%] p-2">
        <div className="bg-cgold-50 h-full w-[49.5%] rounded-md shadow-lg">
          <div className="uppercase tracking-widest px-4 py-2 bg-cgold-200 rounded-t-md shadow-md">
            <h2>Manage your Recipients</h2>
          </div>
          <ul className="flex flex-col justify-around px-4 py-2 h-[80%] w-full text-md">
            <li>
              Use the dashboard to add friends and family to your recipient list
            </li>
            <div className="w-full border border-cgold-200/50"></div>
            <li>
              Enter details for each recipient and all holidays/occasions you
              wish to provide gifts for
            </li>
            <div className="w-full border border-cgold-200/50"></div>
            <li>
              Add likes and dislikes for that person which informs our robust
              recommendation algorithm
            </li>
            <div className="w-full border border-cgold-200/50"></div>
            <li>
              Save potential items to a recipient's profile and maintain a log
              of previous gifts
            </li>
            <div className="w-full border border-cgold-200/50"></div>
            <li>
              One of the keys to good gift giving is listening! The notes
              section lets you add ideas over time
            </li>
          </ul>
        </div>
        <div className="bg-cgold-50 h-full w-[49.5%] rounded-md shadow-lg">
          <div className="uppercase tracking-widest px-4 py-2 bg-cgold-200 rounded-t-md shadow-md">
            <h2>Gift Recommendations</h2>
          </div>
          <ul className="flex flex-col justify-around px-4 py-2 h-[80%] w-full text-md">
            <li>filler</li>
            <div className="w-full border border-cgold-200/50"></div>
            <li>filler</li>
          </ul>
        </div>
      </div>
      {/* Team Info */}
      <div className="border-b-2 border-cgold-900 uppercase tracking-widest mb-6 mt-10">
        <h1>Our Team</h1>
      </div>
      <div className="flex justify-evenly w-full mb-2">
      <TeamMember
          name="Peter Rifkind"
          location="New York"
          imageSrc="/assets/headshotPR.jpeg"
          liURL="https://www.linkedin.com/in/prifkind/"
          ghURL="https://github.com/prifkind"
        />
        <TeamMember
          name="Alex Sun"
          location="New York City"
          imageSrc="/assets/headshotAS.jpeg"
          liURL="https://www.linkedin.com/in/alexsun424/"
          ghURL="https://github.com/ariadosic"
        />
        <TeamMember
          name="Frank Guillen"
          location="Lakeland, FL"
          imageSrc="/assets/headshotFG.jpeg"
          liURL="https://www.linkedin.com/in/frank-guillen/"
          ghURL="https://github.com/fguillen1215"
        />
        <TeamMember
          name="Patrick McGrath"
          location="New York City"
          imageSrc="/assets/headshotPM.jpeg"
          liURL="https://www.linkedin.com/in/patrickmcgrath13/"
          ghURL="https://github.com/p-mcgrath/"
        />
      </div>
      <div className="h-[5%]"></div>
    </div>
  );
};

export default AboutPage;
