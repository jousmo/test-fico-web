import { List } from "antd"
import { CompositeField } from "../../../shared"
import { UserItem } from "./item"
import { withForm } from "../../../../helpers/withForm"

function UsersList({ data: accounts }) {
  return (
    <CompositeField
      onClickAdd={null}
      onChange={null}
      value={accounts}
      addLabel="Invitar usuarios"
      orientation="TOP">
      {({ items, addNew, removeItem, replaceItemAtIndex }) =>
        <List
          renderItem={i => <UserItem user={i} />}
          itemLayout="vertical"
          dataSource={items}
          pagination={{pageSize: 10}} />
      }
    </CompositeField>
  )
}

export default withForm(UsersList)
