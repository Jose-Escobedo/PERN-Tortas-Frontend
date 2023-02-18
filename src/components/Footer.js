import styled from "styled-components";
import { FaYelp, FaInstagram } from "react-icons/fa";
import { SiGrubhub } from "react-icons/si";
import { Accessibility, MailOutline, Phone, Room } from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Tortas Mexico Studio City</Logo>
        <Desc>
          Established in 2000. We started up our business back in 2004. Our love
          for mexican food has been growing ever since.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <a href="https://www.yelp.com/biz/tortas-mexico-studio-city">
              <FaYelp />
            </a>
          </SocialIcon>
          <SocialIcon color="f07111">
            <a href="https://www.grubhub.com/restaurant/tortas-mexico-11040-ventura-blvd-studio-city/141026">
              <SiGrubhub style={{ fontSize: "2rem" }} />
            </a>
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <a href="https://www.instagram.com/tortasmexico_studiocity/">
              <FaInstagram />
            </a>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Tortas</ListItem>
          <ListItem>Burritos</ListItem>
          <ListItem>Tacos</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Orders</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.3em;
`;

const AccessibilityLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 1.3em 0em;
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
  ${mobile({ backgroundColor: "#fff8f8" })}
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
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 1.3em;
  ${mobile({ display: "none" })}
`;

export default Footer;
