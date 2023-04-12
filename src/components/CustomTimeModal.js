import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const CustomTimeModal = ({ open, timeIntervals, close, handleTime }) => {
  if (!open) return null;
  return (
    <Overlay onClick={close}>
      <ModalContainer>
        <NoImageFilterMenuItems>
          <CloseButton>
            <AiOutlineClose style={{ fontSize: "2rem", cursor: "pointer" }} />
          </CloseButton>

          <h2 className="select-item">SELECT AN ITEM</h2>
          {timeIntervals.map((i) => (
            <MenuItemComboWrapper>
              <input
                type="radio"
                value={i.value}
                name={"intervals"}
                id={"time-intervals"}
                onChange={(e) => handleTime(e)}
              />
              <h2 id={"time-int-select"}>{`${i.option}`}</h2>
            </MenuItemComboWrapper>
          ))}
        </NoImageFilterMenuItems>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  left: 0;
  top: 0;
`;
const ModalContainer = styled.div`
  z-index: 20;
  width: 50%;
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 7%;
  left: 90%;
`;

const NoImageFilterMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  .select-item {
    padding-bottom: 10px;
  }
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
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
const MenuItemComboWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default CustomTimeModal;
