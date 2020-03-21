import { PageActions } from "../../../../components/implementer/submissions"

export const data = ({save}) => {
  return {
    title: "Nueva solicitud",
    actions: <PageActions save={save} />
  }
}
