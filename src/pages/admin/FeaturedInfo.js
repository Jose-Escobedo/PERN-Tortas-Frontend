import styled from "styled-components";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/stats");
        setIncome(res.data);
        setPercentage((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);

  return (
    <FeaturedInfoContainer>
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Revenue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${income[1]?.total}</span>
            <span className="featuredMoneyRate">
              -11.4 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,415</span>
            <span className="featuredMoneyRate">
              -1.4 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Cost</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,225</span>
            <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    </FeaturedInfoContainer>
  );
};

const FeaturedInfoContainer = styled.div`
  .featured {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .featuredItem {
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  }

  .featuredTitle {
    font-size: 20px;
  }

  .featuredMoneyContainer {
    margin: 10px 0px;
    display: flex;
    align-items: center;
  }

  .featuredMoney {
    font-size: 30px;
    font-weight: 600;
  }

  .featuredMoneyRate {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .featuredIcon {
    font-size: 14px;
    margin-left: 5px;
    color: green;
  }

  .featuredIcon.negative {
    color: red;
  }

  .featuredSub {
    font-size: 15px;
    color: gray;
  }
`;

export default FeaturedInfo;
