import React from "react"
import { Table, Empty, Tag } from "antd"
import { translateGender, translateDate } from "../../../../helpers/assistantsBeneficiaries"

export function ListCensus ({ title, dataSource }) {
  return (
    <Table
      rowKey={a => a.id}
      style={{marginTop: "1.5rem"}}
      dataSource={dataSource}
      size="small"
      locale={{emptyText: <Empty description={`No hay ${title}`} />}}
      pagination={true}>
      <Table.Column
        width={1}
        render={text => <a>{text}</a>}
        dataIndex="folio"
        title="Folio" />
      <Table.Column
        width={1}
        dataIndex="name"
        title="Nombre" />
      <Table.Column
        width={1}
        dataIndex="lastName"
        title="Apellido P" />
      <Table.Column
        width={1}
        dataIndex="maidenName"
        title="Apellido M" />
      <Table.Column
        width={1}
        dataIndex="gender"
        render={text => translateGender(text)?.label}
        title="Sexo" />
      <Table.Column
        width={1}
        dataIndex="birthdate"
        render={text => translateDate(text, "DD/MM/YYYY")}
        title="Fecha de nac" />
      <Table.Column
        width={1}
        dataIndex="curp"
        title="Curp" />
      {title === "asistentes" && (
        <Table.Column
          width={1}
          dataIndex="municipality"
          title="Municipio" />
      )}
      <Table.Column
        width={1}
        dataIndex="colony"
        title="Colonia" />
      <Table.Column
        width={1}
        dataIndex="phone"
        title="Teléfono" />
      {title !== "asistentes" && (
        <Table.Column
          width={1}
          dataIndex="problem"
          title="Problemática" />
      )}
      <Table.Column
        width={1}
        render={text => (
          <>
            <Tag
              color="orange"
              key="1"
              style={{marginRight: "0px"}}>
              U
            </Tag>
            <Tag color="green" key="2">P</Tag>
            {text}
          </>
        )}
        dataIndex="activities"
        title="Eje" />
      <Table.Column
        width={1}
        render={text => (
          <>
            <Tag
              color="orange"
              key="1"
              style={{marginRight: "0px"}}>
              U
            </Tag>
            <Tag color="green" key="2">P</Tag>
            {text}
          </>
        )}
        dataIndex="activities"
        title="Actividad" />
    </Table>
  )
}

