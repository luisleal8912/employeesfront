import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { URL_API } from "../../utils/constanst";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

export default function Add() {
  const onFinish = (values: any) => {
    let dataSent = values;
    let requestOptions = {
      method: "POST",
      body: JSON.stringify(dataSent),
      headers: {
        "Content-Type": "application/json",
      },
    };
    setOptions(requestOptions);
    console.log("Received values of form: ", dataSent);
  };

  const [subAreaList, setSubAreaList] = useState([]);
  const [areaId, setAreaId] = useState(0);
  const [options, setOptions] = useState([]);

  const areas = useFetch(`${URL_API}Area`);
  let history = useHistory();
  useEffect(() => {
    (async () => {
      try {
        if (areaId > 0) {
          const response = await fetch(`${URL_API}SubArea?areaId=${areaId}`);
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
          alert("registro creado exitosamente");
          history.push(`/employee/${id}`);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [options]);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ remember: true }}
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
          <Select.Option value="1">
            RC-Registro civil de nacimiento
          </Select.Option>
          <Select.Option value="2">TI-Tarjeta de identidad</Select.Option>
          <Select.Option value="3">CC-Cédula de ciudadanía</Select.Option>
          <Select.Option value="4">TE-Tarjeta de extranjería</Select.Option>
          <Select.Option value="5">CE-Cédula de extranjería </Select.Option>
          <Select.Option value="6">NIT</Select.Option>
          <Select.Option value="7">PA-Pasaporte</Select.Option>
          <Select.Option value="8">
            TDE-Tipo de documento extranjero
          </Select.Option>
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
