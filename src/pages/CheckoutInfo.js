import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const CheckoutInfo = ({ addNewFormData }) => {
  const blankForm = {
    name: "",
    email: "",
    message: "",
  };

  const [newFormData, setFormData] = useState(blankForm);

  const { name, email, message } = newFormData;

  const handleNameChange = (e) => {
    setFormData({
      ...newFormData,
      name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...newFormData,
      email: e.target.value,
    });
  };

  const handleMessageChange = (e) => {
    setFormData({
      ...newFormData,
      message: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
    setFormData(blankForm);
  };

  return (
    <>
      <Navbar />
      <ContactFormStyled>
        <div className="wrapper">
          <form id="form" className="form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="NAME"
                name="name"
                value={newFormData.name}
                onChange={handleNameChange}
                required
              />
              <input
                type="email"
                id="email"
                placeholder="EMAIL"
                name="email"
                value={newFormData.email}
                onChange={handleEmailChange}
                required
              />
              <textarea
                rows="6"
                placeholder="MESSAGE"
                name="message"
                value={newFormData.message}
                onChange={handleMessageChange}
                required
              ></textarea>
              <button
                className="btn btn-primary send-button"
                id="submit"
                type="submit"
                value="SEND"
              >
                <div className="alt-send-button">
                  <span className="send-text">CONTINUE TO PAYMENT</span>
                  <BsArrowRight style={{ color: "white" }} />
                </div>
              </button>
            </div>
          </form>

          <div className="copyright-container">
            <div className="copyright">
              Tortas Mexico Studio City &copy;2022
            </div>
          </div>
        </div>
      </ContactFormStyled>
    </>
  );
};

const ContactFormStyled = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    position: relative;
    width: 100%;

    @media screen and (max-width: 1100px) {
      flex-direction: column;
      width: 100%;
      padding-bottom: 3em;
    }
  }

  .form {
    width: 50%;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    padding: 2em;
    @media screen and (max-width: 1100px) {
      width: 100%;
      padding: 0.5em;
    }
    @media screen and (max-width: 410px) {
      padding: 0.4em;
    }
  }
  .form-group {
    width: 100%;
  }

  .form-group input {
    width: 100%;
    background-color: transparent;
    color: black;
    border: 1px solid black;
    padding: 0.5em 0.5em;
    @media screen and (max-width: 760px) {
      font-size: 0.9rem;
    }
    @media screen and (max-width: 435px) {
      font-size: 0.7rem;
    }
  }

  textarea {
    width: 100%;
    max-width: 100%;
    max-height: 20vh;
    background-color: transparent;
    color: black;
    letter-spacing: 1px;
    border: 1px solid black;
    padding: 0.5em 0.5em;
    @media screen and (max-width: 760px) {
      font-size: 0.9rem;
    }

    @media screen and (max-width: 435px) {
      font-size: 0.7rem;
    }
  }
  .send-button {
    margin-top: 15px;
    width: 100%;
    overflow: hidden;
    border-radius: 0.2em;
    border: transparent;
    padding-top: 0.2em;
    background: linear-gradient(darkcyan, darkblue) padding-box;
    cursor: pointer;
  }

  .alt-send-button {
    width: 100%;
    height: 34px;
  }

  .send-text {
    display: block;
    margin-top: 6px;
    font: 700 12px "Montserrat", sans-serif;
    letter-spacing: 2px;
    color: white;
  }

  .copyright-container {
    width: 50%;
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 2em;
    @media screen and (max-width: 1100px) {
      font-size: 0.5rem;
      padding: 1em;
      width: 100%;
      align-items: center;
      span {
        max-width: 100%;
      }
    }

    @media screen and (max-width: 435px) {
      font-size: 0.3rem;
    }
  }

  .copyright {
    font: 300 14px "Montserrat", sans-serif;
    color: var(--white-color);
    letter-spacing: 1px;
    text-align: center;
    margin-top: 1.2rem;
    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  }
`;
export default CheckoutInfo;
