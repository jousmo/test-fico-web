import { useContext, useState } from "react"
import { Alert, Space, DatePicker } from "antd"
import { Section, SearchFieldPrimary, CompositeField, StatisticHeader } from "../../../../../../shared"
import { cellFormat } from "../../../../../../../helpers"
import { ListExpense } from "./list"
import { ModalExpense } from "./form"
import moment from "moment"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"

export function Expense () {
  const { data: { Submission }, save, update } = useContext(AdminSubmissionContext)
  const [state, setState] = useState({ isModalOpen: false, edit: false, filterInvoice: false })

  const dataStatistics = [
    { title: "Presupuesto a FICOSEC", value: cellFormat.money(Submission?.budgeted).children },
    { title: "Comprobado a FICOSEC", value: cellFormat.money(Submission?.evidenced).children },
    { title: "Diferencia", value: cellFormat.money(Submission?.difference).children, valueStyle:{ color: "#cf1322" }}
  ]

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, edit: false })
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

  const onEdit = (item, index) => {
    item.index = index
    setState({ ...state, isModalOpen: true, edit: item })
  }

  const onChangeRageDate = (value) => {
    const [first, end] = value || []
    const filter = Submission?.invoices?.filter(invoice => {
      return moment(invoice.issuedAt).isBetween(first?.format("YYYY-MM-DD"), end?.format("YYYY-MM-DD"))
    })

    if (!first || !end) {
      setState({ ...state, filterInvoice: false})
    } else {
      setState({ ...state, filterInvoice: filter})
    }
  }

  return (
    <>
      <Alert
        type="info"
        showIcon
        message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen, solo se admiten
        facturas emitidas a tu organización" />
      <SearchFieldPrimary style={{marginTop: "1rem"}} />
      <StatisticHeader statistics={dataStatistics} styles={{padding: 0}} />
      <Section style={{padding: 0, margin: "1rem 0"}} title="Gastos">
        <Space>
          <DatePicker.RangePicker onChange={onChangeRageDate} />
        </Space>
        <CompositeField
          onClickAdd={onClickAdd}
          onChange={onChange}
          value={state.filterInvoice ? state.filterInvoice : Submission?.invoices}
          addLabel="Subir factura"
          orientation="TOP">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <>
              <ModalExpense
                visible={state.isModalOpen}
                submission={Submission}
                onSave={onSave(addNew, replaceItemAtIndex)}
                onCancel={onCancel}
                edit={state.edit}
                className="fico expense-modal-form"/>
              <ListExpense
                dataSource={items}
                onEdit={onEdit}/>
            </>
          }
        </CompositeField>
      </Section>
    </>
  )
}