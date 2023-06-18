import styled from "styled-components";
import { mobile } from "../responsive";
import ChkTacos from "../images/chk-tacos.JPG";
import { useEffect, useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    toast.success(`Welcome Back!`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Link
          to="/"
          id="close"
          style={{ textDecoration: "none", color: "black" }}
        >
          <AiOutlineClose />
        </Link>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Wrong Credentials...</Error>}
          <Linka>FORGOT PASSWORD?</Linka>
          <Link style={{ color: "black" }} to={"/register"}>
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    )
    url(${ChkTacos}) center;
  display: flex;
  background-size: cover;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  #close {
    font-size: 2rem;
    cursor: pointer;
  }
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    color: green;
  }
`;

const Linka = styled.a`
  margin: 5px 0px;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
export default Login;
