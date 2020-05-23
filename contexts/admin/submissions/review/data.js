import { PageActions } from "../../../../components/implementer/submissions"

export const data = ({save, step = 0}) => {
  return {
    title: "Revisar solicitud",
    actions: <PageActions save={save} />,
    step
  }
}
