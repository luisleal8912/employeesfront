import React from "react";
import { Col, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./EmployeeList.scss";

export default function EmployeeList(props) {
  const { employees } = props;

  return employees.map((employee) => (
    <Col key={employee.id} xs={6} className="employee-list">
      <DetailCard employee={employee} />
    </Col>
  ));

  function DetailCard(props) {
    const {
      employee: { id, name, lastName },
    } = props;
    const { Meta } = Card;
    const img = `https://teamsdevst.blob.core.windows.net/blobteams/employee.png`;

    return (
      <Link to={`employee/${id}`}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt={name} src={img} />}
          actions={[<EyeOutlined />]}
        >
          <Meta title={`${name} ${lastName}`} />
        </Card>
      </Link>
    );
  }
}
