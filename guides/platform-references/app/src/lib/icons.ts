import {
  BookMarkedIcon,
  BotIcon,
  Building2Icon,
  CloudIcon,
  CodeIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  LayersIcon,
  NetworkIcon,
  PackageIcon,
  RocketIcon,
  SearchIcon,
  ShieldCheckIcon,
  SquareKanbanIcon,
  TerminalIcon,
  WorkflowIcon,
  type LucideIcon,
} from "lucide-react"

import type { Item } from "@/lib/catalog"

const icons: Record<string, LucideIcon> = {
  ai: BotIcon,
  code: CodeIcon,
  plan: SquareKanbanIcon,
  review: GitPullRequestIcon,
  ship: RocketIcon,
  security: ShieldCheckIcon,
  enterprise: Building2Icon,
  ecosystem: NetworkIcon,
  terminal: TerminalIcon,
  cloud: CloudIcon,
  repo: BookMarkedIcon,
  box: PackageIcon,
  search: SearchIcon,
  merge: GitMergeIcon,
  workflow: WorkflowIcon,
  layers: LayersIcon,
}

export const iconFor = (name: string) => icons[name] ?? LayersIcon
export const itemIcon = (item: Item) => iconFor(item.icon ?? item.group.icon)
