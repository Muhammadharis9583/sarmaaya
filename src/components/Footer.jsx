import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#012b3f" }}
      color="light"
      className="text-center text-lg-left"
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; Sarmaaya, {new Date().getFullYear()}. All rights reserved.
      </div>
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="12" md="12" className="mb-4 mb-md-0">
            <h6 className="text-uppercase" style={{ color: "#69df07" }}>
              Disclaimer
            </h6>
            <p className="fst-italic" style={{ fontSize: 10 }}>
              Sarmaaya Financials Private Limited is a Pakistan Stock Exchange
              (PSX) authorized data redistributor. Sarmaaya & CS Solutions
              (Pvt.) Limited (CS) do not guarantee the timeliness, accurateness,
              or completeness of any data or information on the website.
              Sarmaaya & CS makes no warranties, express or implied, as to
              Sarmaaya & CS or any data or values relating thereto or results to
              be obtained therefrom, and expressly disclaims all warranties of
              merchantability and fitness for a particular purpose with respect
              thereto. To the maximum extent allowed by law, Sarmaaya & CS, its
              licensors, and their respective employees, contractors, agents,
              suppliers and vendors shall have no liability or responsibility
              whatsoever for any injury or damages – whether direct, indirect,
              consequential, incidental, punitive or otherwise – arising in
              connection with Sarmaaya & CS or any data or values relating
              thereto – whether arising from their negligence or otherwise.
              Nothing in the website shall constitute or be construed as an
              offering of financial instruments or as investment advice or
              investment recommendations (i.e., recommendations as to whether or
              not to “buy”, “sell”, “hold”, or to enter or not to enter into any
              other transaction involving any specific interest or interests) by
              Sarmaaya & CS or a recommendation as to an investment or other
              strategy by Sarmaaya & CS. Data and other information available
              via the website should not be considered as information sufficient
              upon which to base an investment decision.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer