import { Card, Table } from "antd"
import { useContext, useState } from "react"
import { CompositeField } from "../../../../../../shared"
import { ObstaclesModal } from "./modal"
import moment from "moment"
import {
  AdminSubmissionContext
} from "../../../../../../../contexts/admin/submissions/show"

export function MonitoringObstacles({ data = {}, dateFilter }){
  const { updateSubmission } = useContext(AdminSubmissionContext)

  let obstacles = data?.Submission?.technicalUpdates
  if (dateFilter?.length > 0) {
    obstacles = obstacles.filter(obstacle =>
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
      const index = values.index
      delete values.index

      replaceItemAtIndex(index, values)
    }
    onCancel()
  }

  const onEdit = (data, index) => () => {
    data.index = index
    setState({ isModalOpen: true, edit: data })
  }

  const onChange = items => {
    updateSubmission({ technicalUpdates: items })
  }

  return (
    <Card className="obstacles">
      <CompositeField
        onChange={onChange}
        value={obstacles}
        onClickAdd={onClickAdd}
        orientation="TOP"
        addLabel="Agregar actividad">
        {({ items, addNew, replaceItemAtIndex }) =>
          <div>
            <ObstaclesModal
              onCancel={onCancel}
              onSave={onSave(addNew, replaceItemAtIndex)}
              visible={state.isModalOpen}
              edit={state.edit} />
            <Table dataSource={items} pagination={false}>
              <Table.Column
                render={(t, {createdAt}) =>
                  `Actualizado el ${moment(createdAt).format("DD/MM/YYYY")}`
                }
                title="Actualización" />
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
