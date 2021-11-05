import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { URL_API } from "../../utils/constanst";
import useFetch from "../../hooks/useFetch";
import { useHistory, useParams } from "react-router-dom";

export default function Edit(props) {
  const { id } = useParams();

  const employeeDetail = useFetch(`${URL_API}Employee?id=${id}`);

  if (employeeDetail.loading || !employeeDetail.result) {
    return "Cargando...";
  }
  console.log(employeeDetail);
  return <RenderEmployee employee={employeeDetail.result} />;
}

function RenderEmployee(props) {
  const { employee } = props;

  const onFinish = (values: any) => {
    let dataSent = values;
    dataSent.id = employee.id;
    let requestOptions = {
      method: "PUT",
      body: JSON.stringify(dataSent),
      headers: {
        "Content-Type": "application/json",
      },
    };
    setOptions(requestOptions);
  };

  const [subAreaList, setSubAreaList] = useState([]);
  const [areaId, setAreaId] = useState(0);
  const [options, setOptions] = useState([]);

  const areas = useFetch(`${URL_API}Area`);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        const identify = areaId > 0 ? areaId : employee.areaId;
        if (identify > 0) {
          const response = await fetch(`${URL_API}SubArea?areaId=${identify}`);
          const subArea = await response.json();
          console.log(subArea);
          setSubAreaList(subArea);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [areaId]);

  useEffect(() => {
    (async () => {
      try {
        if (options.body) {
          const response = await fetch(`${URL_API}Employee`, options);
          const id = await response.json();
          console.log(id);
          alert("registro editado exitosamente");
          history.push(`/employee/${id}`);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [options]);

  const documentType = [
    { id: 1, name: "RC-Registro civil de nacimiento" },
    { id: 2, name: "TI-Tarjeta de identidad" },
    { id: 3, name: "CC-Cédula de ciudadanía" },
    { id: 4, name: "TE-Tarjeta de extranjería" },
    { id: 5, name: "CE-Cédula de extranjería" },
    { id: 6, name: "NIT" },
    { id: 7, name: "PA-Pasaporte" },
    { id: 8, name: "TDE-Tipo de documento extranjero" },
  ];
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{
        name: employee.name,
        lastName: employee.lastName,
        documentNumber: employee.documentNumber,
        areaId: employee.areaId,
        subAreaId: employee.subAreaId,
        typeId: employee.typeId,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Apellido"
        name="lastName"
        rules={[{ required: true, message: "Por favor ingrese un apellido" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tipo de documento"
        name="typeId"
        rules={[
          {
            required: true,
            message: "Por favor seleccione un tipo de documento",
          },
        ]}
      >
        <Select>
          {documentType ? (
            documentType.map((area) => (
              <Select.Option key={area.id} value={area.id}>
                {area.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="-1">Seleccione..</Select.Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Número"
        name="documentNumber"
        rules={[{ required: true, message: "Por favor ingrese un documento" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Area"
        name="areaId"
        rules={[
          {
            required: true,
            message: "Por favor seleccione una área",
          },
        ]}
      >
        <Select
          onChange={(e) => {
            setAreaId(e);
          }}
        >
          {areas.result ? (
            areas.result.map((area) => (
              <Select.Option key={area.id} value={area.id}>
                {area.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="-1">Seleccione..</Select.Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label="Sub Area"
        name="subAreaId"
        rules={[
          {
            required: true,
            message: "Por favor seleccione una sub área",
          },
        ]}
      >
        <Select>
          {subAreaList ? (
            subAreaList.map((area) => (
              <Select.Option key={area.id} value={area.id}>
                {area.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="-1">Seleccione..</Select.Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item label="Button">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Button
        </Button>
      </Form.Item>
    </Form>
  );
}
