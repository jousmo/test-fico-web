import { withForm, cellFormat } from "../../../../../../../helpers"
import { CompositeField, ScrollableView } from "../../../../../../shared"
import { Empty, Table } from "antd"
import { useState } from "react"
import { ConceptModal } from "./concept-modal"
import { conceptTypes } from "../../../../../../../helpers/selectOptions/implementer/submission"
import { renderInvestment, renderTotal, renderSummary } from "./helpers"
import { CommentButton } from "../../../../../../admin/submissions/review"
import { useAuth } from "../../../../../../../contexts/auth"
import * as _ from "lodash"

function BudgetForm({ data, onChange, hiddenComments, review }) {
  const { user } = useAuth()
  const [state, setState] = useState({ isModalOpen: false, edit: false })
  const { Submission } = data || {}
  const cleanData = concept => _.omit(concept, ['index', 'budgeted'])

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, edit: false })
  }

  const onSave = (addNew, replaceItemAtIndex) => (concept) => {
    if(concept.index !== undefined) {
      const index = concept.index
      const cleanConcept = cleanData(concept)
      replaceItemAtIndex(index, cleanConcept)
    } else {
      addNew(concept)
    }

    onCancel()
  }

  const onEdit = (item, index) => {
    item.index = index
    setState({ ...state, isModalOpen: true, edit: item })
  }

  const readOnly = data?.Submission?.state === "PROJECT" ||
    (user?.claims?.role === "IMPLEMENTER" && data?.Submission?.status.includes("REVIEW"))

  return (
    <>
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={onChange}
        addLabel="Agregar concepto"
        isAddDisabled={readOnly}
        value={Submission?.concepts}>
        {({ items, addNew, removeItem, replaceItemAtIndex }) =>
          <>
            {state.isModalOpen &&
              <ConceptModal
                visible={state.isModalOpen}
                submission={Submission}
                onCancel={onCancel}
                onSave={onSave(addNew, replaceItemAtIndex)}
                readOnly={readOnly}
                review={readOnly}
                edit={state.edit} />
            }
            <ScrollableView contentWidth="1600px">
              <Table
                dataSource={items}
                pagination={false}
                locale={{emptyText: <Empty description="Agrega todos los conceptos
                que serán utilizados durante el proyecto" />}}
                rowKey={(r, i) => i}
                summary={concepts => renderSummary(concepts, data?.Submission)}>
                <Table.Column
                  key="comments"
                  render={(text, row, index) => (
                    !hiddenComments &&
                      <CommentButton
                        index={index}
                        name={`concept_${index}`}
                        section="BUDGET"
                        small />
                  )
                  }/>
                <Table.Column
                  title="Concepto"
                  key="name"
                  dataIndex="name"
                  render={cellFormat.actions(onEdit, removeItem, readOnly)} />
                <Table.Column
                  title="Región"
                  key="region"
                  dataIndex="region" />
                <Table.Column
                  title="Tipo de gasto"
                  key="type"
                  dataIndex="type"
                  render={cellFormat.options(conceptTypes)} />
                <Table.Column
                  title="Costo unitario"
                  key="unitCost"
                  dataIndex="unitCost"
                  render={cellFormat.money} />
                <Table.Column
                  title="Unidad de medida"
                  key="measurementUnit"
                  dataIndex="measurementUnit" />
                <Table.Column
                  title="Total"
                  key="total"
                  dataIndex="name"
                  render={renderTotal} />
                <Table.Column
                  title="Implementadora"
                  key="implementer"
                  dataIndex="name"
                  render={renderInvestment("Implementadora")} />
                <Table.Column
                  title="FICOSEC"
                  key="ficosec"
                  dataIndex="name"
                  render={renderInvestment("FICOSEC")} />
                {Submission?.allies?.length > 0 && (
                  <Table.Column
                    title={Submission?.allies[0]}
                    key="firstAlly"
                    dataIndex="name"
                    render={renderInvestment(Submission?.allies[0])} />
                )}
                {Submission?.allies?.length > 1 && (
                  <Table.Column
                    title={Submission?.allies[1]}
                    key="secondAlly"
                    dataIndex="name"
                    render={renderInvestment(Submission?.allies[1])} />
                )}
                <Table.Column
                  title="Unidades"
                  key="totalUnits"
                  dataIndex="totalUnits" />
              </Table>
            </ScrollableView>
          </>
        }
      </CompositeField>
    </>
  )
}

export default withForm(BudgetForm)
