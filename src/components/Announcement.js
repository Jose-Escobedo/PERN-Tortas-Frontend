import styled from "styled-components";

const Announcement = () => {
  return <Container>Enjoy some Authentic Mexican food today!</Container>;
};

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
`;

export default Announcement;
