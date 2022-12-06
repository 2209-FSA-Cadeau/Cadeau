import React from "react";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

function TeamMember({name, location, imageSrc, liURL, ghURL}) {
  return (
    <>
      <div>
        <Image
          src={imageSrc}
          width={200}
          height={200}
          alt={name}
          className="rounded-xl shadow-md"
        />
        <h2>{name}</h2>
        <div>{location}</div>
        <div className="flex justify-start items-center py-2">
          <a
            target="_blank"
            href={liURL}
            rel="noopener noreferrer"
            className="bg-neutral-100 rounded-full shadow-xl p-4 cursor-pointer hover:scale-110 ease-in duration-200 mr-4"
          >
            <FaLinkedinIn />
          </a>
          <a
            target="_blank"
            href={ghURL}
            rel="noopener noreferrer"
            className="bg-neutral-100 rounded-full shadow-xl p-4 cursor-pointer hover:scale-110 ease-in duration-200 mr-4"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </>
  );
}

export default TeamMember;
