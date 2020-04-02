import { PageActions } from "../../../../components/implementer/submissions"

export const data = ({save, step = 0}) => {
  return {
    title: "Nueva solicitud",
    actions: <PageActions save={save} />,
    step
  }
}
