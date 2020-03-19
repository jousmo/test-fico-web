import { Layout as ALayout } from "antd"
import { Steps } from "../steps"
import { Toolbar } from "../../../shared"

export function Layout({children}) {
  return (
    <div className="fico layout submissions full-height">
      <ALayout className="full-height">
        <ALayout.Content>
          <Toolbar subheader={<Steps />} />
          <div className="full-height">
            {children}
          </div>
        </ALayout.Content>
      </ALayout>
    </div>
  )
}
