import { Layout as ALayout } from "antd"
import { MainMenu } from "../main-menu"
import { Toolbar } from "../toolbar"

export function Layout({children, subheader}) {
  return (
    <div className="fico layout">
      <ALayout>
        <ALayout.Sider>
          <MainMenu />
        </ALayout.Sider>
        <ALayout className="content">
          <ALayout.Header><Toolbar subheader={subheader} /></ALayout.Header>
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
