import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      await fetch("http://localhost:3001/users")
        .then((response) => response.json())
        .then((res) => setUser(res));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 9000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      user.map((item) => {
        if (item?.email === data?.email) {
          sessionStorage.setItem("username", item?.id);
          sessionStorage.setItem("profile", item?.photo);
          setProfile(item?.photo);
        }
      });
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <div className="login">
      <div className="login--container">
        {loading ? (
          <div className="login--container--form">
            <div className="login--container--form--div-part1">
              {profile ? (
                <img
                  src={profile}
                  alt="no Photo"
                  className="login--container--form--div-part1--photo"
                />
              ) : (
                <i className="bx bx-user login--container--form--div-part1--icon"></i>
              )}
              <h2 className="login--container--form--div-part1--h2">
                With for Login....
              </h2>
            </div>
            <div className="login--container--form--div-part2">
              <div className="login--container--form--div-part2--loading"></div>
            </div>
          </div>
        ) : (
          <form className="login--container--form" onSubmit={handleSubmit}>
            <div className="login--container--form--div-part1">
              <i className="bx bx-user login--container--form--div-part1--icon"></i>
              <h2 className="login--container--form--div-part1--h2">
                Please Login
              </h2>
            </div>
            <div className="login--container--form--div-part2">
              <div className="login--container--form--div-part2--inputs">
                <i className="bx bx-envelope login--container--form--div-part2--inputs--icon"></i>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="input login--container--form--div-part2--inputs--input"
                />
              </div>

              <div className="login--container--form--div-part2--inputs">
                <i className="bx bx-lock-alt login--container--form--div-part2--inputs--icon"></i>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="input login--container--form--div-part2--inputs--input"
                />
              </div>
            </div>
            <button className="login--container--form--button">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
