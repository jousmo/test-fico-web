import "./style.sass"
import { Layout as ALayout } from "antd"
import { MainMenu } from "../main-menu"

export function Layout({children}) {
  return (
    <div>
      <ALayout>
        <ALayout.Sider>
          <MainMenu />
        </ALayout.Sider>
        <ALayout>
          <ALayout.Content>{children}</ALayout.Content>
        </ALayout>
      </ALayout>
    </div>
  )
}
