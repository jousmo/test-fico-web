import { Typography } from "antd"

export function SpecificObjectiveText() {
  return (
    <div style={{maxWidth: "400px", padding: "10px"}}>
      <Typography.Title level={4}>Objetivos Específicos</Typography.Title>
      <Typography.Text>
        Complementan la realización del objetivo general, mediante
        la determinación de actividades principales o temas de análisis
        inherentes a la consecución del objetivo general.  Enmarcan la población
        a atender. Identifican los bienes y servicios que serán producidos por
        el programa o proyecto para cumplir con el propósito.
      </Typography.Text>
    </div>
  )
}
