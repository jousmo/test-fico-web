import { Table, Button, Space, Empty } from "antd"
import { EditOutlined, EyeOutlined, CommentOutlined } from "@ant-design/icons"
import { DateField, DeleteButton, SelectField } from "../../../../../../../shared"
import { cellFormat } from "../../../../../../../../helpers"
import { getUrlPdf, monthYearConvert, getConcept, readXmlFile } from "../../../helpers"
import moment from "moment"
import React, { useState, useEffect } from "react"
moment.locale("es")
import axios from "axios"

export function ListExpense ({ dataSource, concepts, onEdit, onComment, onDelete }) {
  const [state, setState] = useState({
    loading: false,
    dataSource: undefined
  })

  const list = async () => {
    setState({ ...state, loading: true })
    const result = await Promise.all(dataSource?.map(async element => {
      const { rfc, rfcRec, amount, uuid } = await readXmlFile(element?.documents, 0)
      const { data: { status }} = await axios.post('/api/cfdi', { rfc, rfcRec, total: amount, uuid })
      element.status = status || "No encontrado"
      return element
    }))
    setState({ loading: false, dataSource: result })
  }

  useEffect(() => {
    if (dataSource.length) {
      list()
    }
  }, [dataSource.length > 0])

  return (
    <>
      <Button
        disabled={state?.loading}
        onClick={list}
        type="primary"
        style={{float: "right", margin: "1rem 0"}}>
        Revisar estatus CFDI
      </Button>
      <Table
        loading={state?.loading}
        rowKey={a => a.id}
        style={{marginTop: "1.5rem"}}
        dataSource={state?.dataSource}
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
          title="Emisión"
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
          sorter={(a, b) => getConcept(concepts, a.concept).localeCompare(getConcept(concepts, b.concept))}
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
          showSorterTooltip={false}
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
                type="primary"
                shape="circle"
                onClick={() => onDelete(record)}/>
            )}
          </Space>} />
      </Table>
    </>
  )
}

