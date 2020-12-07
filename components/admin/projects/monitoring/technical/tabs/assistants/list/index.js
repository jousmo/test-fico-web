import { useState } from "react"
import { Table, Empty, Tag } from "antd"

export function ListAssistants ({ dataSource }) {
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
      scroll={{ x: true }}
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
        title="Sexo" />
      <Table.Column
        width={1}
        dataIndex="birthdate"
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
    </Table>
  )
}

