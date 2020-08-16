import { useState } from "react"
import { Alert, Col, Divider, Row, Statistic, Space, DatePicker } from "antd"
import { Section, SearchFieldPrimary, CompositeField, DateField } from "../../../../../../shared"
import { withForm } from "../../../../../../../helpers"
import { ListExpense } from "./list"
import { ModalExpense } from "./form"
import moment from "moment"

function Expense ({ data, save, update }) {
  const Submission = data || {}
  const [state, setState] = useState({ isModalOpen: false, edit: false, filterInvoice: Submission.invoices })

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
      setState({ ...state, filterInvoice: Submission?.invoices})
    } else {
      setState({ ...state, filterInvoice: filter})
    }
  }

  return (
    <div className="financial">
      <Alert
        type="info"
        showIcon
        message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen, solo se admiten
        facturas emitidas a tu organización" />
      <SearchFieldPrimary style={{marginTop: "1rem"}} />
      <Section style={{padding: 0, margin: "1rem 0"}}>
        <Row>
          <Col flex="auto">
            <Statistic title="Presupuesto a FICOSEC" value={`$${Submission?.budgeted?.toFixed(2)}`} />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic title="Comprobado a FICOSEC" value={`$${Submission?.evidenced?.toFixed(2)}`} />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic
              title="Diferencia" value={`$${Submission?.difference?.toFixed(2)}`}
              valueStyle={{ color: "#cf1322" }} />
          </Col>
        </Row>
      </Section>
      <Section style={{padding: 0, margin: "1rem 0"}} title="Gastos">
        <Space>
          <DatePicker.RangePicker onChange={onChangeRageDate} />
        </Space>
        <CompositeField
          onClickAdd={onClickAdd}
          onChange={onChange}
          addLabel="Subir factura"
          defaultValue={Submission?.invoices}
          value={state?.filterInvoice}
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
    </div>
  )
}

export default withForm(Expense)