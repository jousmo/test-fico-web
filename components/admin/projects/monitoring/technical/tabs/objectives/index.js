import { ObjectivesSummary } from "./summary"
import { ObjectivesList } from "./list"

export function MonitoringObjectives({ data, dateFilter }) {
  const { Submission } = data || {}

  return (
    <div className="objectives" style={{ marginTop: "-2.5rem"}}>
      <ObjectivesSummary data={Submission} />
      <ObjectivesList
        dateFilter={dateFilter}
        data={Submission} />
    </div>
  )
}
