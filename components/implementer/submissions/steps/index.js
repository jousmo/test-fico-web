import { Steps as ASteps } from "antd"

export function Steps({current = 0}) {
  return (
    <ASteps current={current}>
      <ASteps.Step
        key="general-information"
        title="Inf. General"
        status="wait" />
      <ASteps.Step
        key="technical-specs"
        title="Ficha T"
        status="wait" />
      <ASteps.Step
        key="budget"
        title="Presupuesto"
        status="wait" />
      <ASteps.Step
        key="timetable"
        title="Cronograma"
        status="wait" />
      <ASteps.Step
        key="human-resources"
        title="Recursos humanos"
        status="wait" />
    </ASteps>
  )
}
