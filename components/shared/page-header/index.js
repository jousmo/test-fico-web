import { PageHeader as PageHeaderNative } from "antd"
import { useRouter } from "next/router"

export function PageHeader({ ghost = false, title }) {
  const router = useRouter()
  return (
    <PageHeaderNative
      ghost={ghost}
      onBack={() => router.back()}
      title={title} />
  )
}
