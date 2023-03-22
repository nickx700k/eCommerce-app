import React, { useEffect, useState } from "react";
import "./UsersTable.scss";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Table({ data, header }) {
  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(sessionStorage.getItem("username", username));
  }, [username]);

  return (
    <div className="UserTable">
      <div className="UserTable--container">
        <MDBTable align="middle">
          <MDBTableHead className="UserTable--container--thead">
            <tr>
              {header &&
                header.map((item, index) => <th key={index}>{item?.title}</th>)}
            </tr>
          </MDBTableHead>
          <MDBTableBody className="UserTable--container--tbody">
            {data &&
              data.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item?.photo}
                        alt="no photo"
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{item?.fullName}</p>
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="text-muted mb-0">{item?.email}</p>
                    </div>
                  </td>
                  <td>
                    <MDBBadge
                      color={username === item?.id ? "success" : "danger"}
                      pill
                    >
                      {username === item?.id ? "Online" : "Offline"}
                    </MDBBadge>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{item?.position}</p>
                    </div>
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}
