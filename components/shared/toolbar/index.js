import { PageHeader } from "antd"
import { MenuUnfoldOutlined } from "@ant-design/icons"
import { extra } from "./extra"
import { PageContext } from "../../../contexts/page"

function Toolbar() {
  return (
    <PageContext.Consumer>
      {({title, actions}) => 
        <div>
          <PageHeader
            backIcon={<MenuUnfoldOutlined />}
            extra={extra}>
            <PageHeader
              title={title}
              extra={actions} />
          </PageHeader>
        </div>
      }
    </PageContext.Consumer>
  )
}

Toolbar.contextType = PageContext

export { Toolbar }
