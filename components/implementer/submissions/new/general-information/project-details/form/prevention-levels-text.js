import { Typography } from "antd"

export function PreventionLevelsText() {
  return (
    <div style={{maxWidth: "400px", padding: "20px"}}>
      <Typography.Title level={4}>Primaria</Typography.Title>
      <Typography.Text>
        Aplica a toda la comunidad;
        orientadas a la raíz del problema
        para neutralizar las causas de la
        delincuencia, antes de que el problema
        se manifieste, reclama prestaciones
        sociales y no una disuasión.
        Prevención a largo plazo.
      </Typography.Text>
      <Typography.Title level={4}>Secundaria</Typography.Title>
      <Typography.Text>
        Actuaciones realizadas con grupos concretos
        encaminados específicamente a prevenir el delito
        y reforzar la seguridad ciudadana. Opera a
        mediano plazo.
      </Typography.Text>
      <Typography.Title level={4}>Terciaria</Typography.Title>
      <Typography.Text>
        Comportamiento de riesgo evidentes, es posterior a
        la comisión del delito y tiene como objetivo evitar
        la reincidencia, orientado al cambio de actitudes,
        así como a las Víctimas con ayuda en resiliencia.
        Operan a corto plazo.
      </Typography.Text>
    </div>
  )
}
