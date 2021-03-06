import React, { useContext, useEffect, useState } from "react"
import { Alert, Space, DatePicker } from "antd"
import { Section, SearchFieldPrimary, CompositeField, StatisticHeader } from "../../../../../../shared"
import ModalCommentMonitoring from "../../../../../../shared/modal-comment-monitoring"
import { cellFormat } from "../../../../../../../helpers"
import { ListExpense } from "./list"
import { ModalExpense } from "./form"
import moment from "moment"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"
import { getConcept, readXmlFile } from "../../helpers"
import axios from "axios"

export function Expense () {
  const { data: { Submission }, readOnly, save, update, deleteInvoice } = useContext(AdminSubmissionContext)
  const [state, setState] = useState({
    isModalOpen: false,
    edit: false,
    filterInvoice: false,
    isModalCommentOpen: false,
    projectInvoice: { id: "", type: "INVOICE" },
    loading: false
  })

  useEffect(() => {
    setState({ ...state, filterInvoice: false })
  }, [Submission])

  const dataStatistics = [
    { title: "Presupuesto a FICOSEC", value: cellFormat.money(Submission?.budgeted).children },
    { title: "Comprobado a FICOSEC", value: cellFormat.money(Submission?.evidenced).children },
    { title: "Diferencia", value: cellFormat.money(Submission?.difference).children, valueStyle:{ color: "#cf1322" }}
  ]

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, isModalCommentOpen: false, edit: false })
  }

  const onChange = expense => {
    const newExpense = Array.from(expense)
    setState({ ...state, dataSource: newExpense })
  }

  const onSave = (addNew, replaceItemAtIndex) => expense => {
    if(expense.index !== undefined) {
      replaceItemAtIndex(expense.index, expense)
      update(expense)
    } else {
      addNew(expense)
      save(expense)
    }
    onCancel()
  }

  const onEdit = async (item, index) => {
    item.index = index
    const { rfcRec, total } = await readXmlFile(item.documents, 0)
    item = { ...item, rfcRec, total }
    setState({ ...state, isModalOpen: true, edit: item })
  }

  const onDelete = ({ id }) => {
    deleteInvoice && deleteInvoice(id)
  }

  const onComment = row => {
    setState({
      ...state,
      isModalCommentOpen: true,
      projectInvoice: {
        ...state.projectInvoice,
        id: row?.id,
        title: `del folio: ${row?.uuid.substring(0,8)}`
      }
    })
  }

  const onChangeRageDate = (value) => {
    const [first, end] = value || []
    const filter = Submission?.invoices?.filter(invoice => {
      return moment(invoice.issuedAt).isBetween(first?.format("YYYY-MM-DD"), end?.format("YYYY-MM-DD"))
    })

    if (!first || !end) {
      setState({ ...state, filterInvoice: false })
    } else {
      setState({ ...state, filterInvoice: filter })
    }
  }

  const onSearch = (value) => {
    const filter = Submission?.invoices?.filter(invoice => {
      const { uuid, issuer, receptor, rfc, amount, status } = invoice
      const nameConcept = getConcept(Submission?.concepts, invoice.concept)
      const nameMonth = moment(invoice.monthAt, "MMYYYY").format("MMMM")
      return `${uuid} ${issuer} ${receptor} ${rfc} ${amount} ${nameConcept} ${nameConcept} ${nameMonth} ${status}`
        .toLowerCase()
        .includes(value.toLowerCase())
    })

    if (!value) {
      setState({ ...state, filterInvoice: false })
    } else {
      setState({ ...state, filterInvoice: filter })
    }
  }

  const getStatus = async () => {
    setState({ ...state, loading: true })
    const result = await Promise.all(Submission?.invoices?.map(async element => {
      const { rfc, rfcRec, amount, uuid } = await readXmlFile(element?.documents, 0)
      const { data: { status }} = await axios.post('/api/cfdi', { rfc, rfcRec, total: amount, uuid })
      element.status = status || "No encontrado"
      return element
    }))
    setState({ loading: false, filterInvoice: result })
  }

  return (
    <>
      <Alert
        type="info"
        showIcon
        message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen, solo se admiten
        facturas emitidas a tu organizaci??n" />
      <SearchFieldPrimary style={{ marginTop: "1rem" }} onSearch={onSearch}/>
      <StatisticHeader statistics={dataStatistics} styles={{ padding: 0 }} />
      <Section style={{ padding: 0, margin: "1rem 0" }} title="Gastos">
        <Space>
          <DatePicker.RangePicker format="DD/MM/YYYY" onChange={onChangeRageDate} />
        </Space>
        <CompositeField
          isAddDisabled={state?.loading || readOnly}
          onClickAdd={onClickAdd}
          onChange={onChange}
          value={state.filterInvoice ? state.filterInvoice : Submission?.invoices}
          addLabel="Subir factura"
          orientation="TOP">
          {({ items, addNew, replaceItemAtIndex }) =>
            <>
              <ModalExpense
                visible={state.isModalOpen}
                submission={Submission}
                onSave={onSave(addNew, replaceItemAtIndex)}
                onCancel={onCancel}
                edit={state.edit}
                disabled={readOnly}
                update={update}
                className="fico expense-modal-form"/>
              <ListExpense
                dataSource={items}
                concepts={Submission?.concepts}
                onDelete={onDelete}
                onEdit={onEdit}
                onComment={onComment}
                getStatus={getStatus}
                readOnly={readOnly}
                loading={state?.loading}
              />
            </>
          }
        </CompositeField>
      </Section>
      {state.isModalCommentOpen && (
        <ModalCommentMonitoring
          readOnly={readOnly}
          visible={state.isModalCommentOpen}
          data={state.projectInvoice}
          onCancel={onCancel}/>
      )}
    </>
  )
}
