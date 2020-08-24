import { List, Typography } from "antd"

export function ListItem({ label, value }){
  return (
    <List.Item>
      <Typography.Text>{label}</Typography.Text>
      <Typography.Text>{value}</Typography.Text>
    </List.Item>
  )
}
