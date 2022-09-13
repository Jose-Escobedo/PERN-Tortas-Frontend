import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

const CheckoutInfo = ({ addNewFormData }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  function onShowAlert() {
    console.log("Please fill out the required fields.");
  }

  const blankForm = {
    dropoff_contact_given_name: "",
    dropoff_contact_family_name: "",
    email: "",
    note: "",
    dropoff_phone_number: "",
    address: "",
  };

  const [newFormData, setFormData] = useState(blankForm);

  const {
    dropoff_contact_given_name,
    dropoff_contact_family_name,
    email,
    note,
    dropoff_phone_number,
    address,
  } = newFormData;

  const enabled =
    email.length > 0 &&
    dropoff_contact_family_name.length > 0 &&
    dropoff_contact_given_name.length > 0 &&
    dropoff_phone_number.length > 9 &&
    address.length > 0;

  const handleFirstNameChange = (e) => {
    setFormData({
      ...newFormData,
      dropoff_contact_given_name: e.target.value,
    });
  };
  const handleLastNameChange = (e) => {
    setFormData({
      ...newFormData,
      dropoff_contact_family_name: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...newFormData,
      email: e.target.value,
    });
  };

  const handleNoteChange = (e) => {
    setFormData({
      ...newFormData,
      note: e.target.value,
    });
  };
  const handlePhoneChange = (e) => {
    setFormData({
      ...newFormData,
      dropoff_phone_number: e.target.value,
    });
  };
  const handleAddressChange = (e) => {
    setFormData({
      ...newFormData,
      address: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(newFormData);
    setFormData(blankForm);
    redirectToCheckout();
  };

  const redirectToCheckout = (e) => {
    if (!enabled) {
      onShowAlert();
    } else {
      fetch("http://localhost:5000/api/checkout/payment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_STRIPE}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_data: {
            currency: "usd",
            unit_amount: 1000,
            product_data: {
              name: "name of the product",
            },
          },
          quantity: 1,
          total: cart.total.toFixed(2),
          cart: cart,
          contact: newFormData,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = data.url;
        });
    }
  };

  return (
    <>
      <Navbar />
      <ContactFormStyled>
        <div className="wrapper">
          <h1 className="delivery-title">Delivery Information</h1>
          <form id="form" className="form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="first-name"
                placeholder="FIRST NAME"
                name="dropoff_contact_given_name"
                value={newFormData.dropoff_contact_given_name}
                onChange={handleFirstNameChange}
                required
              />
              <input
                type="text"
                id="last-name"
                placeholder="LAST NAME"
                name="dropoff_contact_family_name"
                value={newFormData.dropoff_contact_family_name}
                onChange={handleLastNameChange}
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
              <input
                type="number"
                id="phone"
                placeholder="PHONE"
                name="phone"
                value={newFormData.phone}
                onChange={handlePhoneChange}
                required
              />
              {/* <input
                type="address"
                id="address"
                placeholder="ADDRESS"
                name="address"
                value={newFormData.address}
                onChange={handleAddressChange}
                required
              /> */}
              <Autocomplete
                ref={inputRef}
                apiKey={process.env.REACT_APP_PLACES}
                onPlaceSelected={(selected, a, c) => {
                  console.log(selected);
                }}
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "us" },
                }}
              />

              <textarea
                rows="6"
                placeholder="NOTES"
                name="note"
                value={newFormData.note}
                onChange={handleNoteChange}
              ></textarea>
              <button
                className="send-button"
                id="submit"
                type="submit"
                value="SEND"
                onClick={redirectToCheckout}
              >
                <span className="send-text">CONTINUE TO PAYMENT</span>
                <BsArrowRight style={{ color: "white" }} />
              </button>
            </div>
          </form>

          <div className="bottom-info-container">
            <div>Securely processed by Stripe</div>
            <div className="copyright">
              Tortas Mexico Studio City &copy;2022
            </div>
          </div>
        </div>
      </ContactFormStyled>
      <Footer />
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
    padding: 2em 1em;
    position: relative;
    width: 100%;

    .delivery-title {
      font: 300 2rem "Montserrat", sans-serif;
    }

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
    min-width: 100%;
    min-height: 20%;
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
    width: 102%;
    overflow: hidden;
    min-height: 34px;
    border-radius: 0.2em;
    border: transparent;
    padding-top: 0.2em;
    background: linear-gradient(darkcyan, darkblue) padding-box;
    cursor: pointer;
  }

  .alt-send-button {
  }

  .send-text {
    display: block;
    margin-top: 6px;
    font: 700 12px "Montserrat", sans-serif;
    letter-spacing: 2px;
    color: white;
  }

  .bottom-info-container {
    width: 50%;
    font: 300 14px "Montserrat", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
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
    color: black;
    letter-spacing: 1px;
    text-align: center;
    margin-top: 1.2rem;
    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  }
`;

export default CheckoutInfo;
