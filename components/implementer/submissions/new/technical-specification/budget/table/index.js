import { withForm } from "../../../../../../../helpers"
import { CompositeField } from "../../../../../../shared"
import { Empty, Row, Col } from "antd"
import { useState } from "react"
import { ConceptModal } from "./concept-modal"

function BudgetTable({data, onChange}) {
  const [state, setState] = useState({ isModalOpen: false })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false })
  }

  const onSave = (addNew) => (concept) => {
    addNew(concept)
  }

  return (
    <>
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={onChange}
        addLabel="Agregar concepto"
        defaultValue={data?.Submission?.concepts}>
        {({ items, addNew }) =>
          <>
            <ConceptModal
              visible={state.isModalOpen}
              submission={data?.Submission}
              onCancel={onCancel}
              onSave={onSave(addNew)} />
            {items.map(i =>
              <Row>
                <Col>{JSON.stringify(i)}</Col>
              </Row>
            )}
            {!items.length ?
              <Empty
                style={{marginBottom: "10px"}}
                description="Agrega todos los conceptos que
                serán utilizados durante el proyecto" />
            : null }
          </>
        }
      </CompositeField>
    </>
  )
}

export default withForm(BudgetTable)
