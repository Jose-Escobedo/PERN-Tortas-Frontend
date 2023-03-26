import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { extrasInfo } from "../data";
import { menuComboItems } from "../data";
import { useNavigate } from "react-router-dom";
import ProductWithChoice from "./ProductWithChoice";
import { FaAngleDoubleDown } from "react-icons/fa";
import CustomModal from "../components/CustomModal";
import CustomModalTwo from "../components/CustomModalTwo";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const [productPrice, setProductPrice] = useState(product.price);
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [extrasSum, setExtrasSum] = useState(0);
  const [note, setNote] = useState();
  const [generic, setGeneric] = useState();
  const [moleBoolean, setMoleBoolean] = useState();
  const [comboCheck, setComboCheck] = useState();
  const [comboOneCheck, setComboOneCheck] = useState();
  const [sideCheck, setSideCheck] = useState();
  const [itemWarning, setItemWarning] = useState(false);
  const [checkPathName, setCheckPathName] = useState(false);
  const [checkMisc, setCheckMisc] = useState(false);
  const blankCombo = {
    firstItem: "",
    secondItem: "",
  };

  const blankVariety = {
    firstItem: "",
    secondItem: "",
  };
  const [itemCombo, setItemCombo] = useState(blankCombo);
  const [variety, setVariety] = useState(blankVariety);
  const [tacos, setTacos] = useState(false);
  const [secondTaco, setSecondTaco] = useState(false);
  const [aguaHorchata, setAguaHorchata] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);
  const [tortillas, setTortillas] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "scroll",
      overflowX: "hidden",
    },
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();

    if (
      id === "62d00754c020372b553c8948" ||
      id === "638ba5ab773371cc8a0988ab" ||
      id === "638ba65a773371cc8a0988ad" ||
      id === "638ba6ed773371cc8a0988ae" ||
      id === "638ba713773371cc8a0988af" ||
      id === "638ba297773371cc8a0988a0" ||
      id === "638ba2c8773371cc8a0988a1" ||
      id === "638ba317773371cc8a0988a2" ||
      id === "638baf78773371cc8a0988d8" ||
      id === "638bafac773371cc8a0988d9" ||
      id === "638baff0773371cc8a0988dc" ||
      id === "638bb033773371cc8a0988de" ||
      id === "62d00814c020372b553c894a"
    ) {
      setTortillas(true);
    } else setTortillas(false);

    //if Hardshell Taco change Component
    if (id === "638baa68773371cc8a0988c0") {
      setCheckPathName(true);
    }

    //if Chimichanga change Component
    if (id === "638bac71773371cc8a0988cb") {
      setCheckPathName(true);
    }

    //if Sope change Component
    if (id === "638ba987773371cc8a0988bd") {
      setCheckPathName(true);
    }

    //if 3 Sopes change Component
    if (id === "62d008e1c020372b553c894c") {
      setCheckPathName(true);
    }

    //if Meat Nachos change Component
    if (id === "638ba406773371cc8a0988a5") {
      setCheckPathName(true);
    }

    //if Meat Quesadilla change Component
    if (id === "638bae71773371cc8a0988d4") {
      setCheckPathName(true);
    }

    //if 3 Taquitos change Component
    if (id === "638ba924773371cc8a0988bb") {
      setCheckPathName(true);
    }

    //if ala carte taquitos Nachos change Component
    if (id === "638ba957773371cc8a0988bc") {
      setCheckPathName(true);
    }

    //if Tostada change Component
    if (id === "638bab85773371cc8a0988c8") {
      setCheckPathName(true);
    }

    //if Kids Burrito change Component
    if (id === "638bb3b3773371cc8a0988ea") {
      setCheckPathName(true);
    }

    //if Kids Taquitos change Component
    if (id === "638bb510773371cc8a0988ed") {
      setCheckPathName(true);
    }

    //if Kids Taco change Component
    if (id === "638bb4cf773371cc8a0988ec") {
      setCheckPathName(true);
    }

    //if Kids Quesadilla change Component
    if (id === "638bb3f1773371cc8a0988eb") {
      setCheckPathName(true);
    }

    //if Asada Kids change Component
    if (id === "638bb52f773371cc8a0988ee") {
      setCheckPathName(true);
    }

    //if Carnitas Kids change Component
    if (id === "638bb56a773371cc8a0988f1") {
      setCheckPathName(true);
    }

    //if Picadillo kids change Component
    if (id === "638bb540773371cc8a0988ef") {
      setCheckPathName(true);
    }

    //if chicken kids change Component
    if (id === "638bb554773371cc8a0988f0") {
      setCheckPathName(true);
    }

    //if Fountain drink change Component
    if (id === "6389b18c0701561835d6af8a") {
      setCheckPathName(true);
    }

    //if Horchata change Component
    if (id === "6389b1190701561835d6af89") {
      setCheckPathName(true);
    }

    //if Agua Fresca change Component
    if (id === "6389b25b0701561835d6af8d") {
      setCheckPathName(true);
    }
  }, [id]);

  useEffect(() => {
    if (
      itemCombo.firstItem === "ASADA-TACO" ||
      itemCombo.firstItem === "CHICKEN-TACO" ||
      itemCombo.firstItem === "PASTOR-TACO" ||
      itemCombo.firstItem === "PICADILLO-TACO" ||
      itemCombo.firstItem === "LENGUA-TACO" ||
      itemCombo.firstItem === "CARNITAS-TACO" ||
      itemCombo.firstItem === "VEGETARIAN-TACO" ||
      itemCombo.firstItem === "SHREDDED-CHICKEN-TACO"
    ) {
      setTacos(true);
    } else {
      setTacos(false);
    }

    if (
      itemCombo.secondItem === "ASADA-TACO" ||
      itemCombo.secondItem === "CHICKEN-TACO" ||
      itemCombo.secondItem === "PASTOR-TACO" ||
      itemCombo.secondItem === "PICADILLO-TACO" ||
      itemCombo.secondItem === "LENGUA-TACO" ||
      itemCombo.secondItem === "CARNITAS-TACO" ||
      itemCombo.secondItem === "VEGETARIAN-TACO" ||
      itemCombo.secondItem === "SHREDDED-CHICKEN-TACO"
    ) {
      setSecondTaco(true);
    } else {
      setSecondTaco(false);
    }
  }, [itemCombo]);

  useEffect(() => {
    let originalPrice = product.price;
    product.extras = [];
    product.note = "";
    product.itemCombo = [];
    setProductPrice(originalPrice);

    if (product.img === "") {
      setGeneric(true);
    } else {
      setGeneric(false);
    }

    if (product.name === "Pollo con Mole") {
      setMoleBoolean(true);
    } else {
      setMoleBoolean(false);
    }

    if (product.name === "2 Item Combination") {
      setComboCheck(true);
    } else {
      setComboCheck(false);
    }

    if (product.name === "1 Item Combination") {
      setComboOneCheck(true);
    } else {
      setComboOneCheck(false);
    }

    if (
      product.categories?.includes("sides") ||
      product.categories?.includes("desserts") ||
      product.categories?.includes("beverages") ||
      product.categories?.includes("shakes")
    ) {
      setSideCheck(true);
    } else {
      setSideCheck(false);
    }
  }, [product.extras]);

  const { firstItem, secondItem } = itemCombo;

  const handleFirstItem = (e) => {
    setItemCombo({
      ...itemCombo,
      firstItem: e.target.value,
    });

    setItemWarning(false);

    console.log("first item", itemCombo);
  };
  const handleVarietyOne = (e) => {
    setVariety({
      ...variety,
      firstItem: e.target.value,
    });

    setItemWarning(false);

    console.log("variety-one", variety);
  };
  const handleVarietyTwo = (e) => {
    setVariety({
      ...variety,
      secondItem: e.target.value,
    });

    setItemWarning(false);

    console.log("variety-two", variety);
  };
  const handleSecondItem = (e) => {
    setItemCombo({
      ...itemCombo,
      secondItem: e.target.value,
    });

    setItemWarning(false);
    console.log("second item", itemCombo);
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (
      product.name !== "2 Item Combination" &&
      product.name !== "1 Item Combination" &&
      !product.categories.includes("soups") &&
      product.name !== "Huevos A La Mexicana" &&
      product.name !== "Huevos Con Chorizo" &&
      product.name !== "Huevos Con Jamon" &&
      product.name !== "Chile Verde" &&
      product.name !== "Arroz con Pollo" &&
      product.name !== "Carnitas Picado" &&
      product.name !== "Chicken Picado" &&
      product.name !== "Pollo con Mole"
    ) {
      setProductPrice(product.price + extrasSum);
      product.price = product.price + extrasSum;
      if (extras !== []) {
        product.extras.push(extras);
      }

      product.itemCombo = itemCombo;

      product.note = note;
      dispatch(addProduct({ ...product, quantity }));
      toast.success("Item has been added to Cart.", {
        position: toast.POSITION.TOP_CENTER,
        toastId: "success3",
      });

      navigate("/cart");
    } else if (
      product.categories.includes("soups") ||
      product.name === "Huevos A La Mexicana" ||
      product.name === "Huevos Con Chorizo" ||
      product.name === "Huevos Con Jamon" ||
      product.name === "Chile Verde" ||
      product.name === "Arroz con Pollo" ||
      product.name === "Carnitas Picado" ||
      product.name === "Chicken Picado" ||
      product.name === "Pollo con Mole"
    ) {
      if (itemCombo.firstItem !== "") {
        if (itemCombo.firstItem === "HOMEMADE TORTILLA") {
          setProductPrice(product.price + extrasSum + 0.5);
          product.price = product.price + extrasSum + 0.5;
        } else {
          setProductPrice(product.price + extrasSum);
          product.price = product.price + extrasSum;
        }

        if (extras !== []) {
          product.extras.push(extras);
        } else {
          console.log("no extras");
        }

        product.itemCombo = itemCombo;

        product.note = note;
        dispatch(addProduct({ ...product, quantity }));
        toast.success("Item has been added to Cart.", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "success3",
        });

        navigate("/cart");
      } else {
        setItemWarning(true);
      }
    } else if (product.name === "2 Item Combination") {
      if (
        itemCombo.firstItem !== "" &&
        itemCombo.secondItem !== "" &&
        !tacos &&
        !secondTaco
      ) {
        setProductPrice(product.price + extrasSum);
        product.price = product.price + extrasSum;

        if (extras !== []) {
          product.extras.push(extras);
        } else {
          console.log("no extras");
        }

        product.itemCombo = itemCombo;

        product.note = note;
        dispatch(addProduct({ ...product, quantity }));
        toast.success("Item has been added to Cart.", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "success3",
        });

        navigate("/cart");
      } else if (tacos && !secondTaco) {
        if (itemCombo.secondItem !== "" && itemCombo.firstItem !== "") {
          if (variety.firstItem !== "") {
            if (variety.firstItem === "HOMEMADE TORTILLA") {
              setProductPrice(product.price + extrasSum + 0.5);
              product.price = product.price + extrasSum + 0.5;
            } else {
              setProductPrice(product.price + extrasSum);
              product.price = product.price + extrasSum;
            }
            if (extras !== []) {
              product.extras.push(extras);
            } else {
              console.log("no extras");
            }

            product.itemCombo = itemCombo;
            product.variety = variety;

            product.note = note;
            dispatch(addProduct({ ...product, quantity }));
            toast.success("Item has been added to Cart.", {
              position: toast.POSITION.TOP_CENTER,
              toastId: "success3",
            });

            navigate("/cart");
          } else {
            setItemWarning(true);
          }
        } else {
          setItemWarning(true);
        }
      } else if (!tacos && secondTaco) {
        if (itemCombo.secondItem !== "" && itemCombo.firstItem !== "") {
          if (variety.secondItem !== "") {
            if (variety.secondItem === "HOMEMADE TORTILLA") {
              setProductPrice(product.price + extrasSum + 0.5);
              product.price = product.price + extrasSum + 0.5;
            } else {
              setProductPrice(product.price + extrasSum);
              product.price = product.price + extrasSum;
            }

            if (extras !== []) {
              product.extras.push(extras);
            } else {
              console.log("no extras");
            }

            product.itemCombo = itemCombo;
            product.variety = variety;

            product.note = note;
            dispatch(addProduct({ ...product, quantity }));
            toast.success("Item has been added to Cart.", {
              position: toast.POSITION.TOP_CENTER,
              toastId: "success3",
            });

            navigate("/cart");
          } else {
            setItemWarning(true);
          }
        } else {
          setItemWarning(true);
        }
      } else if (secondTaco && tacos) {
        if (variety.firstItem !== "" && variety.secondItem !== "") {
          if (
            variety.firstItem === "HOMEMADE TORTILLA" &&
            variety.secondItem !== "HOMEMADE TORTILLA"
          ) {
            setProductPrice(product.price + extrasSum + 0.5);
            product.price = product.price + extrasSum + 0.5;
          } else if (
            variety.firstItem === "HOMEMADE TORTILLA" &&
            variety.secondItem === "HOMEMADE TORTILLA"
          ) {
            setProductPrice(product.price + extrasSum + 1.0);
            product.price = product.price + extrasSum + 1.0;
          } else if (
            variety.firstItem !== "HOMEMADE TORTILLA" &&
            variety.secondItem === "HOMEMADE TORTILLA"
          ) {
            setProductPrice(product.price + extrasSum + 0.5);
            product.price = product.price + extrasSum + 0.5;
          } else {
            setProductPrice(product.price + extrasSum);
            product.price = product.price + extrasSum;
          }

          if (extras !== []) {
            product.extras.push(extras);
          } else {
            console.log("no extras");
          }

          product.itemCombo = itemCombo;
          product.variety = variety;

          product.note = note;
          dispatch(addProduct({ ...product, quantity }));
          toast.success("Item has been added to Cart.", {
            position: toast.POSITION.TOP_CENTER,
            toastId: "success3",
          });

          navigate("/cart");
        } else {
          setItemWarning(true);
        }
      } else {
        setItemWarning(true);
      }
    } else if (product.name === "1 Item Combination") {
      if (itemCombo.firstItem !== "" && !tacos) {
        setProductPrice(product.price + extrasSum);
        product.price = product.price + extrasSum;

        if (extras !== []) {
          product.extras.push(extras);
        } else {
          console.log("no extras");
        }

        product.itemCombo = itemCombo;
        product.variety = variety;

        product.note = note;
        dispatch(addProduct({ ...product, quantity }));
        toast.success("Item has been added to Cart.", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "success3",
        });

        navigate("/cart");
      }
      if (tacos) {
        if (variety.firstItem !== "") {
          if (variety.firstItem === "HOMEMADE TORTILLA") {
            setProductPrice(product.price + extrasSum + 0.5);
            product.price = product.price + extrasSum + 0.5;
          } else {
            setProductPrice(product.price + extrasSum);
            product.price = product.price + extrasSum;
          }

          if (extras !== []) {
            product.extras.push(extras);
          } else {
            console.log("no extras");
          }

          product.itemCombo = itemCombo;
          product.variety = variety;

          product.note = note;
          dispatch(addProduct({ ...product, quantity }));
          toast.success("Item has been added to Cart.", {
            position: toast.POSITION.TOP_CENTER,
            toastId: "success3",
          });

          navigate("/cart");
        } else {
          setItemWarning(true);
        }
      } else {
        setItemWarning(true);
      }
    }
  };
  const addOrRemove = (e) => {
    // current array of options
    const newExtras = extras;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      newExtras.push(e.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = newExtras.indexOf(e.target.value);
      newExtras.splice(index, 1);
    }

    // update the state with the new array of options
    setExtras(newExtras);
    const sum = extras
      .map((obj) => Number(obj.replace(/[^0-9\.]+/g, "")))
      .reduce((totalValue, currValue) => {
        // currValue will be the actual object )
        return totalValue + currValue;
      }, 0);

    setExtrasSum(sum);
    console.log(extras);
    console.log(extrasSum);
  };

  const handleNote = (e) => {
    console.log(e);
    setNote(e);
  };

  return checkPathName ? (
    <ProductWithChoice />
  ) : (
    <Container>
      <StyledToastContainer />
      <CustomModal
        menuComboItems={menuComboItems}
        open={openModal}
        close={() => setOpenModal(false)}
        handleFirstItem={handleFirstItem}
      />
      <CustomModalTwo
        menuComboItems={menuComboItems}
        open={openModalTwo}
        close={() => setOpenModalTwo(false)}
        handleSecondItem={handleSecondItem}
      />
      <Navbar />

      {generic ? (
        <NoImageWrapper>
          <NoImageInfoContainer>
            <Title>{product.name}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {productPrice}</Price>
            <NoImageFilterContainer>
              <NoImageFilter>
                {comboCheck ? (
                  <>
                    <SelectContainer>
                      <Button
                        id="modalbtn1"
                        className="btn"
                        onClick={() => setOpenModal(true)}
                      >
                        {itemCombo.firstItem ? (
                          <h2 className="combo-item">
                            {itemCombo.firstItem.replace(/-/g, " ")}
                          </h2>
                        ) : (
                          <>
                            <FaAngleDoubleDown />
                            <h2 className="combo-item faspace">
                              SELECT COMBO ITEM
                            </h2>
                          </>
                        )}
                      </Button>
                    </SelectContainer>
                    {tacos ? (
                      <SelectContainer>
                        <select
                          onChange={(e) => handleVarietyOne(e)}
                          name="selectedVariety"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            SELECT A TORTILLA
                          </option>
                          <option value="CORN TORTILLA">CORN TORTILLA</option>
                          <option value="FLOUR TORTILLA">FLOUR TORTILLA</option>
                          <option value="HOMEMADE TORTILLA">
                            HOMEMADE $0.50
                          </option>
                        </select>
                      </SelectContainer>
                    ) : null}

                    <SelectContainer>
                      <Button
                        id="modalbtn2"
                        className="btn"
                        onClick={() => setOpenModalTwo(true)}
                      >
                        {itemCombo.secondItem ? (
                          <h2 className="combo-item">
                            {itemCombo.secondItem.replace(/-/g, " ")}
                          </h2>
                        ) : (
                          <>
                            <FaAngleDoubleDown />
                            <h2 className="combo-item faspace">
                              SELECT COMBO ITEM
                            </h2>
                          </>
                        )}
                      </Button>
                    </SelectContainer>
                    {secondTaco ? (
                      <SelectContainer>
                        <select
                          onChange={(e) => handleVarietyTwo(e)}
                          name="selectedVariety"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            SELECT A TORTILLA
                          </option>
                          <option value="CORN TORTILLA">CORN TORTILLA</option>
                          <option value="FLOUR TORTILLA">FLOUR TORTILLA</option>
                          <option value="HOMEMADE TORTILLA">
                            HOMEMADE $0.50
                          </option>
                        </select>
                      </SelectContainer>
                    ) : null}

                    {itemWarning ? (
                      <SelectContainer>
                        <h2>
                          Please make sure to select item before adding to cart.
                        </h2>
                      </SelectContainer>
                    ) : null}
                  </>
                ) : comboOneCheck ? (
                  <>
                    <SelectContainer>
                      <Button
                        id="modalbtn1"
                        className="btn"
                        onClick={() => setOpenModal(true)}
                      >
                        {itemCombo.firstItem ? (
                          <h2 className="combo-item">
                            {itemCombo.firstItem.replace(/-/g, " ")}
                          </h2>
                        ) : (
                          <>
                            <FaAngleDoubleDown />
                            <h2 className="combo-item faspace">
                              SELECT COMBO ITEM
                            </h2>
                          </>
                        )}
                      </Button>
                    </SelectContainer>
                    {tacos ? (
                      <SelectContainer>
                        <select
                          onChange={(e) => handleVarietyOne(e)}
                          name="selectedVariety"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            SELECT A TORTILLA
                          </option>
                          <option value="CORN TORTILLA">CORN TORTILLA</option>
                          <option value="FLOUR TORTILLA">FLOUR TORTILLA</option>
                          <option value="HOMEMADE TORTILLA">
                            HOMEMADE $0.50
                          </option>
                        </select>
                      </SelectContainer>
                    ) : null}

                    {itemWarning ? (
                      <SelectContainer>
                        <h2>
                          Please make sure to select item before adding to cart.
                        </h2>
                      </SelectContainer>
                    ) : null}
                  </>
                ) : tortillas ? (
                  <>
                    <SelectContainer id="tortilla-caldo">
                      <select
                        onChange={(e) => handleFirstItem(e)}
                        name="selectedDishOne"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          SELECT A TORTILLA
                        </option>
                        <option value="CORN TORTILLA">CORN TORTILLA</option>
                        <option value="FLOUR TORTILLA">FLOUR TORTILLA</option>
                        <option value="HOMEMADE TORTILLA">
                          HOMEMADE $0.50
                        </option>
                      </select>
                    </SelectContainer>
                    {itemWarning ? (
                      <SelectContainer>
                        <h2>
                          Please make sure to select item before adding to cart.
                        </h2>
                      </SelectContainer>
                    ) : null}
                  </>
                ) : null}
                <NoImageFilterNotes
                  onChange={(e) => handleNote(e.target.value)}
                >
                  <span>ADD NOTE: </span>
                  <br></br>

                  <textarea placeholder="Allergies, No onions, etc, anything else we should know before preparation."></textarea>
                </NoImageFilterNotes>
                {sideCheck ? null : (
                  <>
                    <NoImageFilterTitle>EXTRAS:</NoImageFilterTitle>
                    <NoImageFilterExtras
                      onChange={(event) => addOrRemove(event)}
                    >
                      {extrasInfo?.map((i) => (
                        <>
                          <label>
                            <input value={i.option} type="checkbox" />
                            {i.option}
                          </label>
                        </>
                      ))}
                    </NoImageFilterExtras>
                  </>
                )}
              </NoImageFilter>
            </NoImageFilterContainer>
            <NoImageAddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("inc")}
                />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </NoImageAddContainer>
          </NoImageInfoContainer>
        </NoImageWrapper>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={product.img}></Image>
          </ImgContainer>
          <InfoContainer>
            <Title>{product.name}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {productPrice}</Price>
            {tortillas ? (
              <SelectContainer id="tortilla-caldo">
                <select
                  onChange={(e) => handleFirstItem(e)}
                  name="selectedDishOne"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    SELECT A TORTILLA
                  </option>
                  <option value="CORN TORTILLA">CORN TORTILLA</option>
                  <option value="FLOUR TORTILLA">FLOUR TORTILLA</option>
                  <option value="HOMEMADE TORTILLA">HOMEMADE $0.50</option>
                </select>
              </SelectContainer>
            ) : null}
            {itemWarning ? (
              <SelectContainer>
                <h2>Please make sure to select item before adding to cart.</h2>
              </SelectContainer>
            ) : null}
            <FilterContainer>
              <Filter>
                <FilterNotes onChange={(e) => handleNote(e.target.value)}>
                  <span>ADD NOTE: </span>
                  <br></br>

                  <textarea placeholder="Allergies, No onions, etc, anything else we should know before preparation."></textarea>
                </FilterNotes>
                <FilterTitle>EXTRAS:</FilterTitle>
                <FilterExtras onChange={(event) => addOrRemove(event)}>
                  {extrasInfo?.map((i) => (
                    <>
                      <label>
                        <input value={i.option} type="checkbox" />
                        {i.option}
                      </label>
                    </>
                  ))}
                </FilterExtras>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("inc")}
                />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}

      <Footer />
    </Container>
  );
};

