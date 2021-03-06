import { useEffect, useState } from "react"
import { Table, Button, Select, Space, Empty } from "antd"
import { EditOutlined, EyeOutlined, CommentOutlined } from "@ant-design/icons"
import { DateField, DeleteButton, SelectField } from "../../../../../../../shared"
import { cellFormat } from "../../../../../../../../helpers"
import { getUrlPdf, monthYearConvert, getConcept, invoicesExport } from "../../../helpers"
import moment from "moment"
moment.locale("es")

export function ListExpense ({ dataSource, concepts, onEdit, onComment, onDelete, getStatus, loading, readOnly }) {
  const [items, setItems] = useState(dataSource)

  useEffect(() => {
    setItems(dataSource)
  }, [dataSource])

  const statusOptions = new Set()
  dataSource.forEach(el => statusOptions.add(el.status))

  const onFilter = status => {
    if (status === "ALL") {
      setItems(dataSource)
    } else {
      setItems(Array.from(dataSource).filter(el => el.status === status))
    }
  }

  return (
    <>
      <Space style={{margin: "1rem 0"}}>
        <Select onSelect={onFilter} placeholder="Filtrar por estatus">
          <Select.Option value="ALL">Todos</Select.Option>
          {Array.from(statusOptions).map(el =>
            <Select.Option value={el}>{el}</Select.Option>
          )}
        </Select>
        <Button
          disabled={loading}
          onClick={() => invoicesExport(dataSource, concepts)}>
          Descargar reporte
        </Button>
        <Button
          disabled={loading}
          onClick={getStatus}
          type="primary">
          Revisar estatus CFDI
        </Button>
      </Space>
      <Table
        loading={loading}
        rowKey={a => a.id}
        style={{marginTop: "1.5rem"}}
        dataSource={items}
        size="small"
        locale={{emptyText: <Empty description="Agrega todas las facturas" />}}
        scroll={{ x: true }}
        pagination={true}>
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
          title="Emisi??n"
          sorter={(a, b) => a.issuedAt?.localeCompare(b.issuedAt)}
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
          sorter={(a, b) => a.paymentAt?.localeCompare(b.paymentAt)}
          showSorterTooltip={false}
          render={text => <DateField
            value={text} format="DD/MM/YYYY"
            disabled />} />
        <Table.Column
          width={1}
          dataIndex="concept"
          title="ID Concepto"
          render={text => <SelectField value={getConcept(concepts, text)} disabled />}
          sorter={(a, b) => getConcept(concepts, a.concept)?.localeCompare(getConcept(concepts, b.concept))}
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
          dataIndex="status"
          render={text => text || "- - -"}
          showSorterTooltip={false}
          sorter={(a, b) => a.status?.localeCompare(b.status)}
          title="Estatus" />
        <Table.Column
          width={1}
          title=""
          render={(text, record, index) => <Space>
            <Button
              type="primary" shape="circle"
              icon={<CommentOutlined />}
              onClick={() => onComment(record)} />
            <Button
              type="primary" shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(record, index)} />
            <Button
              href={getUrlPdf(record?.documents)}
              target="_blank"
              type="primary" shape="circle"
              icon={<EyeOutlined />} />
            {!record?.reviewed && (
              <DeleteButton
                disabled={readOnly}
                type="primary"
                shape="circle"
                onClick={() => onDelete(record)}/>
            )}
          </Space>} />
      </Table>
    </>
  )
}

