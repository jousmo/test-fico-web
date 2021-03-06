import { Card, Table } from "antd"
import { useContext, useState } from "react"
import { CompositeField } from "../../../../../../shared"
import { ObstaclesModal } from "./modal"
import { omit } from "lodash"
import moment from "moment"
import {
  AdminSubmissionContext
} from "../../../../../../../contexts/admin/submissions/show"

export function MonitoringObstacles({ data = {}, dateFilter }){
  const { readOnly, updateSubmission } = useContext(AdminSubmissionContext)

  let obstacles = data?.Submission?.technicalUpdates
  if (dateFilter?.length > 0) {
    obstacles = obstacles?.filter(obstacle =>
      moment(obstacle.createdAt).isBetween(dateFilter[0], dateFilter[1])
    )
  }

  const [state, setState] = useState({
    isModalOpen: false,
    edit: undefined
  })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  const onSave = (addNew, replaceItemAtIndex) => values => {
    if(typeof values.index === "undefined") {
      addNew(values)
    }
    else {
      replaceItemAtIndex(values.index, values)
    }
    onCancel()
  }

  const onEdit = (data, index) => () => {
    setState({ isModalOpen: true, edit: { ...data, index } })
  }

  const onChange = items => {
    const technicalUpdates = Array.from(items).map(item => omit(item, ['index', 'createdAt']))
    updateSubmission({ technicalUpdates })
  }

  return (
    <Card className="obstacles">
      <CompositeField
        onChange={onChange}
        value={obstacles}
        isAddDisabled={readOnly}
        onClickAdd={onClickAdd}
        orientation="TOP"
        addLabel="Agregar actividad">
        {({ items, addNew, replaceItemAtIndex }) =>
          <div>
            <ObstaclesModal
              onCancel={onCancel}
              onSave={onSave(addNew, replaceItemAtIndex)}
              readOnly={readOnly}
              visible={state.isModalOpen}
              edit={state.edit} />
            <Table dataSource={items} pagination={false} rowKey={el => el.id}>
              <Table.Column
                render={(t, {createdAt}) =>
                  `Actualizado el ${moment(createdAt).format("DD/MM/YYYY")}`
                }
                title="Actualizaci??n" />
              <Table.Column
                render={(t, row, index) =>
                  <a href="#" onClick={onEdit(row, index)}>Editar</a>
                }
                width={2} />
            </Table>
          </div>
        }
      </CompositeField>
    </Card>
  )
}
