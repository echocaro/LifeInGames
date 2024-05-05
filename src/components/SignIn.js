import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const navigate = useNavigate();
  const [steamId, setSteamId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalOpening, setModalOpening] = useState(false);

  const handleInput = (e) => {
    setSteamId(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      Cookies.set("steamdId", steamId, { expires: 1 });
      navigate("/home");
    }
  };

  const toggleModal = () => {
    setModalOpening(true); // Signal that modal is being opened
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDocumentClick = (e) => {
    if (!modalOpening && showModal && !e.target.closest(".modal-content")) {
      closeModal();
    }
    setModalOpening(false); // Reset modalOpening state after modal has opened/closed
  };

  // Add event listener when component mounts
  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [showModal, modalOpening]);

  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-white font-normal text-xl mb-3">
        Please enter your SteamID
        <FontAwesomeIcon
          icon={faQuestionCircle}
          onClick={toggleModal}
          className="cursor-pointer ml-5"
        />
      </h3>
      <input
        type="text"
        title="Enter your steamdid"
        placeholder="Example: 76561197960435530"
        value={steamId}
        onChange={handleInput}
        onKeyDown={handleEnter}
        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Thanks for checking out my app!
            </h2>
            <p className="text-gray-700 w-64 text-center ml-5">
              When you enter your SteamID, it does not get stored in a database.
              It simply gets stored locally in order to show your aggregate
              data!
            </p>
            <div className="mt-20 -mb-16 flex justify-center">
              Built by{" "}
              <a
                href={"https://www.supitscaro.com"}
                className="text-pink font-bold ml-1"
              >
                {" "}
                Caro
              </a>
            </div>
            <button
              onClick={toggleModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
