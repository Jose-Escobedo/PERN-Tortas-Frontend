import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Accessibility = () => {
  return (
    <>
      <Navbar />
      <AccessibilityContainer>
        <AccessibilityText>
          <h3>Accessibility Statement</h3> <br />
          <br /> We are committed to ensuring digital accessibility for people
          with disabilities. We are
          <br /> continually improving the user experience for everyone, and
          applying the relevant
          <br /> accessibility standards.
          <br />
          <br /> <h3>Conformance status</h3>
          <br />
          <br /> The{" "}
          <a href="https://www.w3.org/WAI/standards-guidelines/wcag/">
            Web Content Accessibility Guidelines (WCAG)
          </a>{" "}
          defines requirements for designers
          <br /> and developers to improve accessibility for people with
          disabilities. It defines three levels
          <br /> of conformance: Level A, Level AA, and Level AAA. <br />
          <br /> We comform to these standards to the best of our ability, and
          promise to fix any issue our
          <br /> customer may encounter. <br /> <br /> A live support email will
          be active during restaurant operating hours to accept feedback <br />
          and assist with website usage if you encounter any accessibility
          barriers.
          <br /> <br />
          <h3>Feedback</h3> <br />
          <br /> We welcome your feedback on the accessibility of Tortas Mexico
          Studio City Website <br></br> Please let us know if you encounter
          accessibility barriers.
          <br /> <br /> E-mail:{" "}
          <a href="mailto:support@tortasmexico-studiocity.com">
            support@tortasmexico-studiocity.com
          </a>
        </AccessibilityText>
      </AccessibilityContainer>
      <Footer />
    </>
  );
};

export const AccessibilityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 11vh;
  width: 100%;
  background: white;
`;

const AccessibilityText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
  padding: 20px;
  a {
    color: red;
  }
`;

export default Accessibility;
