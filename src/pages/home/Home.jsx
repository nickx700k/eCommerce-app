import React, { useContext, useEffect, useState } from "react";
import "./Home.scss";
import Table from "../../components/table/DataTable";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../pages/theme/ThemeProvider";

const Home = () => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItempPerPage] = useState(5);
  const { color, mode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:3001/data")
        .then((response) => response.json())
        .then((res) => {
          setData(res);

          setLoading(false);
        })
        .catch(() => {
          alert("data Error");
        });
      await fetch("http://localhost:3001/header")
        .then((response) => response.json())
        .then((res) => setHeader(res))
        .catch(() => alert("header Error"));
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentitems = data.slice(indexOfFirstItem, indexOfLastItem);
  const nPage = Math.ceil(data.length / itemPerPage);

  const navigate = useNavigate();

  return (
    <div className={`home ${mode}`}>
      <div className="home--container">
        <div className="home--container--table">
          <button
            className={`home--container--table--add ${color}`}
            onClick={() => navigate("/create")}
          >
            Add New Customer
          </button>
          <div className="home--container--table--table">
            <Table data={currentitems} header={header} />
            <Pagination
              nPage={nPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
