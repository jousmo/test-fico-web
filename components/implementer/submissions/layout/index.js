import { Layout as ALayout } from "antd"
import { Toolbar } from "../../../shared"
import { Subheader } from "../subheader"

export function Layout({children}) {
  const subheader = ({title, actions}) => {
    return <Subheader title={title} actions={actions} />
  }

  return (
    <div className="fico layout submissions full-height">
      <ALayout className="full-height">
        <ALayout.Content>
          <Toolbar subheader={subheader} />
          <div className="full-height page-content">
            {children}
          </div>
        </ALayout.Content>
      </ALayout>
    </div>
  )
}
