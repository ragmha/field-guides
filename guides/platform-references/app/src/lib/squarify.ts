export type Rect = { x: number; y: number; width: number; height: number }

// Squarified treemap (Bruls, Huizing & van Wijk): area is exactly proportional to value.
export function squarify<T extends { value: number }>(
  nodes: T[],
  x: number,
  y: number,
  width: number,
  height: number
): (T & Rect)[] {
  if (!nodes.length || width <= 0 || height <= 0) return []
  const scale = (width * height) / nodes.reduce((sum, node) => sum + node.value, 0)
  const pending = nodes
    .map((node) => ({ node, area: node.value * scale }))
    .sort((a, b) => b.area - a.area)
  const output: (T & Rect)[] = []
  const worst = (row: { area: number }[], side: number) => {
    const sum = row.reduce((total, cell) => total + cell.area, 0)
    return Math.max(
      (side * side * row[0].area) / (sum * sum),
      (sum * sum) / (side * side * row[row.length - 1].area)
    )
  }
  while (pending.length) {
    const row = [pending.shift()!]
    const side = Math.min(width, height)
    while (pending.length && worst([...row, pending[0]], side) <= worst(row, side))
      row.push(pending.shift()!)
    const area = row.reduce((sum, cell) => sum + cell.area, 0)
    const vertical = width >= height
    const depth = area / (vertical ? height : width)
    let offset = 0
    for (const { node, area: cellArea } of row) {
      const length = cellArea / depth
      output.push({
        ...node,
        x: vertical ? x : x + offset,
        y: vertical ? y + offset : y,
        width: vertical ? depth : length,
        height: vertical ? length : depth,
      })
      offset += length
    }
    if (vertical) {
      x += depth
      width -= depth
    } else {
      y += depth
      height -= depth
    }
  }
  return output
}
