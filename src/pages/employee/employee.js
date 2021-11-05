import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { URL_API } from "../../utils/constanst";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

import "./employee.scss";

export default function Employee(props) {
  const { id } = useParams();

  const employeeDetail = useFetch(`${URL_API}Employee?id=${id}`);

  if (employeeDetail.loading || !employeeDetail.result) {
    return "Cargando...";
  }

  return <RenderEmployee employee={employeeDetail.result} />;
}

function RenderEmployee(props) {
  const {
    employee: { id, name, latsname },
  } = props;

  const img = `https://teamsdevst.blob.core.windows.net/blobteams/poster.jpg`;
  return (
    <div className="employee" style={{ backgroundImage: `url('${img}')` }}>
      <div className="employee__dark" />
      <Row>
        <Col span={8} offset={3} className="employee__poster">
          <PosterEmployee></PosterEmployee>
        </Col>
        <Col span={10} className="employee__info">
          <EmployeeDetail employee={props.employee} />
        </Col>
      </Row>
    </div>
  );
}

function PosterEmployee() {
  const img = `https://teamsdevst.blob.core.windows.net/blobteams/employee.png`;

  return <div style={{ backgroundImage: `url('${img}')` }} />;
}

function EmployeeDetail(props) {
  const {
    employee: {
      id,
      name,
      lastName,
      documentNumber,
      typeId,
      subAreaName,
      areaName,
    },
  } = props;

  const renderSwitch = (typeId) => {
    switch (typeId) {
      case 1:
        return "RC";
        break;
      case 2:
        return "TI";
        break;
      case 3:
        return "CC";
        break;
      case 4:
        return "TE";
        break;
      case 5:
        return "CE";
        break;
      case 6:
        return "NIT";
        break;
      case 7:
        return "PA";
        break;
      case 8:
        return "TDE";
        break;
    }
  };
  return (
    <>
      <div className="employee__info-header">
        <h1>
          {name} {lastName}
        </h1>
        <Link to={`/edit/${id}`}>
          <Button icon={<EditOutlined />}>Edit</Button>
        </Link>
      </div>
      <div className="employee__info-content">
        <h3>Documento</h3>
        <p>
          {renderSwitch(typeId)} {documentNumber}
        </p>
        <h3>Area y sub área </h3>
        <ul>
          <li>{areaName}</li>
          <li>{subAreaName}</li>
        </ul>
      </div>
    </>
  );
}
