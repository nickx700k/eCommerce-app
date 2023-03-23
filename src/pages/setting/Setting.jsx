import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.scss";
import { ThemeContext } from "../theme/ThemeProvider";
import axios from "axios";

const Setting = () => {
  const [account, setAccount] = useState({});
  const [fullName, setFullName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");

  const { color, mode } = useContext(ThemeContext);
  const username = sessionStorage.getItem("username");
  useEffect(() => {
    const fetchSetting = async () => {
      fetch(`http://localhost:3001/users/${username}`)
        .then((response) => response.json())
        .then((res) => {
          setFullName(res?.fullName);
          setPhoto(res?.photo);
          setEmail(res?.email);
          setPassword(res?.password);
          setPosition(res?.position);
        });
    };

    fetchSetting();
  }, [username]);

  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      sessionStorage.clear();
      axios.put(`http://localhost:3001/users/${username}`, {
        photo: photo,
        fullName: fullName,
        email: email,
        password: password,
        position: position,
      });

      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`settings ${mode}`}>
      <div className="settings--container">
        <i
          onClick={handleExit}
          className="bx bx-exit edit--container--icon"
        ></i>
        <form
          className={`settings--container--form ${color}`}
          onSubmit={handleSubmit}
        >
          <div className="settings--container--form--parts">
            <div className="settings--container--form--parts--part1">
              <img
                src={photo}
                alt="no photo"
                className="settings--container--form--parts--part1--photo"
              />
            </div>
            <div className="settings--container--form--parts--part2">
              <div className="settings--container--form--parts--part2--div">
                <h2 className="settings--container--form--parts--part2--div--h2">
                  Full Name
                </h2>
                <input
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder={fullName}
                  className="settings--container--form--parts--part2--div--input"
                />
              </div>
              <div className="settings--container--form--parts--part2--div">
                <h2 className="settings--container--form--parts--part2--div--h2">
                  Email
                </h2>
                <input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={email}
                  className="settings--container--form--parts--part2--div--input"
                />
              </div>
              <div className="settings--container--form--parts--part2--div">
                <h2 className="settings--container--form--parts--part2--div--h2">
                  Password
                </h2>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={password}
                  className="settings--container--form--parts--part2--div--input"
                />
              </div>
              <div className="settings--container--form--parts--part2--div">
                <h2 className="settings--container--form--parts--part2--div--h2">
                  Position
                </h2>
                <select
                  onChange={(e) => setPosition(e.target.value)}
                  name="position"
                  className="settings--container--form--parts--part2--div--select"
                >
                  {position === "Admin" ? (
                    <>
                      <option value="Admin" defaultChecked>
                        Admin
                      </option>
                      <option value="User">User</option>
                    </>
                  ) : (
                    <>
                      <option value="Admin">Admin</option>
                      <option value="User" defaultChecked>
                        User
                      </option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="settings--container--form--action">
            <button className="settings--container--form--action--button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
