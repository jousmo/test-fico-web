import { withForm } from "../../../../../../helpers"
import { List } from "antd"

function GovernmentList({ data }){
  const { councilMembers } = data?.implementer || {}

  return (
    <List>
      <ul>
        {councilMembers?.map(({ name, charge }) => (
          <List.Item>
            <li>{name} - {charge}</li>
          </List.Item>
        ))}
      </ul>
    </List>
  )
}

export default withForm(GovernmentList)
