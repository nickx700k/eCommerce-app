import React, { useContext, useState } from "react";
import "./DataTable.scss";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../pages/theme/ThemeProvider";

export default function Table({ data, header }) {
  const { color } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleEdit = (e) => {
    const id = e.currentTarget.id;

    navigate(`/edit/${id}`);
  };

  return (
    <div className="Table">
      <div className="Table--container">
        <MDBTable align="middle">
          <MDBTableHead className={`Table--container--thead ${color}`}>
            <tr>
              {header &&
                header.map((item, index) => <th key={index}>{item?.title}</th>)}
            </tr>
          </MDBTableHead>
          <MDBTableBody className="Table--container--tbody">
            {data &&
              data.map((item) => (
                <tr key={item?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item?.profile}
                        alt="no photo"
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item?.name}</p>
                        <p className="text-muted mb-0">{item?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item?.title.map((item, index) => (
                      <p key={index} className="fw-normal mb-1">
                        {item}
                      </p>
                    ))}
                  </td>
                  <td>
                    <MDBBadge
                      color={
                        item?.status === "Active"
                          ? "success"
                          : item?.status === "Onboarding"
                          ? "primary"
                          : "warning"
                      }
                      pill
                    >
                      {item?.status}
                    </MDBBadge>
                  </td>

                  <td>{item?.position}</td>
                  <td>
                    <MDBBtn
                      id={item?.id}
                      onClick={handleEdit}
                      color="link"
                      rounded
                      size="sm"
                    >
                      Edit
                    </MDBBtn>
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}
