import { Layout as ALayout } from "antd"
import { Toolbar } from "../../../shared"
import { Subheader } from "../subheader"

export function Layout({children}) {
  const subheader = ({title, actions, step}) => {
    return <Subheader
      title={title}
      actions={actions}
      step={step} />
  }

  return (
    <div className="fico layout submissions full-height">
      <ALayout>
        <ALayout.Content>
          <Toolbar subheader={subheader} />
          <div className="page-content">
            {children}
          </div>
        </ALayout.Content>
      </ALayout>
    </div>
  )
}
