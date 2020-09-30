import React from "react"
import { Space } from "antd"

export function IconLabel({ icon, children }) {
  return (
    <Space>
      {icon}
      {children}
    </Space>
  )
}
