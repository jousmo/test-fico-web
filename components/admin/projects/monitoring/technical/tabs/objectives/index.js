import { SearchFieldPrimary } from "../../../../../../shared"
import { Alert } from "antd"
import { useState } from "react"
import { ObjectivesSummary } from "./summary"
import { ObjectivesList } from "./list"

export function MonitoringObjectives({ data }) {
  const { Submission } = data || {}

  const [completed, setCompleted] = useState({})

  return (
    <div className="objectives" style={{ marginTop: "-2.5rem"}}>
      <ObjectivesSummary data={Submission} completed={completed} />
      <SearchFieldPrimary style={{marginBottom: "1rem"}} />
      <Alert
        type="info"
        showIcon
        message="Selecciona las actividades que hayas realizado, espeficica
            cuántos participantes tuviste en cada una y cúantos beneficiarios
            atendiste de acuerdo a los objetivos específicos y generales" />
      <ObjectivesList
        data={Submission}
        setCompleted={setCompleted}
        completed={completed} />
    </div>
  )
}
