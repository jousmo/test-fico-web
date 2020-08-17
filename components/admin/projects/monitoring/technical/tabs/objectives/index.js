import { SearchFieldPrimary } from "../../../../../../shared"
import { Alert } from "antd"
import { ObjectivesSummary } from "./summary"
import { ObjectivesList } from "./list"

export function MonitoringObjectives({ data, dateFilter }) {
  const { Submission } = data || {}

  return (
    <div className="objectives" style={{ marginTop: "-2.5rem"}}>
      <ObjectivesSummary data={Submission} />
      <SearchFieldPrimary style={{marginBottom: "1rem"}} />
      <Alert
        type="info"
        showIcon
        message="Especifica cuántos participantes fueron atendidos y adjunta la
        evidencia necesaria en cada objetivo y actividad" />
      <ObjectivesList
        dateFilter={dateFilter}
        data={Submission} />
    </div>
  )
}
