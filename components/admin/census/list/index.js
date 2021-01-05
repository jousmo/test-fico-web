import React from "react"
import { Table, Empty, Tag } from "antd"
import { translateGender, translateDate } from "../../../../helpers/assistantsBeneficiaries"
import Link from "next/link"

export function ListCensus ({ title, dataSource }) {
  const URI = title === "asistentes" ? '/admin/census/assistant/' : '/admin/census/beneficiary/'

  const getOptions = type => {
    return dataSource.reduce((prev, current) => {
      const value = current[type]
      if (!prev?.find(el => el.value === value)) {
        prev.push({ text: value, value })
      }
      return prev
    }, []).sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()))
  }

  const municipalityOptions = getOptions("municipality")
  const colonyOptions = getOptions("colony")

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
        render={(text, record) =>
          <Link href={`${URI}${record.id}`}>
            <a>{text}</a>
          </Link>
        }
        dataIndex="folio"
        sorter={(a, b) => a.folio > b.folio}
        showSorterTooltip={false}
        title="Folio" />
      <Table.Column
        width={1}
        dataIndex="name"
        sorter={(a, b) => a.name?.localeCompare(b.name)}
        showSorterTooltip={false}
        title="Nombre" />
      <Table.Column
        width={1}
        dataIndex="lastName"
        sorter={(a, b) => a.lastName?.localeCompare(b.lastName)}
        showSorterTooltip={false}
        title="Apellido P" />
      <Table.Column
        width={1}
        dataIndex="maidenName"
        sorter={(a, b) => a.maidenName?.localeCompare(b.maidenName)}
        showSorterTooltip={false}
        title="Apellido M" />
      <Table.Column
        width={1}
        dataIndex="gender"
        filters={[
          {text: "Masculino", value: "M"},
          {text: "Femenino", value: "F"}
        ]}
        onFilter={(value, record) => record.gender?.indexOf(value) === 0}
        render={text => translateGender(text)?.label}
        title="Sexo" />
      <Table.Column
        width={1}
        dataIndex="birthdate"
        sorter={(a, b) => a.birthdate?.localeCompare(b.birthdate)}
        showSorterTooltip={false}
        render={text => translateDate(text, "DD/MM/YYYY")}
        title="Fecha de nacimiento" />
      <Table.Column
        width={1}
        dataIndex="curp"
        title="Curp" />
      {title === "asistentes" && (
        <Table.Column
          width={1}
          dataIndex="municipality"
          filters={municipalityOptions}
          onFilter={(value, record) => record.municipality?.indexOf(value) === 0}
          sorter={(a, b) => a.municipality?.localeCompare(b.municipality)}
          showSorterTooltip={false}
          title="Municipio" />
      )}
      <Table.Column
        width={1}
        dataIndex="colony"
        filters={colonyOptions}
        onFilter={(value, record) => record.colony?.indexOf(value) === 0}
        title="Colonia" />
      <Table.Column
        width={1}
        dataIndex="phone"
        title="Teléfono" />
      {title !== "asistentes" && (
        <Table.Column
          width={1}
          dataIndex="problematic"
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
        dataIndex={title === "asistentes" ? "activities" : "axis" }
        title={title === "asistentes" ? "Actividades" : "Eje" }/>
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
        dataIndex="projects"
        title="Proyectos" />
    </Table>
  )
}

