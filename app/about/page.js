import React from "react";
import TeamMember from "./TeamMember";

const AboutPage = () => {
  return (
    // Header
    <div className="w-full h-full">
      <div className="border-b-2 border-cblue-700 uppercase tracking-widest mb-4">
        <h1>About</h1>
      </div>
      {/* Picture */}
      <div className="w-full h-[30%] rounded-md mx-auto bg-[url('/assets/aboutPage_1.jpeg')] bg-no-repeat bg-cover bg-left pl-[8%] shadow-md">
        <div className="flex justify-start items-center w-full h-full">
          <div className="text-2xl font-semibold">
            <p className="">
              <span className="text-5xl font-extrabold tracking-wider text-cgold-500">
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
      <div className="flex justify-between w-full h-[45%] p-2">
        <div className="flex flex-col justify-start bg-white h-full w-[49.5%] rounded-md shadow-lg">
          <div className="flex flex-col justify-center uppercase tracking-widest px-4 py-2 bg-cblue-700 text-cwhite rounded-t-md shadow-md basis-[15%]">
            <h2>Manage your Recipients</h2>
          </div>
          <div className="w-full basis-[85%] mx-auto my-auto">
            <ul className="flex flex-col justify-evenly px-4 py-2 h-full text-md">
              <li>
                Use the dashboard to add friends and family to your recipient
                list
              </li>
              <div className="w-full border-b border-neutral-400"></div>
              <li>
                Enter details for each recipient and all holidays/occasions you
                wish to provide gifts for
              </li>
              <div className="w-full border-b border-neutral-400"></div>
              <li>
                Add likes and dislikes for that person which informs our robust
                recommendation algorithm
              </li>
              <div className="w-full border-b border-neutral-400"></div>
              <li>
                Save potential items to a recipient's profile and maintain a log
                of previous gifts
              </li>
              <div className="w-full border-b border-neutral-400"></div>
              <li>
                One of the keys to good gift giving is listening! The notes
                section lets you add ideas over time
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-start bg-white h-full w-[49.5%] rounded-md shadow-lg">
          <div className="flex flex-col justify-center uppercase tracking-widest px-4 py-2 bg-cblue-700 text-cwhite rounded-t-md shadow-md basis-[15%]">
            <h2>Gift Recommendations</h2>
          </div>
          <div className="w-full basis-[85%] mx-auto my-auto">
          <ul className="flex flex-col justify-evenly px-4 py-2 h-full text-md">
            <li>Utilizes item-to-item collaborative filtering recommendation system</li>
            <div className="w-full border-b border-neutral-400"></div>
            <li>Takes user preferences and converts them into computable measurements</li>
            <div className="w-full border-b border-neutral-400"></div>
            <li>Uses measurements to identify similarities between different categories to determine recommendations</li>
            <div className="w-full border-b border-neutral-400"></div>
            <li>Recommendations are easily viewable through navigation bar on the Shop page</li>
          </ul>
          </div>
        </div>
      </div>
      {/* Team Info */}
      <div className="border-b-2 border-cblue-700 uppercase tracking-widest mb-6 mt-10">
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
