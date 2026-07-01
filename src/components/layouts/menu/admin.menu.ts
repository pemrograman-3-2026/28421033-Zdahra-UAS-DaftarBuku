import { BookOpenText, House, Layers } from "lucide-react";

export const adminMenu = [
  { to: "/admin", icon: House, label: "Dashboard" },
  { to: "/admin/genre", icon: Layers, label: "Genre" },
  { to: "/admin/buku", icon: BookOpenText, label: "Buku" },
];

export type IMenu = typeof adminMenu[0];