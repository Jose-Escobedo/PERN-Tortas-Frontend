import styled from "styled-components";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const SmallWidget = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <WidgetContainer>
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          {users.map((user) => {
            return (
              <li className="widgetSmListItem" key={user._id}>
                <img
                  src={
                    user.img ||
                    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
                  }
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">{user.username}</span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div`
  .widgetSm {
    flex: 1;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
  }

  .widgetSmTitle {
    font-size: 22px;
    font-weight: 600;
  }

  .widgetSmImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .widgetSmList {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .widgetSmListItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
  }

  .widgetSmUser {
    display: flex;
    flex-direction: column;
  }

  .widgetSmUsername {
    font-weight: 600;
  }

  .widgetSmUserTitle {
    font-weight: 300;
  }

  .widgetSmButton {
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
  }

  .widgetSmIcon {
    font-size: 16px !important;
    margin-right: 5px;
  }
`;

export default SmallWidget;
