import styled from "styled-components";
import ChkTacos from "../images/chk-tacos.JPG";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const blankForm = {
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };

  const [newFormData, setFormData] = useState(blankForm);

  const { name, lastname, password, email, username } = newFormData;

  // const enabled =
  //   email.length > 0 &&
  //   dropoff_contact_family_name.length > 0 &&
  //   dropoff_contact_given_name.length > 0 &&
  //   dropoff_phone_number.length > 9 &&
  //   dropoff_location.length > 0;

  const handleFirstNameChange = (e) => {
    setFormData({
      ...newFormData,
      name: e.target.value,
    });
  };

  const handleLastNameChange = (e) => {
    setFormData({
      ...newFormData,
      lastname: e.target.value,
    });
  };

  const handleUserNameChange = (e) => {
    setFormData({
      ...newFormData,
      username: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...newFormData,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...newFormData,
      password: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(newFormData);
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newFormData.name,
        lastname: newFormData.lastname,
        email: newFormData.email,
        username: newFormData.username,
        password: newFormData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        login(dispatch, { username, password });
        navigate("/", { replace: true });
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            id="first-name"
            placeholder="FIRST NAME"
            name="name"
            value={newFormData.name}
            onChange={handleFirstNameChange}
            required
          />
          <Input
            type="text"
            id="last-name"
            placeholder="LAST NAME"
            name="lastname"
            value={newFormData.lastname}
            onChange={handleLastNameChange}
            required
          />
          <Input
            type="text"
            id="user-name"
            placeholder="USERNAME"
            name="username"
            value={newFormData.username}
            onChange={handleUserNameChange}
            required
          />
          <Input
            type="text"
            id="email"
            placeholder="EMAIL"
            name="email"
            value={newFormData.email}
            onChange={handleEmailChange}
            required
          />
          <Input
            type="password"
            id="password"
            placeholder="PASSWORD"
            name="password"
            value={newFormData.password}
            onChange={handlePasswordChange}
            required
          />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={isFetching}>REGISTER</Button>
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
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 1rem;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
export default Register;
