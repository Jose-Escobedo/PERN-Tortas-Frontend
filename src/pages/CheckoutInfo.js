import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTip, clearCart, setTotal } from "../redux/cartRedux";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ClosedStore from "./ClosedStore";

const CheckoutInfo = ({ addNewFormData }) => {
  const currentDate = moment().toISOString();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const [tipTotal, setTipTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(cart.total);
  const [address, setAddress] = useState("");
  const [directionsMatrixAddress, setDirectionsMatrixAddress] = useState([
    34.140511, -118.371468,
  ]);
  const [fiveMileRadius, setFiveMileRadius] = useState();
  const [routeDistance, setRouteDistance] = useState();
  const [emptyTip, setEmptyTip] = useState();
  const [stripeIdentifier, setStripeIdentifier] = useState();
  const [openStore, setOpenStore] = useState();
  const [isPlaceChange, setIsPlaceChange] = useState(false);
  const [isPlaceText, setIsPlaceText] = useState(false);

  const mapApiJs = "https://maps.googleapis.com/maps/api/js";
  const apiKey = process.env.REACT_APP_PLACES;

  const d = new Date();
  const n = d.getDay();
  const now = d.getHours() + "." + d.getMinutes();
  const weekdays = [
    ["Sunday", 10.3, 20.3],
    ["Monday", 9.3, 20.3],
    ["Tuesday", 9.3, 20.3],
    ["Wednesday", 9.3, 20.3],
    ["Thursday", 9.3, 20.3],
    ["Friday", 9.3, 20.3],
    ["Saturday", 9.3, 20.3], // we are closed, sorry!
  ];
  const day = weekdays[n];

  function checkForEmptyTip() {
    if (newFormData.tip === "") {
      setEmptyTip(true);
    } else {
      setEmptyTip(false);
    }
  }

  const handleRouteDistance = (response, status) => {
    if (status == "OK") {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
          console.log("Distance:", distance);
          console.log("Address:", destinations);
          setRouteDistance(distance);
        }
      }
    } else console.log("ERROR", response);
  };

  console.log("cart", cart.products);

  useEffect(() => {
    initMapScript().then(() => {
      initAutocomplete();
    });
    setFormData({
      ...newFormData,
      dropoff_location: address,
    });
  }, [address]);

  useEffect(() => {
    if (now > day[1] && now < day[2]) {
      console.log("We're open right now!");
      console.log(now);
      console.log(new Date());
      setOpenStore(true);
    } else {
      console.log("Sorry, we're closed!");
      console.log(now);
      console.log(new Date());
      setOpenStore(false);
    }
  }, []);

  useEffect(() => {
    if (routeDistance?.includes("ft")) {
      setFiveMileRadius(false);
    } else if (Number(routeDistance?.replace(/[^0-9\.]+/g, "")) > 5.0) {
      setFiveMileRadius(true);
    } else {
      setFiveMileRadius(false);
    }
  }, [routeDistance]);

  const handleTip = (tip) => {
    dispatch(addTip(tip));
  };

  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  function loadAsyncScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src,
      });
      script.addEventListener("load", () => resolve(script));
      document.head.appendChild(script);
    });
  }

  // const initDirectionsMatrix = () => {
  //   const google = window.google;
  //   var origin1 = new google.maps.LatLng(34.140511, -118.371468);
  //   var destinationB = new google.maps.LatLng(
  //     directionsMatrixAddress[0],
  //     directionsMatrixAddress[1]
  //   );
  //   var service = new google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //     {
  //       origins: [origin1],
  //       destinations: [destinationB],
  //       travelMode: "DRIVING",
  //       unitSystem: google.maps.UnitSystem.IMPERIAL,
  //     },
  //     handleRouteDistance
  //   );
  // };

  const initAutocomplete = () => {
    //handle initdirectionsmatrix logic

    const google = window.google;
    var origin1 = new google.maps.LatLng(34.140511, -118.371468);
    var destinationB = new google.maps.LatLng(
      directionsMatrixAddress[0],
      directionsMatrixAddress[1]
    );
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationB],
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      handleRouteDistance
    );

    //handleautocomplete logic

    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );

    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", (e) => {
      var place = autocomplete.getPlace();
      setIsPlaceChange(true);

      handleDirectionsMatrix(autocomplete);
      console.log("Latitude", place.geometry.location.lat());
      console.log("Longitude", place.geometry.location.lng());
      console.log(place);
      handleAddressChange(autocomplete);
    });
  };

  const searchInput = useRef(null);

  const isGreaterThanTwenty = cart.subtotal > 11.96;

  const blankForm = {
    dropoff_contact_given_name: "",
    dropoff_contact_family_name: "",
    email: "",
    dropoff_phone_number: "",
    dropoff_instructions: "",
    dropoff_location: "",
    tip: "",
  };

  const [newFormData, setFormData] = useState(blankForm);

  const {
    dropoff_contact_given_name,
    dropoff_contact_family_name,
    email,
    dropoff_phone_number,
    dropoff_instructions,
    tip,
    dropoff_location,
  } = newFormData;

  useEffect(() => {
    checkForEmptyTip();
  }, [newFormData.tip]);

  //Handle validation for form input
  const enabled =
    isPlaceChange &&
    email.length > 0 &&
    dropoff_contact_family_name.length > 0 &&
    dropoff_contact_given_name.length > 0 &&
    dropoff_phone_number.length > 9 &&
    dropoff_location.length > 0;

  const handleFirstNameChange = (e) => {
    setFormData({
      ...newFormData,
      dropoff_contact_given_name: e.target.value,
    });
    console.log(
      "Dropoff_contact_given_name",
      newFormData.dropoff_contact_given_name
    );
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

  const handleInstructionsChange = (e) => {
    setFormData({
      ...newFormData,
      dropoff_instructions: e.target.value,
    });
  };

  const extractAddress = (place) => {
    const address = {
      street_number: "",
      route: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    };

    if (!Array.isArray(place?.address_components)) {
      return address;
    }

    place.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      if (types.includes("street_number")) {
        address.street_number = value;
      }

      if (types.includes("route")) {
        address.route = value;
      }

      if (types.includes("neighborhood")) {
        address.city = value;
      }

      if (types.includes("administrative_area_level_1")) {
        address.state = value;
      }

      if (types.includes("postal_code")) {
        address.zip = value;
      }

      if (types.includes("country")) {
        address.country = value;
      }
    });

    return address;
  };

  function handleKeyDown() {
    console.log("Please use Google Maps AutoComplete.");
    setIsPlaceChange(false);
  }

  const handleAddressChange = (e) => {
    const place = e.getPlace();
    // console.log(extractAddress(place));
    // console.log(
    //   String(Object.values(extractAddress(place))).replace(/,/g, " ")
    // );
    setAddress(String(Object.values(extractAddress(place))).replace(/,/g, " "));
  };

  const handleDirectionsMatrix = (e) => {
    const place = e.getPlace();
    setDirectionsMatrixAddress([
      place.geometry.location.lat(),
      place.geometry.location.lng(),
    ]);
  };

  function handleTipChange(e) {
    e.preventDefault();
    setFormData({
      ...newFormData,
      tip: e.target.value,
    });
    const sum = Number(e.target.value) + cart.total;
    setCartTotal(sum);
    handleTip(Number(e.target.value));
  }

  const handleOrderCreationWithUser = (e) => {
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cart.products,
        dropoff_contact_given_name: newFormData.dropoff_contact_given_name,
        dropoff_contact_family_name: newFormData.dropoff_contact_family_name,
        phone: newFormData.dropoff_phone_number,
        email: newFormData.email,
        userId: user._id,
        address: address,
        tip: newFormData.tip,
        dropoff_instructions: newFormData.dropoff_instructions,
        taxes: cart.taxes,
        pickup: false,
        totalWithTip: cartTotal.toFixed(2),
        subtotal: cart.subtotal,
        total: cartTotal.toFixed(2),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleStripePaymentWithUser(data._id);
      });
  };

  const handleOrderCreationNoUser = (e) => {
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cart.products,
        dropoff_contact_given_name: newFormData.dropoff_contact_given_name,
        dropoff_contact_family_name: newFormData.dropoff_contact_family_name,
        phone: newFormData.dropoff_phone_number,
        email: newFormData.email,
        userId: newFormData.email,
        address: address,
        tip: newFormData.tip,
        dropoff_instructions: newFormData.dropoff_instructions,
        taxes: cart.taxes,
        pickup: false,
        totalWithTip: cartTotal.toFixed(2),
        subtotal: cart.subtotal,
        total: cartTotal.toFixed(2),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleStripePaymentNoUser(data._id);
      });
  };

  const handleStripePaymentWithUser = (id) => {
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
        idForStripe: id,
        userId: user._id,
        total: cartTotal.toFixed(2),
        cart: cart,
        contact: newFormData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

  const handleStripePaymentNoUser = (id) => {
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
        idForStripe: id,
        userId: newFormData.email,
        total: cartTotal.toFixed(2),
        cart: cart,
        contact: newFormData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = data.url;
      });
  };

  function tipValidation(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (evt.type === "paste") {
      key = evt.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  function numberValidation(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (evt.type === "paste") {
      key = evt.clipboardData.getData("text/plain");
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setTotal(cartTotal));
    console.log(newFormData);
    redirectToCheckout();
  };

  const redirectToCheckout = (e) => {
    if (!enabled) {
      console.log("!enabled:", newFormData);
      setIsPlaceText(true);
    } else if (fiveMileRadius) {
      console.log("FiveMileRadius", fiveMileRadius);
    } else {
      if (user) {
        handleOrderCreationWithUser();
      } else {
        handleOrderCreationNoUser();
      }
    }
  };

  return (
    <>
      {openStore ? (
        <>
          <Navbar />
          {isGreaterThanTwenty ? (
            <ContactFormStyled>
              <div className="wrapper">
                <h1 className="delivery-title">Delivery Information</h1>
                {isPlaceText ? (
                  <h1 style={{ color: "red" }}>
                    Please check if address is correct.
                  </h1>
                ) : null}
                {fiveMileRadius ? (
                  <DistanceImageWrapper>
                    <h1 style={{ color: "red" }} className="check-radius">
                      Delivery distance too far.
                    </h1>
                    <img src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/astro-far.png?alt=media&token=88d09c17-b7ae-42ee-a0a1-886a22c381b7"></img>
                  </DistanceImageWrapper>
                ) : null}
                <form id="form" className="form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      id="first-name"
                      placeholder="FIRST NAME"
                      name="dropoff_contact_given_name"
                      value={newFormData.dropoff_contact_given_name}
                      onChange={handleFirstNameChange}
                      maxlength="100"
                      required
                    />
                    <input
                      type="text"
                      id="last-name"
                      placeholder="LAST NAME"
                      name="dropoff_contact_family_name"
                      value={newFormData.dropoff_contact_family_name}
                      onChange={handleLastNameChange}
                      maxlength="100"
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
                      type="text"
                      id="phone"
                      placeholder="PHONE"
                      name="dropoff_phone_number"
                      value={newFormData.dropoff_phone_number}
                      onChange={handlePhoneChange}
                      onKeyPress={numberValidation}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      maxlength="20"
                      required
                    />

                    <input
                      type="text"
                      id="address"
                      ref={searchInput}
                      onKeyDown={(e) => handleKeyDown(e)}
                      placeholder="DELIVERY ADDRESS"
                      name="dropoff_location"
                      required
                    />

                    <input
                      type="text"
                      id="tip"
                      placeholder="TIP FOR DRIVER"
                      name="tip"
                      value={newFormData.tip}
                      onKeyPress={tipValidation}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      maxlength="3"
                      onChange={handleTipChange}
                    />

                    <textarea
                      rows="6"
                      type="text"
                      placeholder="DELIVERY INSTRUCTIONS FOR DRIVER"
                      name="dropoff_instructions"
                      id="dropoff_instructions"
                      value={newFormData.dropoff_instructions}
                      onChange={handleInstructionsChange}
                      maxlength="500"
                    ></textarea>

                    <Summary>
                      <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                      <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>
                          $ {cart.subtotal.toFixed(2)}
                        </SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                        <SummaryItemText>Delivery Fee</SummaryItemText>
                        <SummaryItemPrice>$4.99</SummaryItemPrice>
                      </SummaryItem>
                      {emptyTip ? (
                        <SummaryItem>
                          <SummaryItemText>Tip</SummaryItemText>
                          <SummaryItemPrice>$ 0</SummaryItemPrice>
                        </SummaryItem>
                      ) : (
                        <SummaryItem>
                          <SummaryItemText>Tip</SummaryItemText>
                          <SummaryItemPrice>
                            $ {newFormData.tip}
                          </SummaryItemPrice>
                        </SummaryItem>
                      )}
                      <SummaryItem>
                        <SummaryItemText>Taxes</SummaryItemText>
                        <SummaryItemPrice>
                          $ {cart.taxes.toFixed(2)}
                        </SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>
                          $ {cartTotal.toFixed(2)}
                        </SummaryItemPrice>
                      </SummaryItem>
                    </Summary>

                    <button
                      className="send-button"
                      id="submit"
                      type="submit"
                      value="SEND"
                    >
                      <span className="send-text">CONTINUE TO PAYMENT</span>
                      <BsArrowRight style={{ color: "white" }} />
                    </button>
                  </div>
                </form>

                <div className="bottom-info-container">
                  <div>Securely processed by Stripe</div>
                  <div className="copyright">
                    Tortas Mexico Studio City &copy;2023
                  </div>
                </div>
              </div>
            </ContactFormStyled>
          ) : (
            <MinimumText>
              Delivery subtotal minimum of $11.97 not met. Please add more items
              to cart.
            </MinimumText>
          )}

          <Footer />
        </>
      ) : (
        <ClosedStore />
      )}
    </>
  );
};

const ContactFormStyled = styled.div`
  margin-top: 70px;
  min-height: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: black;
  background: rgba(255, 255, 255, 1) 100%;
  @media screen and (max-width: 1100px) {
    padding: 2em;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3em 1em;
    position: relative;
    width: 100%;

    .delivery-title {
      padding-bottom: 20px;

      @media screen and (max-width: 535px) {
        font-size: 1.5rem;
        padding-bottom: 10px;
        padding-top: 10px;
      }
    }

    @media screen and (max-width: 1100px) {
      width: 100%;
      padding: 0;
      min-height: 100vh;
    }
  }

  .form {
    width: 50%;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    padding: 2em;
    border-color: black;
    color: black;
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

  #first-name {
    color: black;
    border-color: black;
    border-radius: 10px;
    margin-bottom: 10px;

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }
    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  #last-name {
    color: black;
    border-color: black;
    border-radius: 10px;
    margin-bottom: 10px;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: black;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  #email {
    color: black;
    border-color: black;
    border-radius: 10px;
    margin-bottom: 10px;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: black;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  #phone {
    color: black;
    border-color: black;
    border-radius: 10px;
    margin-bottom: 10px;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: black;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  #address {
    color: black;
    border-color: black;
    border-radius: 10px;
    margin-bottom: 10px;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: black;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  #tip {
    color: black;
    border-color: black;
    border-radius: 10px;
    margin-bottom: 10px;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: black;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  #pickup_instructions {
    color: black;
    border-color: black;
    margin-top: 2rem;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: black;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: black;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: black;
    }
  }
  textarea {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 5vh;
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
    background: black;
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
    color: black;
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
    letter-spacing: 1px;
    text-align: center;
    margin-top: 1.2rem;
    @media screen and (max-width: 480px) {
      margin-top: 1rem;
    }
  }
`;

const DistanceImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  transition: all 0.5s ease-in-out;
  img {
    width: 200px;
    height: 200px;
  }
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px sild lightgray;
  border-radius: 10px;
  padding: 40px 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  border-bottom: 1px solid black;
`;
const SummaryItem = styled.div`
  margin: 2em 0em;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const MinimumText = styled.div`
  color: red;
  font-weight: bold;
`;

export default CheckoutInfo;
