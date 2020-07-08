import { Menu } from "antd"
import Link from "next/link"
import {
  EyeOutlined,
  InboxOutlined,
  TeamOutlined
} from "@ant-design/icons"

export default function AdminMenu({ step, submenu }) {
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
          <Link href="/admin/submissions">
            <a>Todas las solicitudes</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="directive_council">
          <Link href="/admin/submissions/status/">
            <a>Consejo directivo</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="technical_committee">
          <Link href="/admin/submissions/status/">
            <a>Comité técnico</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="on_agreement">
          <Link href="/admin/submissions/status/on_agreement">
            <a>Convenio</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="rejected">
          <Link href="/admin/submissions/status/rejected">
            <a>Rechazadas</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu
        key="projects"
        icon={<EyeOutlined />}
        title="Monitoreo de proyectos">
        <Menu.Item key="active">
          <Link href="/admin/projects">
            <a>Activos</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="on_closure">
          <Link href="/admin/projects/status/on_closure">
            <a>Concluidos</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="users">
        <TeamOutlined />
        <Link href="/admin/users">
          <a>Usuarios</a>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
