import React from "react"
import { Avatar as AntAvatar } from "antd"
import ColorHash from "color-hash"
import { UserOutlined } from "@ant-design/icons"

const urlPatterns = {
  url: /(?:(http|https|).\/\/)|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9].*/gi
}

export function Avatar({
  children,
  size = "default",
  src: imageSource,
  color = "#CCCCCC",
  ...props
}) {
  let src

  if(typeof children === "string") {
    if(urlPatterns.url.test(children.toString())) {
      src = children
      children = undefined
    } else {
      const colorHash = new ColorHash()
      color = colorHash.hex(children)
      children = children
        .split(" ")
        .slice(0, 2)
        .map(s => s[0])
        .join("")
        .toUpperCase()
    }
  }

  return (
    <AntAvatar
      size={size}
      style={{ backgroundColor: color }}
      src={imageSource || src}
      className={children ? null : "placeholder"}
      {...props}>
      { children || <UserOutlined /> }
    </AntAvatar>
  )
}
