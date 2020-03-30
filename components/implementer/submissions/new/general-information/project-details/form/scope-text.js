import { Typography } from "antd"

export function ScopeText() {
  return (
    <div style={{maxWidth: "400px", padding: "20px"}}>
      <Typography.Title level={4}>Psicosocial</Typography.Title>
      <Typography.Text>
        La prevención en el ámbito psicosocial tiene como
        objetivo incidir en las motivaciones individuales
        hacia la violencia o las condiciones criminógenas
        con referencia a los individuos, la familia,
        la escuela y la comunidad.
      </Typography.Text>
      <Typography.Title level={4}>Comunitario</Typography.Title>
      <Typography.Text>
        La prevención en el ámbito comunitario pretende
        atender los factores que generan violencia y
        delincuencia mediante la participación ciudadana
        y comunitaria.
      </Typography.Text>
      <Typography.Title level={4}>Social</Typography.Title>
      <Typography.Text>
        El ámbito social busca incidir en el desarrollo
        social, cultural y económico, con el objetivo de
        prevenir la violencia y delincuencia.
      </Typography.Text>
      <Typography.Title level={4}>Situacional</Typography.Title>
      <Typography.Text>
        La prevención en el ámbito situacional consiste en
        modificar el entorno para propiciar la convivencia
        y la cohesión social, así como disminuir los
        factores de riesgo que facilitan fenómenos de
        violencia y de incidencia delictiva.
      </Typography.Text>
    </div>
  )
}
