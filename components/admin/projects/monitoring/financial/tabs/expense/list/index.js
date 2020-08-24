import { Table, Button, Space, Empty } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { DateField, SelectField } from "../../../../../../../shared"
import { cellFormat } from "../../../../../../../../helpers"
import { getUrlPdf } from "../form/helpers"
import moment from "moment"
moment.locale("es")

export function ListExpense ({ dataSource, onEdit }) {
  const { url } = getUrlPdf(dataSource)

  return (
    <Table
      rowKey={a => a.id}
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
        render={text => <SelectField value={text} disabled />} />
      <Table.Column
        width={1}
        dataIndex="issuedAt"
        title="Emisión"
        render={text => moment(text).format("DD/MMMM/YYYY").toUpperCase()} />
      <Table.Column
        width={1}
        dataIndex="uuid"
        title="Folio SAT" />
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
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={2}
        dataIndex="paymentAt"
        title="Fecha de pago"
        render={text => <DateField
          value={text} format="DD/MM/YYYY"
          disabled />} />
      <Table.Column
        width={1}
        dataIndex="concept"
        title="ID Concepto"
        render={text => <SelectField value={text} disabled />} />
      <Table.Column
        width={1}
        dataIndex="percentage"
        render={text => `${text}%`}
        title="Uso presupuestal" />
      <Table.Column
        width={1}
        title=""
        render={(text, record, index) => <Space>
          <Button
            type="primary" shape="circle"
            icon={<EditOutlined />}
            onClick={() => onEdit(record, index)} />
          <Button
            href={url}
            target="_blank"
            type="primary" shape="circle"
            icon={<EyeOutlined />} />
        </Space>} />
    </Table>
  )
}