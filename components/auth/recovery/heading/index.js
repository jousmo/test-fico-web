import { Typography } from "antd"
import Link from "next/link"

export function RecoverHeading(){
  return (
    <>
      <Link href="/">
        <img
          className="logo"
          alt="logo"
          src="/assets/logo-fico.png" />
      </Link>
      <Typography.Paragraph>
        <Typography.Text strong>
          Recuperar contraseña
        </Typography.Text>
      </Typography.Paragraph>
    </>
  )
}
