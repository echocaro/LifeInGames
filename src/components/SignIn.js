import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const navigate = useNavigate();
  const [showHidden, setShowHidden] = useState(false);
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
      <h2 className="text-xl font-semibold mb-4 text-white">
        Thanks for checking out my app!
      </h2>
      <button onClick={() => setShowHidden(!showHidden)}>
        Click here to learn more about how this application works
      </button>
      <div className={`${showHidden ? "hidden" : ""}`}>
        <p className="text-gray-700 w-64 text-center ml-5 text-white">
          {
            "When you enter your SteamID, it does not get stored in a database. It simply gets stored locally in order to show your aggregated data!"
          }
        </p>
        <p className="text-gray-700 w-64 text-center ml-5 text-white">
          We only use your Steam ID to fetch publicly available data such as
          game ownership and playtime. This data is processed to display your
          top games and gaming habits but is not stored on our servers.
        </p>
        <p className="text-gray-700 w-64 text-center ml-5 text-white">
          Note: Your profile must be public for everything to work correctly
        </p>
        <p className="text-gray-700 w-64 text-center ml-5 text-white">
          Data is temporarily stored in your device’s local storage to enhance
          your user experience while you are using the app. No personal data is
          retained after you close the session.
        </p>
      </div>
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
      {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Thanks for checking out my app!
            </h2>
            <p className="text-gray-700 w-64 text-center ml-5">
              {
                "When you enter your SteamID, it does not get stored in a database. It simply gets stored locally in order to show your aggregated data!"
              }
            </p>
            <p className="text-gray-700 w-64 text-center ml-5">
              Note: Your profile must be public for everything to work correctly
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
      )} */}
    </div>
  );
};

export default SignIn;