const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  .toast {
    background-color: black;
    color: white;
  }
  button[aria-label="close"] {
    color: white;
  }
`;

const Container = styled.div`
  margin-top: 70px;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const NoImageWrapper = styled.div`
  display: flex;
  padding: 50px 0;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SelectContainer = styled.div`
  padding-top: 0;
  padding-bottom: 20px;

  Button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
    &:hover {
      border: 1px solid aquamarine;
      transition: all 0.5s ease-in-out;
      background-color: black;
      h2 {
        color: white;
      }
      &:first-child {
        color: white;
      }
    }
    &:first-child {
      color: teal;
      font-size: 1rem;
    }
  }

  h2 {
    color: red;
    font-size: 1.2rem;
  }
  .faspace {
    padding-left: 7px;
  }

  .combo-item {
    color: black;
    font-size: 1.2rem;
  }

  select {
    width: 50%;
    font-size: 1rem;
    font-weight: bold;
    display: inline-block;
    background-color: transparent;
    position: relative;
    border: 1px solid teal;
    cursor: pointer;
    border-top: none;
    border-right: none;
    border-left: none;
  }
  option {
  }
`;

const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const GenericImage = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const NoImageInfoContainer = styled.div`
  width: 35%;
  ${mobile({ padding: "10px" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
  #tortilla-caldo {
    padding-top: 20px;
  }
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 3em;
`;

const MenuItemComboWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NoImageFilterMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  h2 input {
    margin-right: 1em;
  }

  h2 {
    font-size: 1.5rem;
    color: black;
    cursor: pointer;
    padding-left: 7px;
  }

  input {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    position: relative;
    *overflow: hidden;
  }
`;

const NoImageFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0px;
  ${mobile({ width: "100%" })}
`;
const NoImageFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NoImageFilterTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 200;
`;
const NoImageFilterNotes = styled.form`
  width: 90%;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: black;
  padding-bottom: 1em;
  span {
    margin-left: 0.5em;
  }
  @media screen and (max-width: 1100px) {
    width: 100%;
    padding: 0.5em;
  }
  @media screen and (max-width: 410px) {
    padding: 0.4em;
  }

  textarea {
    resize: none;
    width: 100%;
    min-height: 20%;
    background-color: transparent;
    color: black;
    border-radius: 20px;
    font-size: 1em;
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
`;
const NoImageFilterExtras = styled.div`
  display: flex;

  flex-direction: column;
  label input {
    margin-right: 1em;
  }
  label {
    font-size: 1.5rem;
    display: block;
  }
  input {
    width: 13px;
    height: 13px;
    vertical-align: middle;

    position: relative;
    *overflow: hidden;
  }
`;

const NoImageAddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0px;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
const FilterTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 200;
`;
const FilterNotes = styled.form`
  max-width: 100%;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: black;
  padding-bottom: 1em;
  span {
    margin-left: 0.5em;
  }
  @media screen and (max-width: 1100px) {
    width: 100%;
    padding: 0.5em;
  }
  @media screen and (max-width: 410px) {
    padding: 0.4em;
  }

  textarea {
    resize: none;
    width: 100%;
    min-height: 20%;
    background-color: transparent;
    color: black;
    border-radius: 20px;
    font-size: 1em;
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
`;
const FilterExtras = styled.div`
  display: flex;

  flex-direction: column;
  label input {
    margin-right: 1em;
  }
  label {
    font-size: 1.5rem;
    display: block;
  }
  input {
    width: 13px;
    height: 13px;
    vertical-align: middle;

    position: relative;
    *overflow: hidden;
  }
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 1em;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export default Product;
