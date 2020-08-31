import { Table, Button, Space, Empty } from "antd"
import { EditOutlined, EyeOutlined } from "@ant-design/icons"
import { DateField, SelectField } from "../../../../../../../shared"
import { cellFormat } from "../../../../../../../../helpers"
import { getUrlPdf, monthYearConvert, getConcept } from "../../../helpers"
import moment from "moment"
moment.locale("es")

export function ListExpense ({ dataSource, concepts, onEdit }) {
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
        render={text => <SelectField value={monthYearConvert(text)} disabled />}
        sorter={(a, b) => a.monthAt?.localeCompare(b.monthAt)}
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="issuedAt"
        title="Emisión"
        sorter={(a, b) => moment(a.issuedAt) > moment(b.issuedAt)}
        showSorterTooltip={false}
        render={text => moment(text).format("DD/MMMM/YYYY").toUpperCase()} />
      <Table.Column
        width={1}
        dataIndex="uuid"
        sorter={(a, b) => a.uuid?.localeCompare(b.uuid)}
        showSorterTooltip={false}
        title="Folio SAT" />
      <Table.Column
        width={1}
        dataIndex="issuer"
        sorter={(a, b) => a.issuer?.localeCompare(b.issuer)}
        showSorterTooltip={false}
        title="Emisor" />
      <Table.Column
        width={1}
        dataIndex="rfc"
        sorter={(a, b) => a.rfc?.localeCompare(b.rfc)}
        showSorterTooltip={false}
        title="RFC" />
      <Table.Column
        width={1}
        dataIndex="amount"
        title="Importe"
        sorter={(a, b) => a.amount - b.amount}
        showSorterTooltip={false}
        render={text => cellFormat.money(text)} />
      <Table.Column
        width={2}
        dataIndex="paymentAt"
        title="Fecha de pago"
        sorter={(a, b) => moment(a.paymentAt) > moment(b.paymentAt)}
        showSorterTooltip={false}
        render={text => <DateField
          value={text} format="DD/MM/YYYY"
          disabled />} />
      <Table.Column
        width={1}
        dataIndex="concept"
        title="ID Concepto"
        render={text => <SelectField value={getConcept(concepts, text)} disabled />}
        sorter={(a, b) => a.concept?.localeCompare(b.concept)}
        showSorterTooltip={false} />
      <Table.Column
        width={1}
        dataIndex="percentage"
        render={text => `${text}%`}
        sorter={(a, b) => a.percentage - b.percentage}
        showSorterTooltip={false}
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
            href={getUrlPdf(dataSource)}
            target="_blank"
            type="primary" shape="circle"
            icon={<EyeOutlined />} />
        </Space>} />
    </Table>
  )
}

