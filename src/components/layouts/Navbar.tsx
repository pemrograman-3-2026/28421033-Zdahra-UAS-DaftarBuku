'use client'

import { useRouter } from "next/navigation";
import { logoutAction } from "./logout";

export default function Navbar(
  { 
    onToggleSidebar, 
    onToggleCollapse
  } : {
    onToggleSidebar: () => void,
    onToggleCollapse: () => void,
  }
) {

  const router = useRouter();

  const logout = () => {
    logoutAction()
    router.push('/')
  }

  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3">
      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-secondary d-md-none"
          onClick={onToggleSidebar}
        >
          ☰
        </button>
        <button
          className="btn btn-sm btn-outline-secondary d-none d-md-inline-flex"
          onClick={onToggleCollapse}
        >
          ☰
        </button>
        <span className="text-muted small fw-semibold">Admin</span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}