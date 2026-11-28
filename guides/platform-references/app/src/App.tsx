import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import {
  BookOpenIcon,
  DownloadIcon,
  LayoutGridIcon,
  MoonIcon,
  SearchIcon,
  SearchXIcon,
  SparklesIcon,
  SquareDashedIcon,
  SunIcon,
  XIcon,
} from "lucide-react"

import { ItemSheet } from "@/components/item-sheet"
import { LandscapeGrid } from "@/components/landscape-grid"
import { useTheme } from "@/components/theme-provider"
import { Treemap } from "@/components/treemap"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ENTRY_TYPES,
  itemsFor,
  landscapes,
  matches,
  readHash,
  snapshot,
  writeHash,
  type Group,
  type Item,
  type LandscapeId,
} from "@/lib/catalog"
import { iconFor } from "@/lib/icons"

const typeItems = [
  { label: "All types", value: null },
  ...ENTRY_TYPES.map((type) => ({ label: type, value: type })),
]
// Below this area per tile, labels stop being legible, so the map scrolls.
const MIN_TILE_AREA = 4200

function useSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: Math.floor(entry.contentRect.width),
        height: Math.floor(entry.contentRect.height),
      })
    )
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [])
  return [ref, size] as const
}
function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="size-5 fill-current">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  )
}

