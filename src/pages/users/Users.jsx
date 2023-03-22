import React, { useState, useEffect } from "react";
import "./Users.scss";
import Table from "../../components/table/UsersTable";
import Pagination from "../../components/pagination/Pagination";

const Users = () => {
  const [account, setAccount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItempPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      await fetch("http://localhost:3001/users")
        .then((response) => response.json())
        .then((res) => {
          setAccount(res);
        })
        .catch(() => {
          alert("data Error");
        });
    };
    fetchUsers();
  }, []);

  const header = [
    {
      title: "photo",
    },
    {
      title: "Full Name",
    },
    {
      title: "Email",
    },
    {
      title: "Status",
    },
    {
      title: "Position",
    },
  ];

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentitems = account.slice(indexOfFirstItem, indexOfLastItem);
  const nPage = Math.ceil(account.length / itemPerPage);

  return (
    <div className="users">
      <div className="users--container">
        <div className="users--container--table">
          <Table data={currentitems} header={header} />
          <Pagination
            nPage={nPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
