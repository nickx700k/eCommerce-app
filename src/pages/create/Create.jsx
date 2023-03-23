import React, { useContext, useState } from "react";
import "./Create.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeProvider";

const Create = () => {
  const { color, mode } = useContext(ThemeContext);
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(null);
  const [title, setTitle] = useState("");
  const [addTitle, setAddTitle] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
      profile: "https://up.20script.ir/file/edb5-nickx700k.jpg",
      title: addTitle,
    });
  };

  const handleAddTitle = () => {
    setAddTitle((prev) => [...prev, title]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...data });

    try {
      // setTemp(data.data);
      axios.post("http://localhost:3001/data", {
        profile: data?.profile,
        name: data?.name,
        email: data?.email,
        title: data?.title,
        status: data?.status,
        position: data?.position,
      });
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={`create ${mode}`}>
      <div className="create--container">
        <i
          onClick={() => navigate("/")}
          class="bx bx-exit create--container--exit"
        ></i>
        <div className="page-title2">Create Customer</div>
        <form className="create--container--form" onSubmit={handleSubmit}>
          <div className={`create--container--form--allPart ${color}`}>
            <div className="create--container--form--allPart--part">
              <img
                src="https://up.20script.ir/file/edb5-nickx700k.jpg"
                alt="no photo"
                className="create--container--form--allPart--part--photo"
              />
            </div>
            <div className="create--container--form--allPart--part2">
              <div className="create--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="create--container--form--allPart--part2--div--label"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="create--container--form--allPart--part2--div--input"
                />
              </div>
              <div className="create--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="create--container--form--allPart--part2--div--label"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="create--container--form--allPart--part2--div--input"
                />
              </div>
              <div className="create--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="create--container--form--allPart--part2--div--label"
                >
                  Title
                </label>
                <select
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  className="create--container--form--allPart--part2--div--select"
                >
                  <option value="" defaultChecked>
                    Choise a title
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="IT department">IT department</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Finance">Finanse</option>
                  <option value="Designer">Designer</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
                <i
                  onClick={handleAddTitle}
                  className="bx bx-alarm-add create--container--form--allPart--part2--div--icon"
                ></i>
              </div>
              <div className="create--container--form--allPart--part2--div2">
                {addTitle ? (
                  addTitle.map((item, index) => (
                    <span
                      key={index}
                      className="create--container--form--allPart--part2--span"
                    >
                      {item},{" "}
                    </span>
                  ))
                ) : (
                  <span className="create--container--form--allPart--part2--span">
                    no title
                  </span>
                )}
              </div>

              <div className="create--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="create--container--form--allPart--part2--div--label"
                >
                  Status
                </label>
                <select
                  onChange={handleChange}
                  name="status"
                  className="create--container--form--allPart--part2--div--select"
                >
                  <option
                    defaultChecked
                    className="create--container--form--allPart--part2--div--option"
                    value=""
                  >
                    Choise Status
                  </option>
                  <option
                    className="create--container--form--allPart--part2--div--option"
                    value="Active"
                  >
                    Active
                  </option>
                  <option
                    className="create--container--form--allPart--part2--div--option"
                    value="Onboarding"
                  >
                    Onboarding
                  </option>
                  <option
                    className="create--container--form--allPart--part2--div--option"
                    value="Awaiting"
                  >
                    Awaiting
                  </option>
                </select>
              </div>
              <div className="create--container--form--allPart--part2--div">
                <label
                  htmlFor="label"
                  className="create--container--form--allPart--part2--div--label"
                >
                  Position
                </label>
                <select
                  onChange={handleChange}
                  name="position"
                  className="create--container--form--allPart--part2--div--select"
                >
                  <option value="" defaultChecked>
                    Choise a position
                  </option>
                  <option value="Senior">Senior</option>
                  <option value="Junior">Junior</option>
                </select>
              </div>
            </div>
          </div>
          <button className={`create--container--form--button ${color}`}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
