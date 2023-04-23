import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import tortaLogo from "../images/tortaslogo.svg";
import { Link as LinkScroll } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { sidebarData } from "../sidebarData";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [homeCheck, setHomeCheck] = useState();
  const [sidebar, setSidebar] = useState(false);

  const location = useLocation();
  const homepath = location.pathname;

  const handleClick = (e) => {
    e.preventDefault();
    logout(dispatch, user);
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    if (homepath === "/") {
      setHomeCheck(true);
      console.log(homepath);
    } else {
      setHomeCheck(false);
      console.log(homepath);
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <TortasLogo src={tortaLogo}></TortasLogo>
          </Link>
        </Left>
        <Center id="center">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>Tortas Mexico Studio City</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <>
              {homeCheck ? (
                <NavItem id="menu-btn">
                  <LinkScroll
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                    offset={-60}
                    to="menu"
                    spy={true}
                    smooth={true}
                  >
                    MENU
                  </LinkScroll>
                </NavItem>
              ) : null}

              <NavItem id="order-btn">
                <OrderButton>
                  <Link
                    to="/orders"
                    style={{
                      color: "white",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                  >
                    MY ORDERS
                  </Link>
                </OrderButton>
              </NavItem>
              <NavItem id="logout-btn">
                <Button onClick={handleClick}>LOGOUT</Button>
              </NavItem>
            </>
          ) : (
            <>
              {homeCheck ? (
                <NavItem id="menu-btn">
                  <LinkScroll
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                    offset={-60}
                    to="menu"
                    spy={true}
                    smooth={true}
                  >
                    MENU
                  </LinkScroll>
                </NavItem>
              ) : null}

              <NavItem id="register-btn">
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  REGISTER
                </Link>
              </NavItem>
              <NavItem id="login-btn">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  SIGN IN
                </Link>
              </NavItem>
            </>
          )}

          <Link
            id="cart-btn"
            to="/cart"
            style={{ textDecoration: "none", color: "black" }}
          >
            <NavItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </NavItem>
          </Link>
          <NavItem id="hamburger" className="navbar">
            <Link
              to="#"
              id="hamburger-link"
              onClick={showSidebar}
              style={{ textDecoration: "none", color: "black" }}
            >
              <GiHamburgerMenu />
            </Link>
          </NavItem>
          <NavItemBurger className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiOutlineClose />
                </Link>
              </li>
              {sidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </NavItemBurger>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  padding-bottom: 2em;
  z-index: 5;
  background: white;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0;
  width: 100%;
  @media screen and (max-width: 395px) {
    height: 70px;
    padding-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TortasLogo = styled.img`
  display: block;
  width: 70px;
  height: 70px;
  padding: 0;
  @media screen and (max-width: 395px) {
    display: none;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media screen and (max-width: 395px) {
    display: none;
  }
`;
const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;

const OrderButton = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Language = styled.span`
  font-size: 1rem;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 1.5em;
  padding: 0.4em;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  @media screen and (max-width: 395px) {
    flex: 2;
  }
`;
const Logo = styled.h1`
  font-weight: bold;
  width: 100%;
  @media screen and (max-width: 1238px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
  ${mobile({ fontSize: "1.5 rem" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}

  .navbar {
    height: 20px;
    color: black;
  }

  #hamburger-link {
    color: black;
  }

  .menu-bars {
    font-size: 2rem;
    background: none;
    color: white;
  }
  .nav-menu {
    background-color: #060b26;
    width: 390px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    right: -100%;
    transition: 850ms;
    z-index: 100;
    @media screen and (max-width: 406px) {
      width: 100%;
    }
  }

  .nav-menu.active {
    right: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 85%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }

  .home,
  .login,
  .logout,
  .register,
  .menu {
    display: flex;
    height: 90vh;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  #hamburger {
    display: none;
  }
  @media screen and (max-width: 1168px) {
    //hamburger and cart
    #hamburger {
      display: block;
      color: black;
    }
    #login-btn {
      display: none;
    }
    #order-btn {
      display: none;
    }
    #menu-btn {
      display: none;
    }
    #register-btn {
      display: none;
    }
  }
`;

const NavItem = styled.div`
  font-size: 1rem;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
  ${mobile({ fontSize: "12px", marginRight: "25px", marginLeft: "10px" })}
  @media screen and (max-width: 1238px) {
    font-size: 1rem;
  }
`;

const NavItemBurger = styled.div`
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 1168px) {
    font-size: 1rem;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Navbar;
