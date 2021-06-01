import { Menu } from "antd"
import Link from "next/link"
import { useAuth } from "../../../contexts/auth"
import { Visibility } from "../visibility"
import {
  EyeOutlined,
  InboxOutlined,
  TeamOutlined
} from "@ant-design/icons"

export default function AdminMenu({ step, submenu }) {
  const { user } = useAuth() || {}
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
        <Menu.Item key="ON_COUNCIL">
          <Link href="/admin/submissions/status/on_council">
            <a>Consejo directivo</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ON_COMMITTEE">
          <Link href="/admin/submissions/status/on_committee">
            <a>Comité técnico</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ON_AGREEMENT">
          <Link href="/admin/submissions/status/on_agreement">
            <a>Convenio</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="REJECTED">
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
        <Menu.Item key="ON_CLOSURE">
          <Link href="/admin/projects/status/on_closure">
            <a>Concluidos</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Visibility visible={user?.claims?.role === "ADMIN"}>
        <Menu.Item key="users">
          <TeamOutlined />
          <Link href="/admin/users">
            <a>Usuarios</a>
          </Link>
        </Menu.Item>
      </Visibility>
      <Menu.Item key="census">
        <TeamOutlined />
        <Link href="/admin/census">
          <a>Padrón de beneficiarios</a>
        </Link>
      </Menu.Item>
    </Menu>
  )
}
