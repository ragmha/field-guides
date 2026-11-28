import { useEffect, useRef, type CSSProperties } from "react"
import { ChevronRightIcon, SparklesIcon, ZoomInIcon } from "lucide-react"

import type { Group, Item } from "@/lib/catalog"
import { iconFor, itemIcon } from "@/lib/icons"
import { squarify } from "@/lib/squarify"
import { cn } from "@/lib/utils"

const HEADER = 30
const PAD = 4
const GAP = 3
const MOVE = matchMedia("(prefers-reduced-motion: reduce)").matches
  ? undefined
  : "left .5s, top .5s, width .5s, height .5s, visibility .5s, background-color .15s"

function lineCount(text: string, perLine: number) {
  let lines = 1
  let used = 0
  for (const word of text.split(/\s+/)) {
    if (used && used + 1 + word.length > perLine) {
      lines++
      used = 0
    }
    lines += Math.ceil(word.length / perLine) - 1
    used += (used ? 1 : 0) + (word.length % perLine || perLine)
  }
  return lines
}

export function Treemap({
  items,
  width,
  height,
  focus,
  onOpen,
  onZoom,
}: {
  items: Item[]
  width: number
  height: number
  focus: string
  onOpen: (item: Item) => void
  onZoom: (group: Group | null) => void
}) {
  const root = useRef<HTMLDivElement>(null)
  const lastWheel = useRef(0)
  const groups = [...new Set(items.map((item) => item.group))]
  const base = squarify(
    groups.map((group) => ({
      group,
      value: items.filter((item) => item.group === group).length,
    })),
    0,
    0,
    width,
    height
  )
  const zoom = base.find((region) => region.group.id === focus)
  const sx = zoom ? width / zoom.width : 1
  const sy = zoom ? height / zoom.height : 1
  const regions = base.map((region) => ({
    ...region,
    x: (region.x - (zoom?.x ?? 0)) * sx,
    y: (region.y - (zoom?.y ?? 0)) * sy,
    width: region.width * sx,
    height: region.height * sy,
  }))

  useEffect(() => {
    if (!zoom) return
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !(event.target as HTMLElement).closest("input, textarea") &&
        !document.querySelector("[role=dialog]")
      )
        onZoom(null)
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [zoom, onZoom])

  useEffect(() => {
    const node = root.current
    if (!node) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const quiet = event.timeStamp - lastWheel.current > 300
      lastWheel.current = event.timeStamp
      if (!quiet) return
      if (event.deltaY > 0 && zoom) onZoom(null)
      if (event.deltaY < 0 && !zoom) {
        const id = (event.target as HTMLElement).closest("section")?.dataset
          .group
        const group = items.find((item) => item.group.id === id)?.group
        if (group) onZoom(group)
      }
    }
    node.addEventListener("wheel", onWheel, { passive: false })
    return () => node.removeEventListener("wheel", onWheel)
  }, [zoom, items, onZoom])

  return (
    <div
      ref={root}
      data-testid="treemap"
      className="relative overflow-hidden"
      style={{ width, height }}
    >
      {regions.map(({ group, x, y, width: w, height: h }) => {
        const GroupIcon = iconFor(group.icon)
        const focused = zoom?.group === group
        const hidden = Boolean(zoom) && !focused
        const leaves = squarify(
          items
            .filter((item) => item.group === group)
            .map((item) => ({ item, value: 1 })),
          PAD,
          HEADER,
          w - GAP - PAD * 2,
          h - GAP - HEADER - PAD
        )
        return (
          <section
            key={group.id}
            data-group={group.id}
            aria-label={group.name}
            aria-hidden={hidden || undefined}
            inert={hidden}
            className="absolute rounded-lg bg-[color-mix(in_oklab,var(--cat)_9%,var(--background))] ring-1 ring-[color-mix(in_oklab,var(--cat)_30%,transparent)]"
            style={
              {
                "--cat": group.color,
                left: x,
                top: y,
                width: w - GAP,
                height: h - GAP,
                transition: MOVE,
                visibility: hidden ? "hidden" : undefined,
              } as CSSProperties
            }
          >
            <div className="flex h-[30px] max-w-full items-center px-1 text-xs font-semibold">
              {focused && (
                <>
                  <button
                    type="button"
                    onClick={() => onZoom(null)}
                    className="rounded-md px-1.5 py-1 text-foreground/70 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    All categories
                  </button>
                  <ChevronRightIcon
                    aria-hidden
                    className="size-3.5 shrink-0 text-foreground/50"
                  />
                </>
              )}
              <button
                type="button"
                onClick={() => onZoom(focused ? null : group)}
                title={focused ? "Zoom out" : `Zoom into ${group.name}`}
                className="group/zoom flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <GroupIcon className="size-3.5 shrink-0 cat-ink" />
                <span className="truncate">{group.name}</span>
                <span className="font-normal text-foreground/65 tabular-nums">
                  {leaves.length}
                </span>
                {!focused && (
                  <ZoomInIcon
                    aria-hidden
                    className="size-3.5 shrink-0 text-foreground/60 opacity-0 transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
                  />
                )}
              </button>
            </div>
            {leaves.map(({ item, x, y, width: lw, height: lh }) => {
              const Icon = itemIcon(item)
              const longest = Math.max(
                ...item.name.split(/\s+/).map((word) => word.length)
              )
              let fontSize = Math.min(
                25,
                Math.max(
                  10.5,
                  Math.min(Math.sqrt(lw * lh) / 8, (lw - 14) / (longest * 0.6))
                )
              )
              const showIcon = lh > 86 && lw > 80
              const room = lh - GAP - 12 - (showIcon ? 20 : 0)
              const textW = lw - GAP - 12
              const perLine = () => Math.floor(textW / (fontSize * 0.58))
              const nameLines = () => lineCount(item.name, perLine())
              while (
                (perLine() < longest || nameLines() * fontSize * 1.25 > room) &&
                fontSize > 9
              )
                fontSize -= 0.5
              const nameH = nameLines() * fontSize * 1.25
              // Like vasturiano's treemap: tiles too small for whole words stay unlabeled until zoomed.
              const label = perLine() >= longest && room >= fontSize * 1.25
              const showType = label && lw > 75 && room >= nameH + 20
              return (
                <button
                  key={item.id}
                  type="button"
                  data-item={item.id}
                  onClick={() =>
                    zoom || groups.length < 2 ? onOpen(item) : onZoom(group)
                  }
                  aria-label={`${item.name}, ${item.type}${item.universe ? ", new at Universe ’26" : ""}`}
                  title={label ? undefined : item.name}
                  className={cn(
                    "absolute flex flex-col items-start gap-1 overflow-hidden rounded-md p-1.5 text-left ring-1 ring-[color-mix(in_oklab,var(--cat)_28%,transparent)] outline-none hover:bg-[color-mix(in_oklab,var(--cat)_34%,var(--card))] focus-visible:ring-3 focus-visible:ring-ring",
                    item.featured
                      ? "bg-[color-mix(in_oklab,var(--cat)_26%,var(--card))]"
                      : "bg-[color-mix(in_oklab,var(--cat)_16%,var(--card))]"
                  )}
                  style={{
                    left: x,
                    top: y,
                    width: lw - GAP,
                    height: lh - GAP,
                    transition: MOVE,
                  }}
                >
                  {showIcon && <Icon className="size-4 shrink-0 cat-ink" />}
                  {label && (
                    <span
                      data-label
                      className="max-w-full leading-tight font-semibold tracking-tight text-balance"
                      style={{
                        fontSize,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: Math.max(
                          1,
                          Math.floor(room / (fontSize * 1.25))
                        ),
                        overflow: "hidden",
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                  {showType && (
                    <span className="flex items-center gap-1 text-xs text-foreground/70">
                      {item.type}
                      {item.universe && (
                        <SparklesIcon
                          aria-hidden
                          className="size-3.5 cat-ink"
                        />
                      )}
                    </span>
                  )}
                  {showType && lw > 200 && room >= nameH + 72 && (
                    <span className="line-clamp-3 text-xs text-foreground/70">
                      {item.description}
                    </span>
                  )}
                </button>
              )
            })}
          </section>
        )
      })}
    </div>
  )
}
