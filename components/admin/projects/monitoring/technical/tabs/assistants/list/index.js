import React from "react"
import { Table, Empty, Tag, Space, Button } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { translateGender, translateDate } from "../../../../../../../../helpers/assistantsBeneficiaries"
import { DeleteButton } from "../../../../../../../shared"

export function ListAssistants ({ dataSource, onEdit, onDelete, loading, selected, setSelected }) {
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelected({ rows: selectedRows, keys: selectedRowKeys })
  }

  const onSelectDisabled = record => ({
    disabled: record?.beneficiary,
    name: record?.folio
  })

  const rowSelection = {
    selectedRowKeys: selected.keys,
    selectedRows: selected.rows,
    onChange: onSelectChange,
    getCheckboxProps: onSelectDisabled
  }

  return (
    <Table
      rowKey={a => a.id}
      rowSelection={rowSelection}
      style={{marginTop: "1.5rem"}}
      dataSource={dataSource}
      size="small"
      locale={{emptyText: <Empty description="Agrega asistentes" />}}
      loading={loading}
      pagination={true}>
      <Table.Column
        width={1}
        render={text => <a>{text}</a>}
        dataIndex="folio"
        sorter={(a, b) => a.folio - b.folio}
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
        dataIndex="times"
        sorter={(a, b) => a.times - b.times}
        showSorterTooltip={false}
        title="Veces" />
      <Table.Column
        width={1}
        dataIndex="lastName"
        sorter={(a, b) => a.lastName?.localeCompare(b.lastName)}
        showSorterTooltip={false}
        title="Apellido Paterno" />
      <Table.Column
        width={1}
        dataIndex="maidenName"
        sorter={(a, b) => a.maidenName?.localeCompare(b.maidenName)}
        showSorterTooltip={false}
        title="Apellido Materno" />
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
        render={text => translateDate(text, "DD/MM/YYYY")}
        title="Fecha de nacimiento" />
      <Table.Column
        width={1}
        dataIndex="age"
        sorter={(a, b) => a.age - b.age}
        showSorterTooltip={false}
        title="Edad" />
      <Table.Column
        width={1}
        dataIndex="municipality"
        sorter={(a, b) => a.municipality?.localeCompare(b.municipality)}
        showSorterTooltip={false}
        title="Municipio" />
      <Table.Column
        width={1}
        dataIndex="colony"
        sorter={(a, b) => a.colony?.localeCompare(b.colony)}
        showSorterTooltip={false}
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

