import { List } from "antd"
import { useContext } from "react"
import { SearchField, Section } from "../../../shared"
import { AdminUserContext } from "../../../../contexts/admin/users"
import { UserItem } from "./item"

export function UsersList() {
  const {
    loading,
    error,
    data
  } = useContext(AdminUserContext)

  console.log(data?.Accounts)
  return (
    <Section style={{padding: 0}}>
      <SearchField onSearch={null} />
      <List
        renderItem={i => <UserItem user={i} />}
        itemLayout="vertical"
        dataSource={data?.Accounts}
        pagination={{pageSize: 10}}
        loading={loading}/>
    </Section>
  )
}
