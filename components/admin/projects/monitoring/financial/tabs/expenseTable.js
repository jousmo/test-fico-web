import { Table, Select, DatePicker, Button, Space } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import moment from "moment"

export function ExpenseTable () {
  const dataSource = [
    {
      key: "1",
      mes: "ENERO",
      emision: "21/Ene/2020",
      folio: "OESS-DFSDF-SDFSF",
      emisor: "JOSE USCANGA",
      rfc: "UAMJ83120CY8",
      importe: 1234,
      fechaPago: "21/01/2020",
      conceptoId: "Telefono/Internet",
      presupuestoUso: "16%"
    }
  ]

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"]

  return (
    <Table
      style={{marginTop: "1.5rem"}}
      dataSource={dataSource}
      size="small">
      <Table.Column
        width={1}
        dataIndex="key"
        title="" />
      <Table.Column
        width={1}
        dataIndex="mes"
        title="Mes"
        render={text => <Select value={text} />} />
      <Table.Column
        width={1}
        dataIndex="emision"
        title="Emisión" />
      <Table.Column
        width={1}
        dataIndex="folio"
        title="Folio SAT" />
      <Table.Column
        width={1}
        dataIndex="emisor"
        title="Emisor" />
      <Table.Column
        width={1}
        dataIndex="rfc"
        title="RFC" />
      <Table.Column
        width={1}
        dataIndex="importe"
        title="Importe" />
      <Table.Column
        width={1}
        dataIndex="fechaPago"
        title="Fecha de pago"
        render={text => <DatePicker defaultValue={moment(text, dateFormatList[0])} format={dateFormatList} />} />
      <Table.Column
        width={1}
        dataIndex="conceptoId"
        title="ID Concepto"
        render={text => <Select value={text} />} />
      <Table.Column
        width={1}
        dataIndex="presupuestoUso"
        title="Uso presupuestal" />
      <Table.Column
        width={1}
        dataIndex="actions"
        title=""
        render={text => <Space>
          <Button
            type="primary" shape="circle"
            icon={<EditOutlined />} />
          <Button
            type="primary" shape="circle"
            icon={<EyeOutlined />} />
        </Space>} />
    </Table>
  )
}