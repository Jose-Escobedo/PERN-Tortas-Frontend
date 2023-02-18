import { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

const LargeWidget = () => {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("Orders/?new=true");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  return (
    <WidgetContainer>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest transactions</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => {
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">`$ {order.amount}`</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>;
          })}
        </table>
      </div>
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div`
  .widgetLg {
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
  }

  .widgetLgTitle {
    font-size: 22px;
    font-weight: 600;
  }

  .widgetLgTable {
    width: 100%;
    border-spacing: 20px;
  }

  .widgetLgTh {
    text-align: left;
  }

  .widgetLgUser {
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  .widgetLgImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  .widgetLgDate,
  .widgetLgAmount {
    font-weight: 300;
  }

  .widgetLgButton {
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
  }

  .widgetLgButton.approved {
    background-color: #e5faf2;
    color: #3bb077;
  }
  .widgetLgButton.declined {
    background-color: #fff0f1;
    color: #d95087;
  }
  .widgetLgButton.pending {
    background-color: #ebf1fe;
    color: #2a7ade;
  }
`;
export default LargeWidget;
