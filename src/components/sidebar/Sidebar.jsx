import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../pages/theme/ThemeProvider";

const Sidebar = () => {
  const { color } = useContext(ThemeContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProfile(sessionStorage.getItem("profile", profile));
  }, [profile]);

  const handleLogOut = () => {
    try {
      sessionStorage.clear();
    } catch (err) {
      alert(err);
    }
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar--container">
        <div className={`sidebar--container--profile ${color}`}>
          <img
            src={profile}
            alt="no photo"
            className="sidebar--container--profile--image"
          />
        </div>
        <div className="sidebar--container--allPart">
          <div className="sidebar--container--allPart--part">
            <div className="sidebar--container--allPart--part--div">
              <Link
                to={"/"}
                style={{}}
                className="sidebar--container--allPart--part--div--a"
              >
                <h3 className="sidebar--container--allPart--part--div--a--h3">
                  Home
                </h3>
                <i className="bx bx-home sidebar--container--allPart--part--div--a--icon"></i>
              </Link>
            </div>
            <div className="sidebar--container--allPart--part--div">
              <Link
                to={"/users"}
                className="sidebar--container--allPart--part--div--a"
              >
                <h3 className="sidebar--container--allPart--part--div--a--h3">
                  Users
                </h3>
                <i className="bx bx-user-circle sidebar--container--allPart--part--div--a--icon"></i>
              </Link>
            </div>
          </div>
          <div className="sidebar--container--allPart--part">
            <div className="sidebar--container--allPart--part--div">
              <Link
                to={"/aboutus"}
                className="sidebar--container--allPart--part--div--a"
              >
                <h3 className="sidebar--container--allPart--part--div--a--h3">
                  About Us
                </h3>
                <i className="bx bx-question-mark sidebar--container--allPart--part--div--a--icon"></i>
              </Link>
            </div>
            <div className="sidebar--container--allPart--part--div">
              <Link
                to={"/settings"}
                className="sidebar--container--allPart--part--div--a"
              >
                <h3 className="sidebar--container--allPart--part--div--a--h3">
                  Settings
                </h3>
                <i className="bx bx-cog sidebar--container--allPart--part--div--a--icon"></i>
              </Link>
            </div>
            <div
              className="sidebar--container--allPart--part--div--div"
              onClick={handleLogOut}
            >
              <h3 className="sidebar--container--allPart--part--div--div--h3">
                Log Out
              </h3>
              <i className="bx bx-log-out sidebar--container--allPart--part--div--div--icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
