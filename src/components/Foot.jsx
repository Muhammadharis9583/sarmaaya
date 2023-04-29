import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function Foot() {
  return (
    <MDBFooter
      style={{ backgroundColor: "#012b3f" }}
      color="light"
      className="text-lg-left"
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; Sarmaaya, {new Date().getFullYear()}. All rights reserved.
      </div>
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-4">
              <img
                src="https://scontent.fisb1-2.fna.fbcdn.net/v/t1.6435-9/107169168_157506672535703_4313405693061431182_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=DoiaJfRlc6cAX-IWKSo&_nc_ht=scontent.fisb1-2.fna&oh=00_AfAcjULtIv5Luf7dlvwWyB6UjM9yYw7kcgxGghzNDdF6HA&oe=64719E63"
                height={30}
                width={30}
                className="me-3"
              />
              {/* <MDBIcon color="secondary" icon="gem" className="me-3" /> */}
              Sarmaaya.pk
            </h5>
            <h6 className="text-uppercase" style={{ color: "#69df07" }}>
              About Us
            </h6>

            <p style={{ fontSize: 13 }}>
              Financial literacy is your key to success and a promise of a
              secure future in turbulent times. We offer you the right education
              and resources you need to achieve your financial dreams. Sarmaaya
              is a trusted source of research and information about Forex,
              Mutual Funds, and Stocks. Our widgets, tools and calculators aid
              in identifying potential investment opportunities and valuable
              insights that can help achieve your short and long-term financial
              goals.
            </p>
            <h6 style={{ color: "#69df07" }}>Social Media Links</h6>
            <section className="mb-4">
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <MDBIcon fab icon="google" />
              </MDBBtn>
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <MDBIcon fab icon="instagram" />
              </MDBBtn>

              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>

              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <MDBIcon fab icon="github" />
              </MDBBtn>
            </section>
          </MDBCol>

          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
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

export default Foot