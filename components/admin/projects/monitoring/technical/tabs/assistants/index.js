import { Card } from "antd"
import { CompositeField } from "../../../../../../shared"
import { ListAssistants } from "./list"
import { decoratedData } from "./list/helper"

export function MonitoringAssistants({ data, dateFilter }) {
  const { Submission } = data || {}

  const dataSource = decoratedData(Submission?.assistants)

  return (
    <Card>
      <CompositeField
        onClickAdd={null}
        onChange={null}
        addLabel="Subir factura"
        orientation="TOP">
        {({ items, addNew, removeItem, replaceItemAtIndex }) =>
          <>
            <ListAssistants dataSource={dataSource} />
          </>
        }
      </CompositeField>
    </Card>
  )
}
