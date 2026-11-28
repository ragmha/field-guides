import type { CSSProperties } from "react"
import { ArrowUpRightIcon, ChevronRightIcon, SparklesIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Item } from "@/lib/catalog"
import { itemIcon } from "@/lib/icons"

export function ItemSheet({
  item,
  items,
  open,
  onOpenChange,
  onSelect,
  onTag,
}: {
  item: Item | null
  items: Item[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (item: Item) => void
  onTag: (tag: string) => void
}) {
  const Icon = item ? itemIcon(item) : null
  const siblings = item
    ? items.filter(
        (other) => other.group === item.group && other.id !== item.id
      )
    : []
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="gap-0 data-[side=right]:w-[min(100vw,28rem)] data-[side=right]:sm:max-w-md"
        style={
          item ? ({ "--cat": item.group.color } as CSSProperties) : undefined
        }
      >
        {item && Icon && (
          <>
            <SheetHeader className="gap-3 border-b pr-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--cat)_16%,transparent)]">
                  <Icon className="size-4.5 cat-ink" />
                </span>
                <Badge variant="secondary">{item.group.name}</Badge>
                <Badge variant="outline">{item.type}</Badge>
                {item.status && <Badge variant="outline">{item.status}</Badge>}
              </div>
              <SheetTitle className="text-xl font-semibold tracking-tight text-balance">
                {item.name}
              </SheetTitle>
              <SheetDescription className="text-pretty">
                {item.description}
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="min-h-0 flex-1">
              <div className="flex flex-col gap-6 p-4">
                {item.universe && (
                  <Alert>
                    <SparklesIcon />
                    <AlertTitle>Announced at GitHub Universe ’26</AlertTitle>
                    <AlertDescription>
                      <p>{item.universe.note}</p>
                      <a
                        href={item.universe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read the changelog
                      </a>
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="xs"
                        onClick={() => onTag(tag)}
                        title={`Search for “${tag}”`}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
                {siblings.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-medium text-muted-foreground">
                      More in {item.group.name}
                    </h3>
                    <Separator className="my-1" />
                    {siblings.map((sibling) => (
                      <Button
                        key={sibling.id}
                        variant="ghost"
                        className="h-auto justify-between py-1.5 text-left font-normal"
                        onClick={() => onSelect(sibling)}
                      >
                        <span className="truncate">{sibling.name}</span>
                        <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                          {sibling.universe && (
                            <SparklesIcon
                              aria-label="New at Universe ’26"
                              className="cat-ink"
                            />
                          )}
                          {sibling.type}
                          <ChevronRightIcon data-icon="inline-end" />
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            <SheetFooter className="border-t">
              <Button
                render={
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
              >
                Open official documentation
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Availability depends on your plan and region. The linked page is
                the source of truth.
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
