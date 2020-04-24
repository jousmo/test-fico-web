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

  const onConceptsChange = (concepts) => {
    console.log(concepts)
  }

  return (
    <>
      <ConceptModal
        visible={state.isModalOpen}
        submission={data?.Submission} />
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={onConceptsChange}
        addLabel="Agregar concepto">
        {({ items }) =>
          <>
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
