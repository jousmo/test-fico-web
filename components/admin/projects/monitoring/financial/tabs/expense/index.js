import { useState } from "react"
import { Alert, Col, Divider, Row, Statistic, DatePicker, Space } from "antd"
import { Section, SearchFieldPrimary, CompositeField } from "../../../../../../shared"
import { ListExpense } from "./list"
import { ModalExpense } from "./form"

export function Expense () {
  const [state, setState] = useState({
    isModalOpen: false,
    dataSource: []
  })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false })
  }

  const onChange = expense => {
    const newExpense = Array.from(expense)
    setState({ ...state, dataSource: newExpense })
  }

  const onSave = (addNew, replaceItemAtIndex) => expense => {
    if(expense.index !== undefined) {
      replaceItemAtIndex(expense.index, expense)
    } else {
      addNew(expense)
    }

    onCancel()
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
        <Space>
          <DatePicker.RangePicker />
        </Space>
        <CompositeField
          onClickAdd={onClickAdd}
          onChange={onChange}
          defaultValue={state.dataSource}
          addLabel="Subir factura"
          orientation="TOP">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <>
              <ModalExpense
                className="fico expense-modal-form"
                visible={state.isModalOpen}
                onSave={onSave(addNew, replaceItemAtIndex)}
                onCancel={onCancel} />
              <ListExpense dataSource={items} />
            </>
          }
        </CompositeField>
      </Section>
    </div>
  )
}