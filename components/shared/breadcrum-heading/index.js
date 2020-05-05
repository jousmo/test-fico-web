import Link from "next/link"
import { Breadcrumb, Col, Row } from "antd"

export function BreadcrumbHeading({ extra, home, itemsList }) {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href={home.url}>
              <a>{home.label}</a>
            </Link>
          </Breadcrumb.Item>
          { itemsList?.map((item, index) =>
            <Breadcrumb.Item key={index}>
              <Link href={item.url}>
                <a>{item.label}</a>
              </Link>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </Col>
      {extra}
    </Row>
  )
}
