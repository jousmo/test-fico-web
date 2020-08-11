import { SearchFieldPrimary } from "../../../../../../shared"
import { Alert } from "antd"
import { ObjectivesSummary } from "./summary"

export function MonitoringObjectives() {
  return (
    <div className="objectives" style={{ marginTop: "-2.5rem"}}>
      <ObjectivesSummary />
      <SearchFieldPrimary style={{marginBottom: "1rem"}} />
      <Alert
        type="info"
        showIcon
        message="Selecciona las actividades que hayas realizado, espeficica
            cuántos participantes tuviste en cada una y cúantos beneficiarios
            atendiste de acuerdo a los objetivos específicos y generales" />
    </div>
  )
}
