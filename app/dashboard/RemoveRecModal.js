"use client";
import React from "react";
import { AiOutlineClose, AiOutlineExclamationCircle } from "react-icons/ai";

function RemoveRecModal({ modalIsShown, setModalIsShown, recipient, removeClick }) {
  if (modalIsShown) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen z-50 bg-black/50">
        <div className="flex justify-center items-center w-full h-full ">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              onClick={() => setModalIsShown(false)}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <AiOutlineClose className="scale-110" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <div className="flex justify-center items-center p-8 text-gray-400">
                <AiOutlineExclamationCircle className="scale-[3]" />
              </div>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete {recipient.name}?
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={removeClick}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                onClick={() => setModalIsShown(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RemoveRecModal;
