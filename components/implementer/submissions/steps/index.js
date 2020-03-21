import { Steps as ASteps } from "antd"

export function Steps() {
  return (
    <ASteps current={0}>
      <ASteps.Step key="general-information" title="Inf. General" />
      <ASteps.Step key="technical-specs" title="Ficha T" />
      <ASteps.Step key="budget" title="Presupuesto" />
      <ASteps.Step key="timetable" title="Cronograma" />
      <ASteps.Step key="human-resources" title="Recursos humanos" />
    </ASteps>
  )
}
