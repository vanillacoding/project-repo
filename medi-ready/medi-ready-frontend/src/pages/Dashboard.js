import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import styled from "styled-components";

import DashboardItem from "../components/Shared/DashboardItem";
import { PageTitle, PageContent } from "../components/Base";

const Dashboard = ({ userInfo }) => {
  const [qrUrl, setQrUrl] = useState("");
  const { user_id, pharmacy_name, pharmacy_address } = userInfo;

  useEffect(() => {
    const goToURL = async () => {
      const fetchUrl = await QRCode.toDataURL(String(user_id));

      setQrUrl(fetchUrl);
    };

    goToURL();
  }, [userInfo]);

  return (
    <PageContent>
      <PageTitle>Dashboard</PageTitle>

      <DashboardItem
        src="/icon-chart.png"
        color="#EAEDFA"
        number={101}
        text="Total Visitis"
      />

      <DashboardItem
        src="/icon-file.png"
        color="#FEF8ED"
        number={135}
        text="Total Prescriptions"
      />

      <QRCodeBox>
        <p>{pharmacy_name} QR Check in</p>
        <img src={qrUrl} />
        <span>{pharmacy_address}</span>
      </QRCodeBox>
    </PageContent>
  );
};

const QRCodeBox = styled.div`
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 250px;
  text-align: center;

  p, span {
    font-size: 14px;
    padding: 11px 0;
    color: #222;
  }

  span {
    display: block;
    text-align: left;
  }

  img {
    max-width: 100%;
    border-radius: 10px;
  }
`;

export default Dashboard;
