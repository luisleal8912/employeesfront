import React from "react";
import { Layout } from "antd";

import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <p> &#169; 2021 by Luis Fernando Leal Quitian </p>
    </Footer>
  );
}
