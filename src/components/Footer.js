import styled from "styled-components";
import { FaYelp, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiGrubhub } from "react-icons/si";
import { Accessibility, MailOutline, Phone, Room } from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const [widthIsLess760px, setWidthIsLess760px] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 760) {
        setWidthIsLess760px(true);
      } else {
        setWidthIsLess760px(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Container>
      {widthIsLess760px ? (
        <>
          <Center>
            <Title>Useful Links</Title>
            <List>
              <ListItem>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </ListItem>

              <ListItem>
                <Link
                  to="/menu"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Menu
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/order-lookup"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Order Lookup
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Cart
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/products/tortas"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Tortas
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/products/burritos"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Burritos
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/products/tacos"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Tacos
                </Link>
              </ListItem>

              <ListItem>
                <AccessibilityLink to="/accessibility">
                  Accessibility
                </AccessibilityLink>
              </ListItem>
            </List>
          </Center>
          <Left>
            <Logo>Tortas Mexico Studio City</Logo>
            <Desc>
              Established in 2000. We started up our business back in 2004. Our
              love for mexican food has been growing ever since.
            </Desc>
            <Right>
              <Title>Contact</Title>
              <ContactItem>
                <a href="https://www.google.com/maps/place/Tortas+Mexico+Restaurant/@34.140505,-118.3736457,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2be150a3a4a87:0x4bb0951e3b36f3c2!8m2!3d34.1405406!4d-118.3715541?hl=en">
                  <Room style={{ marginRight: "10px" }} />
                  11040 Ventura Blvd, Studio City CA 91604
                </a>
              </ContactItem>
              <ContactItem>
                <a href="tel:+18187602571">
                  <Phone style={{ marginRight: "10px" }} />
                  +1 (818) 760-2571
                </a>
              </ContactItem>
              <ContactItem>
                <a href="mailto:support@tortasmexico-studiocity.com">
                  <MailOutline style={{ marginRight: "10px" }} />
                  support@tortasmexico-studiocity.com
                </a>
              </ContactItem>
            </Right>
            <SocialContainer>
              <SocialIcon color="3B5999">
                <a href="https://www.yelp.com/biz/tortas-mexico-studio-city">
                  <FaYelp />
                </a>
              </SocialIcon>

              <SocialIcon color="55ACEE">
                <a href="https://www.instagram.com/tortasmexico_studiocity/">
                  <FaInstagram />
                </a>
              </SocialIcon>
              <SocialIcon color="000000">
                <a href="https://www.tiktok.com/@tortasmexico_studiocity">
                  <FaTiktok />
                </a>
              </SocialIcon>
            </SocialContainer>

            <Desc>
              &copy; Copyright {currentYear} Tortas Mexico Studio City{" "}
            </Desc>
          </Left>
        </>
      ) : (
        <>
          <Left>
            <Logo>Tortas Mexico Studio City</Logo>
            <Desc>
              Established in 2000. We started up our business back in 2004. Our
              love for mexican food has been growing ever since.
            </Desc>
            <SocialContainer>
              <SocialIcon color="3B5999">
                <a href="https://www.yelp.com/biz/tortas-mexico-studio-city">
                  <FaYelp />
                </a>
              </SocialIcon>

              <SocialIcon color="55ACEE">
                <a href="https://www.instagram.com/tortasmexico_studiocity/">
                  <FaInstagram />
                </a>
              </SocialIcon>
              <SocialIcon color="000000">
                <a href="https://www.tiktok.com/@tortasmexico_studiocity">
                  <FaTiktok />
                </a>
              </SocialIcon>
            </SocialContainer>
            <Desc>
              &copy; Copyright {currentYear} Tortas Mexico Studio City{" "}
            </Desc>
          </Left>
          <Center>
            <Title>Useful Links</Title>
            <List>
              <ListItem>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </ListItem>

              <ListItem>
                <Link
                  to="/menu"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Menu
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/order-lookup"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Order Lookup
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Cart
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/products/tortas"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Tortas
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/products/burritos"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Burritos
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/products/tacos"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Tacos
                </Link>
              </ListItem>

              <ListItem>
                <AccessibilityLink to="/accessibility">
                  Accessibility
                </AccessibilityLink>
              </ListItem>
            </List>
          </Center>
          <Right>
            <Title>Contact</Title>
            <ContactItem>
              <a href="https://www.google.com/maps/place/Tortas+Mexico+Restaurant/@34.140505,-118.3736457,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2be150a3a4a87:0x4bb0951e3b36f3c2!8m2!3d34.1405406!4d-118.3715541?hl=en">
                <Room style={{ marginRight: "10px" }} />
                11040 Ventura Blvd, Studio City CA 91604
              </a>
            </ContactItem>
            <ContactItem>
              <a href="tel:+18187602571">
                <Phone style={{ marginRight: "10px" }} />
                +1 (818) 760-2571
              </a>
            </ContactItem>
            <ContactItem>
              <a href="mailto:support@tortasmexico-studiocity.com">
                <MailOutline style={{ marginRight: "10px" }} />
                support@tortasmexico-studiocity.com
              </a>
            </ContactItem>
          </Right>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-top: 1px solid black;
  background-color: white;
  max-width: 100%;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.3em;
  @media screen and (max-width: 760px) {
    justify-content: center;
    align-items: center;
  }
`;

const AccessibilityLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Logo = styled.h1`
  @media screen and (max-width: 500px) {
    font-size: 1.4rem;
  }
`;
const Desc = styled.p`
  margin: 1.3em 0em;
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;
const SocialContainer = styled.div`
  display: flex;
  a {
    text-decoration: none;
    color: white;
  }
`;
const SocialIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.3em;
`;

const Right = styled.div`
  flex: 1;
  padding: 1.3em;
  @media screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 410px) {
    font-size: 0.8rem;
  }
`;

const ContactItem = styled.div`
  margin-bottom: 1.3em;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
    padding: 0;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 760px) {
    justify-content: center;
  }
`;

const Payment = styled.img`
  width: 50%;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 760px) {
    text-align: center;
  }
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 1.3em;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

export default Footer;
