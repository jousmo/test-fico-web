import { DeleteButton } from "../../components/shared"

export const deleteAction = (onDelete) => (text, record, index) => {
  return {
    children: <DeleteButton onClick={() => onDelete(index)} />
  }
}
