import styled from "styled-components";
import { FaYelp, FaInstagram } from "react-icons/fa";
import { SiGrubhub } from "react-icons/si";
import { MailOutline, Phone, Room } from "@material-ui/icons";

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
            <FaYelp />
          </SocialIcon>
          <SocialIcon color="f07111">
            <SiGrubhub style={{ fontSize: "2rem" }} />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <FaInstagram />
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
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          11040 Ventura Blvd, Studio City CA 91604
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +1 (818) 760-2571
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          TortasMexico63@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.3em;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 1.3em 0em;
`;
const SocialContainer = styled.div`
  display: flex;
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
`;

const ContactItem = styled.div`
  margin-bottom: 1.3em;
  display: flex;
  align-items: center;
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
`;

const Center = styled.div`
  flex: 1;
  padding: 1.3em;
`;

export default Footer;
