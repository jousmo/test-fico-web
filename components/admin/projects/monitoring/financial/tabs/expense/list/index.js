import { Table, Select, Button, Space, Empty } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { DateField } from "../../../../../../../shared"
import moment from "moment"

export function ListExpense ({ dataSource, budgeted }) {
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
        dataIndex="issuedAt"
        title="Emisión"
        render={text => moment(text).format("DD/MMMM/YYYY").toUpperCase()} />
      <Table.Column
        width={1}
        dataIndex="uuid"
        title="Folio SAT"
        sorter />
      <Table.Column
        width={1}
        dataIndex="issuer"
        title="Emisor" />
      <Table.Column
        width={1}
        dataIndex="rfc"
        title="RFC" />
      <Table.Column
        width={1}
        dataIndex="amount"
        title="Importe"
        render={text => `$${text}`} />
      <Table.Column
        width={2}
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
        dataIndex="percentage"
        title="Uso presupuestal"
        render={(text, row) => `${parseFloat((row.amount * 100) / budgeted).toFixed(2)}%` } />
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