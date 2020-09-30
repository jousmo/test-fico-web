import { useContext } from "react"
import { SearchField, Section } from "../../shared"
import { AdminUserContext } from "../../../contexts/admin/users"
import UsersList from "./list"

export function Users() {
  const {
    loading,
    error,
    data
  } = useContext(AdminUserContext)

  return (
    <Section style={{padding: 0}}>
      <SearchField onSearch={null} />
      <UsersList
        data={data?.Accounts}
        error={error}
        isLoading={loading} />
    </Section>
  )
}
