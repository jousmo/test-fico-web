import { Table, Select, Button, Space, Empty } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { DateField } from "../../../../../../../shared"

export function ListExpense ({ dataSource }) {
  return (
    <Table
      rowKey={r => r}
      style={{marginTop: "1.5rem"}}
      dataSource={dataSource}
      size="small"
      locale={{emptyText: <Empty description="Agrega todas las facturas" />}}
      pagination={false}>
      <Table.Column
        width={1}
        title=""
        render={(text, record, index) => ++index} />
      <Table.Column
        width={1}
        dataIndex="monthAt"
        title="Mes"
        render={text => <Select value={text} />} />
      <Table.Column
        width={1}
        dataIndex="createAt"
        title="Emisión" />
      <Table.Column
        width={1}
        dataIndex="uuid"
        title="Folio SAT"
        sorter />
      <Table.Column
        width={1}
        dataIndex="issuing"
        title="Emisor" />
      <Table.Column
        width={1}
        dataIndex="rfc"
        title="RFC" />
      <Table.Column
        width={1}
        dataIndex="ficosecPayment"
        title="Importe" />
      <Table.Column
        width={1}
        dataIndex="paymentAt"
        title="Fecha de pago"
        render={text => <DateField value={text} format="DD/MM/YYYY" />} />
      <Table.Column
        width={1}
        dataIndex="concept"
        title="ID Concepto"
        render={text => <Select value={text} />} />
      <Table.Column
        width={1}
        dataIndex="investmentOnePayment"
        title="Uso presupuestal" />
      <Table.Column
        width={1}
        title=""
        render={() => <Space>
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