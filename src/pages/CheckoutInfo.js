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

const CheckoutInfo = ({ addNewFormData }) => {
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

  const mapApiJs = "https://maps.googleapis.com/maps/api/js";
  const apiKey = process.env.REACT_APP_PLACES;

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

  const handleErrorAddress = (e) => {
    console.log("Please enter street number!");
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

  const handleInstructionsChange = (e) => {
    setFormData({
      ...newFormData,
      dropoff_instructions: e.target.value,
    });
  };

  // const handleOrderCreation = (e) => {
  //   fetch("http://localhost:5000/api/orders", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       _id: user._id,
  //       products: cart.products,
  //       quantity: cart.quantity,
  //       taxes: cart.taxes,
  //       tip: cart.tip,
  //       phone: newFormData.dropoff_phone_number,
  //       subtotal: cart.subtotal,
  //       address: address,
  //       email: newFormData.email,
  //       delivery: 4.99,
  //       total: cart.total,
  //       totalWithTip: cartTotal,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("submitted", data);
  //     });
  // };

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setTotal(cartTotal));
    console.log(newFormData);
    redirectToCheckout();
  };

  const redirectToCheckout = (e) => {
    if (!enabled) {
      console.log("!enabled:", newFormData);
    } else if (fiveMileRadius) {
      console.log("FiveMileRadius", fiveMileRadius);
    } else {
      if (user) {
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
            userId: user._id,
            address: address,
            phone: newFormData.dropoff_phone_number,
            tip: newFormData.tip,
            dropoff_instructions: newFormData.dropoff_instructions,
            email: newFormData.email,
            taxes: cart.taxes,
            pickup: false,
            totalWithTip: cartTotal.toFixed(2),
            subtotal: cart.subtotal,
            total: cartTotal.toFixed(2),
            cart: cart,
            contact: newFormData,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            window.location.href = data.url;
          });
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
            userId: newFormData.email,
            address: address,
            phone: newFormData.dropoff_phone_number,
            dropoff_instructions: newFormData.dropoff_instructions,
            tip: newFormData.tip,
            email: newFormData.email,
            taxes: cart.taxes,
            pickup: false,
            totalWithTip: cartTotal.toFixed(2),
            subtotal: cart.subtotal,
            total: cartTotal.toFixed(2),
            cart: cart,
            contact: newFormData,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            window.location.href = data.url;
          });
      }
    }
  };

  return (
    <>
      <Navbar />
      {isGreaterThanTwenty ? (
        <ContactFormStyled>
          <div className="wrapper">
            <h1 className="delivery-title">Delivery Information</h1>
            {fiveMileRadius ? (
              <h1 style={{ color: "red" }} className="check-radius">
                Delivery distance too far.
              </h1>
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
                  type="text"
                  id="phone"
                  placeholder="PHONE"
                  name="dropoff_phone_number"
                  value={newFormData.dropoff_phone_number}
                  onChange={handlePhoneChange}
                  required
                />

                <input
                  type="text"
                  id="address"
                  ref={searchInput}
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
                  placeholder="DELIVERY INSTRUCTIONS FOR DRIVER"
                  name="dropoff_instructions"
                  id="dropoff_instructions"
                  value={newFormData.dropoff_instructions}
                  onChange={handleInstructionsChange}
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
                      <SummaryItemPrice>$ {newFormData.tip}</SummaryItemPrice>
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
                Tortas Mexico Studio City &copy;2022
              </div>
            </div>
          </div>
        </ContactFormStyled>
      ) : (
        <MinimumText>
          Delivery subtotal minimum of $11.97 not met. Please add more items to
          cart.
        </MinimumText>
      )}

      <Footer />
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
  border: 1px solid black;
  color: white;

  background: linear-gradient(
    90deg,
    rgba(24, 24, 71, 1) 0%,
    rgba(10, 10, 23, 1) 35%,
    rgba(0, 0, 0, 1) 100%
  );

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3em 1em;
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
    border-color: white;
    color: white;
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
    color: white;
    border-color: white;
    border-top: none;
    border-right: none;
    border-left: none;

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
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
      color: white;
    }
  }
  #last-name {
    color: white;
    border-color: white;
    border-top: none;
    border-right: none;
    border-left: none;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: white;
    }
  }
  #email {
    color: white;
    border-color: white;
    border-top: none;
    border-right: none;
    border-left: none;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: white;
    }
  }
  #phone {
    color: white;
    border-color: white;
    border-top: none;
    border-right: none;
    border-left: none;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: white;
    }
  }
  #address {
    color: white;
    border-color: white;
    border-top: none;
    border-right: none;
    border-left: none;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: white;
    }
  }
  #tip {
    color: white;
    border-color: white;
    border-top: none;
    border-right: none;
    border-left: none;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: white;
    }
  }
  #dropoff_instructions {
    color: white;
    border-color: white;
    margin-top: 2rem;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: white;
    }
  }

  textarea {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    min-height: 20%;
    max-height: 20vh;
    background-color: transparent;
    color: white;
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
    color: white;
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

const Summary = styled.div`
  flex: 1;
  border: 0.5px sild lightgray;
  border-radius: 10px;
  padding: 40px 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  border-bottom: 1px solid white;
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
