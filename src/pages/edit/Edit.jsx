import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.scss";
import axios from "axios";
import { ThemeContext } from "../theme/ThemeProvider";

const Edit = () => {
  const { color, mode } = useContext(ThemeContext);
  const [oneUser, setOneUser] = useState(null);
  const [title, setTitle] = useState("");
  const [addTitle, setAddTitle] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3001/data")
        .then((response) => response.json())
        .then((res) =>
          res.map((item) => {
            if (item?.id === id) {
              setOneUser(item);
              setAddTitle(item?.title);
            }
          })
        );
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setOneUser({
      ...oneUser,
      [e.target.name]: value,
      title: addTitle,
    });
  };

  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  const handleDelTitle = () => {
    setAddTitle(addTitle.slice(0, -1));
  };

  const handleAddTitle = () => {
    setAddTitle((prev) => [...prev, title]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // setTemp(data.data);
      axios.put(`http://localhost:3001/data/${id}`, {
        profile: oneUser?.profile,
        name: oneUser?.name,
        email: oneUser?.email,
        title: oneUser?.title,
        status: oneUser?.status,
        position: oneUser?.position,
      });
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`edit ${mode}`}>
      <div className="edit--container">
        <i
          onClick={handleExit}
          className="bx bx-exit edit--container--icon"
        ></i>
        <div className="page-title">Edit</div>
        <form
          className={`edit--container--form ${color}`}
          onSubmit={handleSubmit}
        >
          <div className="edit--container--form--allPart ">
            <div className="edit--container--form--allPart--part1">
              <img
                src={oneUser?.profile}
                alt="no photo"
                className="edit--container--form--allPart--part1--photo"
              />
            </div>
            <div className="edit--container--form--allPart--part2">
              <div className="edit--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="edit--container--form--allPart--part2--div--label"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder={oneUser?.name}
                  className="edit--container--form--allPart--part2--div--input"
                />
              </div>
              <div className="edit--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="edit--container--form--allPart--part2--div--label"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder={oneUser?.email}
                  className="edit--container--form--allPart--part2--div--input"
                />
              </div>
              <div className="edit--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="edit--container--form--allPart--part2--div--label"
                >
                  Title
                </label>
                <select
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="edit--container--form--allPart--part2--div--select"
                >
                  <option value="" defaultChecked>
                    Choise title
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="IT department">IT department</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Finance">Finance</option>
                  <option value="Designer">Designer</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
                <i
                  style={{ color: `${color}` }}
                  onClick={handleAddTitle}
                  className="bx bx-plus edit--container--form--allPart--part2--div--icon"
                ></i>
              </div>
              <div className="edit--container--form--allPart--part2--div2">
                <div className="edit--container--form--allPart--part2--div2--span">
                  {addTitle.map((item, index) => (
                    <span key={index}>{item}, </span>
                  ))}
                </div>

                <i
                  onClick={handleDelTitle}
                  className="bx bx-message-square-minus edit--container--form--allPart--part2--div2--icon"
                ></i>
              </div>

              <div className="edit--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="edit--container--form--allPart--part2--div--label"
                >
                  Status
                </label>

                {oneUser?.status.includes("Active") ? (
                  <>
                    <select
                      onChange={handleChange}
                      name="status"
                      className="edit--container--form--allPart--part2--div--select"
                    >
                      <option value="Active" defaultChecked>
                        Active
                      </option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Awaiting">Awaiting</option>
                    </select>
                  </>
                ) : oneUser?.status.includes("Onboarding") ? (
                  <>
                    <select
                      onChange={handleChange}
                      name="status"
                      className="edit--container--form--allPart--part2--div--select"
                    >
                      <option value="Onboarding" defaultChecked>
                        Onboarding
                      </option>
                      <option value="Active">Active</option>
                      <option value="Awaiting">Awaiting</option>
                    </select>
                  </>
                ) : oneUser?.status.includes("Awaiting") ? (
                  <>
                    <select
                      onChange={handleChange}
                      name="status"
                      className="edit--container--form--allPart--part2--div--select"
                    >
                      <option value="Awaiting" defaultChecked>
                        Awaiting
                      </option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Active">Active</option>
                    </select>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="edit--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="edit--container--form--allPart--part2--div--label"
                >
                  Position
                </label>

                {oneUser?.position === "Senior" ? (
                  <>
                    <select
                      onChange={handleChange}
                      name="position"
                      className="edit--container--form--allPart--part2--div--select"
                    >
                      <option value="Senior" defaultChecked>
                        Senior
                      </option>
                      <option value="Junior">Junior</option>
                    </select>
                  </>
                ) : (
                  <>
                    <select
                      onChange={handleChange}
                      name="position"
                      className="edit--container--form--allPart--part2--div--select"
                    >
                      <option value="Junior" defaultChecked>
                        Junior
                      </option>
                      <option value="Senior">Senior</option>
                    </select>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            style={{ color: color }}
            className="edit--container--form--button"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
