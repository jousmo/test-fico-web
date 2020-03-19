import { Layout as ALayout } from "antd"
import { Toolbar } from "../../../shared"
import { Subheader } from "../subheader"

export function Layout({children}) {
  return (
    <div className="fico layout submissions full-height">
      <ALayout className="full-height">
        <ALayout.Content>
          <Toolbar subheader={<Subheader />} />
          <div className="full-height">
            {children}
          </div>
        </ALayout.Content>
      </ALayout>
    </div>
  )
}
