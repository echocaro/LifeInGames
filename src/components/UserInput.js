import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const UserInput = () => {
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
    <div className="flex flex-col w-72 mt-40 md:flex-row md:w-auto md:justify-around">
      <div className="md:flex-col md:w-1/2">
        <h2 className="font-bold text-center">
          Thanks for checking out my app!
        </h2>
        <div className="flex-row md:flex-col text-center">
          <p className="p-2">
            {
              "When you enter your SteamID, it does not get stored in a database. It simply gets stored locally in order to show your aggregated data!"
            }
          </p>
          <p className="p-2">
            We only use your Steam ID to fetch publicly available data such as
            game ownership and playtime. This data is processed to display your
            top games and gaming habits but is not stored on any server.
          </p>
          <p className="p-2">
            Data is temporarily stored in your device’s local storage to enhance
            your user experience while you are using the app. No personal data
            is retained after you close the session.
          </p>
          <p className="p-2">
            Note: Your profile must be public for everything to work correctly
          </p>
        </div>
      </div>
      <div className="flex-col">
        <h3 className="text-center font-bold text-lg">
          Please enter your SteamID
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
      </div>
    </div>
  );
};

export default UserInput;
