import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { timeIntervals } from "../data";
import { FaAngleDoubleDown } from "react-icons/fa";

const DateAndTime = ({ handleDate, handleTime, todaySelect }) => {
  const currentDate = moment().toISOString();
  const tomorrow = moment(currentDate).add(1, "d").toDate();
  const dayAfterTomorrow = moment(currentDate).add(2, "d").toDate();
  const threeDaysAhead = moment(currentDate).add(3, "d").toDate();
  const fourDaysAhead = moment(currentDate).add(4, "d").toDate();
  const fiveDaysAhead = moment(currentDate).add(5, "d").toDate();

  const formattedTomorrow = moment(tomorrow).format("MM-DD-YYYY");
  const formattedDayAfter = moment(dayAfterTomorrow).format("MM-DD-YYYY");
  const fThreeDaysAhead = moment(threeDaysAhead).format("MM-DD-YYYY");
  const fFourDaysAhead = moment(fourDaysAhead).format("MM-DD-YYYY");
  const fFiveDaysAhead = moment(fiveDaysAhead).format("MM-DD-YYYY");

  const fifteenMinutes = moment(currentDate).add(15, "m").toDate();
  const thirtyMinutes = moment(currentDate).add(30, "m").toDate();
  const fortyfiveMinutes = moment(currentDate).add(45, "m").toDate();
  const oneHour = moment(currentDate).add(60, "m").toDate();
  const oneHourThirty = moment(currentDate).add(90, "m").toDate();
  const twoHours = moment(currentDate).add(120, "m").toDate();
  const threeHours = moment(currentDate).add(180, "m").toDate();
  const fourHours = moment(currentDate).add(240, "m").toDate();

  const fFifteenMinutes = moment(fifteenMinutes).format("MM.DD. h:mm A");
  const fThirtyMinutes = moment(thirtyMinutes).format("MM.DD. h:mm A");
  const fFortyfiveMinutes = moment(fortyfiveMinutes).format("MM.DD. h:mm A");
  const fOneHour = moment(oneHour).format("MM.DD. h:mm A");
  const fOneHourThirty = moment(oneHourThirty).format("MM.DD. h:mm A");
  const fTwoHours = moment(twoHours).format("MM.DD. h:mm A");
  const fThreeHours = moment(threeHours).format("MM.DD. h:mm A");
  const fFourHours = moment(fourHours).format("MM.DD. h:mm A");

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <DateTitle>PICKUP TIME (OPTIONAL)</DateTitle>
      <OtherwiseText>
        Otherwise order will be made as soon as possible.
      </OtherwiseText>
      <DateTime id="date-range">
        <select
          onChange={(e) => handleDate(e)}
          name="selectedDay"
          defaultValue=""
        >
          <option value="" disabled>
            SELECT A DATE
          </option>
          <option value="today">TODAY</option>
          <option value={formattedTomorrow}>{String(formattedTomorrow)}</option>
          <option value={formattedDayAfter}>{String(formattedDayAfter)}</option>
          <option value={fThreeDaysAhead}>{String(fThreeDaysAhead)}</option>
          <option value={fFourDaysAhead}>{String(fFourDaysAhead)}</option>
          <option value={fFiveDaysAhead}>{String(fFiveDaysAhead)}</option>
        </select>
      </DateTime>
      {todaySelect ? (
        <DateTime id="time-range">
          <select
            onChange={(e) => handleTime(e)}
            name="selectedTime"
            defaultValue=""
          >
            <option value="" disabled>
              SELECT A TIME
            </option>
            <option value={fFifteenMinutes}>{String(fFifteenMinutes)}</option>
            <option value={fThirtyMinutes}>{String(fThirtyMinutes)}</option>
            <option value={fFortyfiveMinutes}>
              {String(fFortyfiveMinutes)}
            </option>
            <option value={fOneHour}>{String(fOneHour)}</option>
            <option value={fOneHourThirty}>{String(fOneHourThirty)}</option>
            <option value={fTwoHours}>{String(fTwoHours)}</option>
            <option value={fThreeHours}>{String(fThreeHours)}</option>
            <option value={fFourHours}>{String(fFourHours)}</option>
          </select>
        </DateTime>
      ) : (
        <DateTime id="time-range">
          <select
            onChange={(e) => handleTime(e)}
            name="selectedTime"
            defaultValue=""
          >
            <option value="" disabled>
              SELECT A TIME
            </option>
            {timeIntervals.map((interval) => (
              <option value={interval.value}>{interval.option}</option>
            ))}
          </select>
        </DateTime>
      )}
    </div>
  );
};

const DateTitle = styled.div`
  font-size: 2rem;
  padding-bottom: 20px;
`;
const OtherwiseText = styled.div`
  font-size: 1rem;
  padding-bottom: 20px;
`;

const DateOptionNow = styled.button`
  padding: 10px;
`;

const DateTime = styled.div`
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
    font-size: 1rem;
  }
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

export default DateAndTime;
