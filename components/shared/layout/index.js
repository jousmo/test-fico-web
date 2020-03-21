import { Layout as ALayout } from "antd"
import { MainMenu } from "../main-menu"
import { Toolbar } from "../toolbar"

export function Layout({children}) {
  return (
    <div className="fico layout full-height">
      <ALayout className="full-height">
        <ALayout.Sider>
          <MainMenu />
        </ALayout.Sider>
        <ALayout>
          <ALayout.Header><Toolbar /></ALayout.Header>
          <ALayout.Content>
            <div className="full-height page-content">
              {children}
            </div>
          </ALayout.Content>
        </ALayout>
      </ALayout>
    </div>
  )
}
