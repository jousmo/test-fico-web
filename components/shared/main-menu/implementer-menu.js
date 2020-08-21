import { Menu } from "antd"
import Link from "next/link"
import {
  EyeOutlined,
  InboxOutlined,
  UserOutlined
} from "@ant-design/icons"

export default function ImplementerMenu({ step, submenu }) {
  return (
    <Menu
      defaultSelectedKeys={[step]}
      defaultOpenKeys={[submenu]}
      theme="dark"
      className="fico main-menu"
      mode="inline">
      <Menu.SubMenu
        key="submissions"
        icon={<InboxOutlined />}
        title="Solicitudes">
        <Menu.Item key="submissions">
          <Link href="/implementer/submissions">
            <a>Todas las solicitudes</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ON_COUNCIL">
          <Link href="/implementer/submissions/status/on_council">
            <a>Consejo directivo</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ON_COMMITTEE">
          <Link href="/implementer/submissions/status/on_committee">
            <a>Comité técnico</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ON_AGREEMENT">
          <Link href="/implementer/submissions/status/on_agreement">
            <a>Convenio</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="REJECTED">
          <Link href="/implementer/submissions/status/rejected">
            <a>Rechazadas</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="projects"
        icon={<EyeOutlined />}
        title="Proyectos">
        <Menu.Item key="active">
          <Link href="/implementer/projects">
            <a>Activos</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ON_CLOSURE">
          <Link href="/implementer/projects/status/on_closure">
            <a>Concluidos</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="profile">
        <UserOutlined />
        <Link href="/implementer/profile">
          <a>Perfil de implementadora</a>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
