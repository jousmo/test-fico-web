import React, { useState } from "react"
import { Table, Empty, Tag, Space, Button } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { translateGender, translateDate } from "./helper"
import { DeleteButton } from "../../../../../../../shared"

export function ListAssistants ({ dataSource, onEdit, onDelete }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  return (
    <Table
      rowKey={a => a.id}
      rowSelection={rowSelection}
      style={{marginTop: "1.5rem"}}
      dataSource={dataSource}
      size="small"
      locale={{emptyText: <Empty description="Agrega asistentes" />}}
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
        dataIndex="times"
        title="Veces" />
      <Table.Column
        width={1}
        dataIndex="lastName"
        title="Apellido Paterno" />
      <Table.Column
        width={1}
        dataIndex="maidenName"
        title="Apellido Materno" />
      <Table.Column
        width={1}
        dataIndex="gender"
        render={text => translateGender(text)?.label}
        title="Sexo" />
      <Table.Column
        width={1}
        dataIndex="birthdate"
        render={text => translateDate(text, "DD/MM/YYYY")}
        title="Fecha de nacimiento" />
      <Table.Column
        width={1}
        dataIndex="age"
        title="Edad" />
      <Table.Column
        width={1}
        dataIndex="municipality"
        title="Municipio" />
      <Table.Column
        width={1}
        dataIndex="colony"
        title="Colonia" />
      <Table.Column
        width={1}
        dataIndex="phone"
        title="Teléfono" />
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
      <Table.Column
        width={1}
        title=""
        render={(text, record, index) => <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onEdit(record, index)} />
          <DeleteButton
            onClick={() => onDelete(record)}/>
        </Space>} />
    </Table>
  )
}

