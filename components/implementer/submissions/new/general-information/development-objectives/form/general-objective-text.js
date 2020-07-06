import { Typography } from "antd"

export function GeneralObjectiveText() {
  return (
    <div style={{maxWidth: "400px", padding: "10px"}}>
      <Typography.Title level={4}>Objetivo General</Typography.Title>
      <Typography.Text>
        Identifica el resultado directo que se espera lograr en la población
        objetivo o área de enfoque, como consecuencia de la utilización de los
        componentes producidos o entregados por el programa o proyecto. Está
        relacionado directamente con la solución del problema y debe de ser
        congruente con la misión de la(s) implementadora. Debe considerar a
        quién va dirigida la acción, cómo o mediante qué se llevará a cabo y la
        ubicación o lugar del proyecto a desarrollarse. Responde a las
        preguntas: ¿Qué?, ¿cómo? y ¿para qué?
      </Typography.Text>
    </div>
  )
}
