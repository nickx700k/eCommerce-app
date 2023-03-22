import React from "react";
import "./Pagination.scss";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Pagination({ nPage, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPage) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="Pagination">
      <MDBPagination className="Pagination--container">
        <MDBPaginationItem className="Pagination--container--item">
          <MDBPaginationLink
            className="Pagination--container--item--link"
            onClick={prevPage}
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {pageNumbers &&
          pageNumbers.map((npNumber) => (
            <MDBPaginationItem
              key={npNumber}
              className={`Pagination--container--item ${
                currentPage == npNumber ? "active" : ""
              }`}
            >
              <MDBPaginationLink
                className="Pagination--container--item--link"
                onClick={() => setCurrentPage(npNumber)}
              >
                {npNumber}
              </MDBPaginationLink>
            </MDBPaginationItem>
          ))}
        <MDBPaginationItem className="Pagination--container--item">
          <MDBPaginationLink
            className="Pagination--container--item--link"
            onClick={nextPage}
          >
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </div>
  );
}
