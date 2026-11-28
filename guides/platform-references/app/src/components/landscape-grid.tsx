import type { CSSProperties } from "react"
import { SparklesIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Group, Item } from "@/lib/catalog"
import { iconFor, itemIcon } from "@/lib/icons"
import { squarify } from "@/lib/squarify"
import { cn } from "@/lib/utils"

const HEADER = 32
const GAP = 6

// Pick the column count whose cells come closest to a wide card shape.
function gridFor(count: number, width: number, height: number) {
  let best = { cols: 1, rows: count, score: Infinity }
  for (let cols = 1; cols <= count; cols++) {
    const rows = Math.ceil(count / cols)
    const ratio = width / cols / (height / rows)
    const score = Math.abs(Math.log(ratio / 1.9)) + (cols * rows - count) * 0.06
    if (score < best.score) best = { cols, rows, score }
  }
  return best
}

export function LandscapeGrid({
  items,
  width,
  height,
  onOpen,
  onZoom,
}: {
  items: Item[]
  width: number
  height: number
  onOpen: (item: Item) => void
  onZoom: (group: Group) => void
}) {
  const groups = [...new Set(items.map((item) => item.group))]
  const regions = squarify(
    groups.map((group) => ({
      group,
      // Tiny groups still need room for legible tiles; only the treemap is proportional.
      value: Math.max(5, items.filter((item) => item.group === group).length),
    })),
    0,
    0,
    width,
    height
  )

  return (
    <div data-testid="landscape" className="relative" style={{ width, height }}>
      {regions.map(({ group, x, y, width: w, height: h }) => {
        const GroupIcon = iconFor(group.icon)
        const members = items.filter((item) => item.group === group)
        const bodyW = w - GAP - 8
        const bodyH = h - GAP - HEADER - 8
        const { cols, rows } = gridFor(members.length, bodyW, bodyH)
        const tileW = (bodyW - (cols - 1) * 4) / cols
        const tileH = (bodyH - (rows - 1) * 4) / rows
        return (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="absolute flex flex-col overflow-hidden rounded-lg bg-card ring-1 ring-[color-mix(in_oklab,var(--cat)_35%,var(--border))]"
            style={
              {
                "--cat": group.color,
                left: x,
                top: y,
                width: w - GAP,
                height: h - GAP,
              } as CSSProperties
            }
          >
            <button
              type="button"
              onClick={() => onZoom(group)}
              title={`Show only ${group.name}`}
              className="flex h-8 shrink-0 items-center gap-2 bg-[color-mix(in_oklab,var(--cat)_22%,var(--card))] px-2.5 text-left text-sm font-semibold outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
            >
              <GroupIcon className="size-4 shrink-0 cat-ink" />
              <span id={`group-${group.id}`} className="truncate">
                {group.name}
              </span>
              <span className="font-normal text-foreground/65 tabular-nums">
                {members.length}
              </span>
              {w > 420 && (
                <span className="ml-auto truncate pl-2 text-xs font-normal text-foreground/65">
                  {group.subtitle}
                </span>
              )}
            </button>
            <div
              className="grid min-h-0 flex-1 gap-1 p-1"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              }}
            >
              {members.map((item) => {
                const Icon = itemIcon(item)
                const tagRows = tileH >= 104 ? 2 : tileH >= 64 ? 1 : 0
                const nameLines = tagRows
                  ? 2
                  : Math.max(1, Math.floor((tileH - 8) / 15))
                const preview =
                  item.status && item.status !== "Generally available"
                    ? item.status
                    : null
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-item={item.id}
                    onClick={() => onOpen(item)}
                    aria-label={`${item.name}, ${item.type}${item.universe ? ", new at Universe ’26" : ""}`}
                    className="relative flex min-h-0 min-w-0 flex-col items-start gap-1 overflow-hidden rounded-md bg-[color-mix(in_oklab,var(--cat)_7%,var(--card))] px-1.5 py-1 text-left ring-1 ring-[color-mix(in_oklab,var(--cat)_18%,var(--border))] transition-[background-color,box-shadow] duration-150 outline-none hover:bg-[color-mix(in_oklab,var(--cat)_18%,var(--card))] hover:ring-[color-mix(in_oklab,var(--cat)_55%,transparent)] focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "flex max-w-full items-start gap-1 leading-tight font-semibold tracking-tight",
                        tileW >= 130 ? "text-[13px]" : "text-xs",
                        item.universe && "pr-3"
                      )}
                    >
                      {tileW >= 110 && (
                        <Icon className="mt-px size-3.5 shrink-0 cat-ink" />
                      )}
                      <span
                        className="[overflow-wrap:anywhere] hyphens-auto"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: nameLines,
                          overflow: "hidden",
                        }}
                      >
                        {item.name}
                      </span>
                    </span>
                    {tileH >= 128 && tileW >= 200 && (
                      <span className="line-clamp-2 text-xs text-foreground/70">
                        {item.description}
                      </span>
                    )}
                    {tagRows > 0 && (
                      <span
                        data-testid="item-tags"
                        className="mt-auto flex flex-wrap gap-1 overflow-hidden"
                        style={{ maxHeight: tagRows * 20 + (tagRows - 1) * 4 }}
                      >
                        {preview && (
                          <Badge variant="outline" className="h-5">
                            {preview}
                          </Badge>
                        )}
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="border-[color-mix(in_oklab,var(--cat)_24%,var(--border))] bg-[color-mix(in_oklab,var(--cat)_12%,var(--secondary))]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </span>
                    )}
                    {item.universe && (
                      <SparklesIcon
                        aria-hidden
                        className="absolute top-1 right-1 size-3 cat-ink"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
