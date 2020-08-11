import { Alert, Col, Divider, Form, Row, Statistic } from "antd"
import { SearchFieldPrimary } from "../../../../../shared/search-field-primary"
import { Section } from "../../../../../shared/section"
import { ExpenseTable } from "./expenseTable"
import { CompositeField } from "../../../../../shared/composite-field"
import { ExpenseModal } from "./form/expenseModal"
import { useState } from "react"

export function Expense () {
  const [state, setState] = useState({
    isModalOpen: false
  })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
  }

  return (
    <div className="financial">
      <Alert
        type="info"
        showIcon
        message="Adjunta tu conjunto de facturas y selecciona el concepto al que pertenecen,
                     solo se admiten facturas emitidas a tu organización" />
      <SearchFieldPrimary style={{marginTop: "1rem"}} />
      <Section style={{padding: 0, margin: "1rem 0"}}>
        <Row>
          <Col flex="auto">
            <Statistic title="Presupuesto a FICOSEC" value="$189,436.00" />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic title="Comprobado a FICOSEC" value="$456.00" />
          </Col>
          <Col span={1}>
            <Divider type="vertical" />
          </Col>
          <Col flex="auto">
            <Statistic
              title="Diferencia" value="$188,980.00"
              valueStyle={{ color: "#cf1322" }} />
          </Col>
        </Row>
      </Section>
      <Section style={{padding: 0, margin: "1rem 0"}} title="Gastos">
        <CompositeField
          onClickAdd={onClickAdd}
          addLabel="Subir factura">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <div>
              <ExpenseModal
                className="fico expense-modal-form"
                visible={state.isModalOpen}
                onCancel={onCancel} />
            </div>
          }
        </CompositeField>
        <ExpenseTable />
      </Section>
    </div>
  )
}