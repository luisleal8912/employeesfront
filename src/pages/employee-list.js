import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { URL_API } from "../utils/constanst";
import Footer from "../components/Footer/Footer";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import Pagination from "../components/Pagination/Pagination";

export default function PageList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${URL_API}Employee/list?page=${page - 1}`
        );
        const employees = await response.json();
        setEmployeeList(employees);
        console.log(employees);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [page]);

  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <Row>
      <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
        <h1 tyle={{ fontSize: 35, fontWeight: "bold" }}>Empleados</h1>
      </Col>
      {employeeList ? (
        <Col span="24">
          <Row>
            <EmployeeList employees={employeeList} />
          </Row>
          <Col span="24">
            <Pagination
              currentPage={page}
              totalItems={100}
              onChangePages={onChangePage}
            />
          </Col>
        </Col>
      ) : (
        <Col span="24">
          <div>No se encontraron mas resultados</div>
          {/* <Loading /> */}
        </Col>
      )}
      <Col span="24">
        <Footer />
      </Col>
    </Row>
  );
}
