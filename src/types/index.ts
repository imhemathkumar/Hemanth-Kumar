import { LucideIcon } from "lucide-react"

export interface NavItem {
  id: string
  name: string
  href: string
  icon: LucideIcon
  isResume?: boolean
}