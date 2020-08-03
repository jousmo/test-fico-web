import { withForm } from "../../../../../../helpers"
import { List } from "antd"
import {
  getReadableValue,
  implementer
} from "../../../../../../helpers/selectOptions"

function GovernmentList({ data }){
  const { councilMembers } = data?.implementer || {}
  const {
    profile: { chargeTypes }
  } = implementer

  return (
    <List>
      <ul>
        {councilMembers?.map(({ name, charge }) => (
          <List.Item>
            <li>{name} - {getReadableValue(chargeTypes, charge)}</li>
          </List.Item>
        ))}
      </ul>
    </List>
  )
}

export default withForm(GovernmentList)
