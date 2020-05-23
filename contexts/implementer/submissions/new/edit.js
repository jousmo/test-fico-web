import { PageActions } from "../../../../components/implementer/submissions"

export const editData = ({save, step = 0}) => {
  return {
    title: "Modificar solicitud",
    actions: <PageActions save={save} />,
    step
  }
}
