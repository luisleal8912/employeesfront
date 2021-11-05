import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import "./Menu.scss";
import { styles } from "ansi-colors";

export default function MenuTop() {
  return (
    <div className="menu">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/employee">Lista</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/add">Agregar</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/search">Seacrh</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
