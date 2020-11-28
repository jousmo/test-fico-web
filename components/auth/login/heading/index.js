import { Typography } from "antd"

export function LoginHeading(){
  return (
    <>
      <img alt="logo" src="/assets/logo-fico.png" style={{ width: "250px" }} />
      <Typography.Paragraph>
        <Typography.Text strong>
          Fondo de financiamiento de proyectos para la prevención y fortalecimiento de instituciones
          de seguridad y justicia del empresariado chihuahuense.
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
          Bienvenido
        </Typography.Text>
      </Typography.Paragraph>
    </>
  )
}
