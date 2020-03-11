import { PageActions } from "../../../components/implementer/profile";


export const data = ({save}) => {
  return {
    title: "Perfil de la implementadora",
    actions: <PageActions save={save} />
  }
}
