import { PageHeader as PageHeaderNative } from 'antd'

export function PageHeader({ ghost = false, title, onBack = () => null }) {
  return (
    <PageHeaderNative
      ghost={ghost}
      onBack={onBack}
      title={title} />
  )
}