export const ENTRY_TYPES = ["Product", "Feature", "Tool", "Service", "Program"] as const
export type EntryType = (typeof ENTRY_TYPES)[number]

export type Entry = {
  id: string
  name: string
  type: EntryType
  description: string
  tags: string[]
  url: string
  icon?: string
  featured?: boolean
  status?: string
  universe?: { note: string; url: string }
}

export type Group = {
  id: string
  name: string
  subtitle: string
  color: string
  icon: string
  items: Entry[]
}

export type LandscapeId = "github" | "azure"
export type LandscapeCatalog = {
  name: string
  title: string
  description: string
  docsLabel: string
  docsUrl: string
  groups: Group[]
}
export type Catalog = {
  asOf: string
  landscapes: Record<LandscapeId, LandscapeCatalog>
}
export type Item = Entry & { group: Group }

export type Filters = {
  query: string
  category: string
  type: string
  universe: boolean
}

// Injected into index.html at build time so the extension and checks can read it without running the app.
export const catalog: Catalog = JSON.parse(
  document.getElementById("catalog")!.textContent!
)

export const landscapes = catalog.landscapes

export function itemsFor(landscape: LandscapeCatalog): Item[] {
  return landscape.groups.flatMap((group) =>
    group.items.map((entry) => ({ ...entry, group }))
  )
}

export const snapshot = new Date(catalog.asOf + "T12:00:00Z").toLocaleDateString(
  "en-GB",
  { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }
)

// ponytail: a fixed, small public catalog needs only a linear search, not an index or backend.
export function matches(item: Item, filters: Filters) {
  const haystack = [
    item.name,
    item.description,
    item.type,
    item.status ?? "",
    item.group.name,
    item.universe ? "universe new " + item.universe.note : "",
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase()
  return (
    (!filters.category || item.group.id === filters.category) &&
    (!filters.type || item.type === filters.type) &&
    (!filters.universe || Boolean(item.universe)) &&
    filters.query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .every((term) => haystack.includes(term))
  )
}

export function readHash(): Filters & {
  landscape: LandscapeId
  view: "treemap" | "landscape"
} {
  const params = new URLSearchParams(location.hash.slice(1))
  const landscape: LandscapeId =
    params.get("landscape") === "azure" ? "azure" : "github"
  const category = params.get("category") ?? ""
  const type = params.get("type") ?? ""
  return {
    landscape,
    view: params.get("view") === "landscape" ? "landscape" : "treemap",
    query: params.get("q") ?? "",
    category: landscapes[landscape].groups.some((group) => group.id === category)
      ? category
      : "",
    type: (ENTRY_TYPES as readonly string[]).includes(type) ? type : "",
    universe: landscape === "github" && params.get("new") === "1",
  }
}

export function writeHash(
  state: Filters & { landscape: LandscapeId; view: string }
) {
  const params = new URLSearchParams()
  if (state.landscape !== "github") params.set("landscape", state.landscape)
  if (state.view !== "treemap") params.set("view", state.view)
  if (state.query) params.set("q", state.query)
  if (state.category) params.set("category", state.category)
  if (state.type) params.set("type", state.type)
  if (state.universe) params.set("new", "1")
  history.replaceState(
    null,
    "",
    location.pathname + location.search + (params.size ? "#" + params : "")
  )
}