export function App() {
  const initial = useMemo(readHash, [])
  const [landscapeId, setLandscapeId] = useState(initial.landscape)
  const [view, setView] = useState(initial.view)
  const [query, setQuery] = useState(initial.query)
  const [category, setCategory] = useState(initial.category)
  const [type, setType] = useState(initial.type)
  const [universe, setUniverse] = useState(initial.universe)
  const [selected, setSelected] = useState<Item | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const search = useRef<HTMLInputElement>(null)
  const [stage, size] = useSize()
  const { theme, setTheme } = useTheme()

  const activeCatalog = landscapes[landscapeId]
  const items = useMemo(() => itemsFor(activeCatalog), [activeCatalog])
  const isGitHub = landscapeId === "github"
  const universeCount = isGitHub
    ? items.filter((item) => item.universe).length
    : 0
  const filters = { query, category, type, universe }
  const visible = items.filter((item) => matches(item, filters))
  const counts = Object.fromEntries(
    activeCatalog.groups.map((group) => [
      group.id,
      items.filter(
        (item) =>
          item.group === group && matches(item, { ...filters, category: "" })
      ).length,
    ])
  )
  const filtered = Boolean(query || category || type || universe)
  const dark =
    theme === "dark" ||
    (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches)
  const downloadable = location.protocol !== "file:"
  const mapHeight = Math.max(
    size.height,
    Math.ceil((visible.length * MIN_TILE_AREA) / Math.max(size.width, 1))
  )
  const categoryItems = [
    { label: "All categories", value: null },
    ...activeCatalog.groups.map((group) => ({
      label: group.name,
      value: group.id,
    })),
  ]

  useEffect(() => {
    writeHash({ landscape: landscapeId, view, query, category, type, universe })
  }, [landscapeId, view, query, category, type, universe])

  useEffect(() => {
    const onHash = () => {
      const next = readHash()
      setLandscapeId(next.landscape)
      setView(next.view)
      setQuery(next.query)
      setCategory(next.category)
      setType(next.type)
      setUniverse(next.universe)
      setSelected(null)
      setSheetOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !target.closest("input, textarea, select, [contenteditable='true']")
      ) {
        event.preventDefault()
        search.current?.focus()
      }
    }
    addEventListener("hashchange", onHash)
    addEventListener("keydown", onKey)
    return () => {
      removeEventListener("hashchange", onHash)
      removeEventListener("keydown", onKey)
    }
  }, [])

  const open = (item: Item) => {
    setSelected(item)
    setSheetOpen(true)
  }
  const zoom = useCallback(
    (group: Group | null) => setCategory(group?.id ?? ""),
    []
  )
  const clear = () => {
    setQuery("")
    setCategory("")
    setType("")
    setUniverse(false)
  }
  const changeLandscape = (value: string) => {
    if (value !== "github" && value !== "azure") return
    setLandscapeId(value as LandscapeId)
    clear()
    setSelected(null)
    setSheetOpen(false)
  }

  return (
    <div className="flex h-svh flex-col overflow-hidden">
      <header className="z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-3 sm:gap-3 sm:px-4">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault()
            clear()
          }}
          aria-label={`${activeCatalog.name} landscape`}
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight"
        >
          {isGitHub ? (
            <GitHubMark />
          ) : (
            <SparklesIcon aria-hidden className="size-5 text-[#0078d4]" />
          )}
          <h1 className="max-sm:sr-only">{activeCatalog.name} landscape</h1>
        </a>
        <ToggleGroup
          aria-label="Landscape"
          variant="outline"
          size="sm"
          spacing={0}
          value={[landscapeId]}
          onValueChange={(value) => value[0] && changeLandscape(value[0])}
        >
          <ToggleGroupItem value="github" aria-label="GitHub landscape">
            GitHub
          </ToggleGroupItem>
          <ToggleGroupItem value="azure" aria-label="Azure AI landscape">
            Azure AI
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          aria-label="View"
          variant="outline"
          size="sm"
          spacing={0}
          value={[view]}
          onValueChange={(value) =>
            value[0] && setView(value[0] as typeof view)
          }
          className="ml-auto sm:ml-0"
        >
          <ToggleGroupItem value="treemap" aria-label="Treemap view">
            <SquareDashedIcon data-icon="inline-start" />
            <span className="max-sm:sr-only">Treemap</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="landscape" aria-label="Landscape view">
            <LayoutGridIcon data-icon="inline-start" />
            <span className="max-sm:sr-only">Landscape</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center gap-1 sm:ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className="max-md:hidden"
            render={
              <a
                href={activeCatalog.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
          >
            <BookOpenIcon data-icon="inline-start" />
            {activeCatalog.docsLabel}
          </Button>
          {downloadable && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Download as one HTML file"
                    render={
                      <a
                        id="download"
                        href={location.href.split("#")[0]}
                        download="github-azure-ai-landscapes.html"
                      />
                    }
                    nativeButton={false}
                  />
                }
              >
                <DownloadIcon />
              </TooltipTrigger>
              <TooltipContent>
                Download both landscapes as one HTML file
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={dark ? "Use light theme" : "Use dark theme"}
                  onClick={() => setTheme(dark ? "light" : "dark")}
                />
              }
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </TooltipTrigger>
            <TooltipContent>
              {dark ? "Light theme" : "Dark theme"} <Kbd>D</Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="flex shrink-0 flex-wrap items-center gap-2 border-b p-3 lg:w-66 lg:flex-col lg:flex-nowrap lg:items-stretch lg:gap-4 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:p-4">
          <InputGroup className="max-lg:w-auto max-lg:min-w-48 max-lg:flex-1">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={search}
              id="search"
              type="search"
              placeholder="Search products, features, tags"
              aria-label="Search the landscape"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) =>
                event.key === "Escape" && (setQuery(""), search.current?.blur())
              }
            />
            <InputGroupAddon align="inline-end">
              {query ? (
                <InputGroupButton
                  size="icon-xs"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <XIcon />
                </InputGroupButton>
              ) : (
                <Kbd>/</Kbd>
              )}
            </InputGroupAddon>
          </InputGroup>

          <div className="flex flex-wrap gap-2 lg:flex-col">
            <Select
              items={typeItems}
              value={type || null}
              onValueChange={(value) => setType((value as string | null) ?? "")}
            >
              <SelectTrigger
                aria-label="Filter by type"
                className="w-36 lg:w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {typeItems.map((option) => (
                    <SelectItem key={option.label} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              items={categoryItems}
              value={category || null}
              onValueChange={(value) =>
                setCategory((value as string | null) ?? "")
              }
            >
              <SelectTrigger
                aria-label="Filter by category"
                className="w-48 lg:hidden"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {categoryItems.map((option) => (
                    <SelectItem key={option.label} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {isGitHub && (
              <Toggle
                variant="outline"
                id="universe-toggle"
                pressed={universe}
                onPressedChange={setUniverse}
                className="justify-start"
              >
                <SparklesIcon data-icon="inline-start" />
                New at Universe ’26
                <span className="ml-auto pl-2 text-xs text-muted-foreground tabular-nums">
                  {universeCount}
                </span>
              </Toggle>
            )}
          </div>

          <div className="flex min-h-8 items-center gap-1 text-sm max-lg:ml-auto">
            <span
              aria-live="polite"
              id="result-count"
              className="text-muted-foreground"
            >
              Showing{" "}
              <span className="font-medium text-foreground tabular-nums">
                {visible.length}
              </span>{" "}
              of {items.length}
            </span>
            {filtered && (
              <Button variant="ghost" size="sm" onClick={clear}>
                <XIcon data-icon="inline-start" />
                Clear
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2 max-lg:hidden">
            <h2 className="text-xs font-medium text-muted-foreground">
              Categories
            </h2>
            <ToggleGroup
              aria-label="Category"
              orientation="vertical"
              value={[category || "all"]}
              onValueChange={(value) =>
                setCategory(!value[0] || value[0] === "all" ? "" : value[0])
              }
              className="flex w-full flex-col items-stretch gap-1"
            >
              <ToggleGroupItem value="all" className="justify-start">
                All categories
                <span className="ml-auto pl-2 text-xs text-muted-foreground tabular-nums">
                  {
                    items.filter((item) =>
                      matches(item, { ...filters, category: "" })
                    ).length
                  }
                </span>
              </ToggleGroupItem>
              {activeCatalog.groups.map((group) => {
                const Icon = iconFor(group.icon)
                return (
                  <ToggleGroupItem
                    key={group.id}
                    value={group.id}
                    data-category={group.id}
                    className="min-w-0 justify-start"
                    style={{ "--cat": group.color } as CSSProperties}
                  >
                    <Icon data-icon="inline-start" className="cat-ink" />
                    <span className="truncate">{group.name}</span>
                    <span className="ml-auto pl-2 text-xs text-muted-foreground tabular-nums">
                      {counts[group.id]}
                    </span>
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
          </div>

          <div className="mt-auto flex flex-col gap-2 text-xs leading-relaxed text-pretty text-muted-foreground max-lg:hidden">
            <p>{activeCatalog.description}</p>
            <p>
              Tile area reflects how many entries are mapped in each area, not
              usage, revenue or importance.
              {view === "treemap" &&
                " Click or scroll up on a group to zoom in; scroll down or press Esc to zoom out."}
              {isGitHub && (
                <>
                  {" "}
                  <SparklesIcon
                    aria-hidden
                    className="inline size-3 align-[-1px]"
                  />{" "}
                  marks a GitHub Universe ’26 announcement.
                </>
              )}
            </p>
            {isGitHub && (
              <p>
                GitHub Models was retired on 30 July 2026 and is not listed.{" "}
                <a
                  href="https://docs.github.com/en/github-models"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Read the notice
                </a>
              </p>
            )}
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 p-3 lg:p-4 lg:pb-3">
          <div
            ref={stage}
            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
          >
            {visible.length === 0 ? (
              <Empty className="h-full border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SearchXIcon />
                  </EmptyMedia>
                  <EmptyTitle>No matches</EmptyTitle>
                  <EmptyDescription>
                    Nothing in the landscape matches these filters. Try fewer
                    words, or clear the filters to see all {items.length}{" "}
                    entries.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" onClick={clear}>
                    Clear filters
                  </Button>
                </EmptyContent>
              </Empty>
            ) : size.width === 0 ? null : view === "treemap" ? (
              <Treemap
                items={items.filter((item) =>
                  matches(item, { ...filters, category: "" })
                )}
                width={size.width}
                height={size.height}
                focus={category}
                onOpen={open}
                onZoom={zoom}
              />
            ) : (
              <LandscapeGrid
                items={visible}
                width={size.width}
                height={mapHeight}
                onOpen={open}
                onZoom={(group) => setCategory(group.id)}
              />
            )}
          </div>

          <p className="truncate text-xs text-muted-foreground">
            Independent guide, not affiliated with {activeCatalog.name}. Checked
            against official sources on {snapshot}; each entry links to one.
          </p>
        </main>
      </div>

      <ItemSheet
        item={selected}
        items={items}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSelect={setSelected}
        onTag={(tag) => {
          setQuery(tag)
          setCategory("")
          setType("")
          setUniverse(false)
          setSheetOpen(false)
        }}
      />
    </div>
  )
}

export default App
