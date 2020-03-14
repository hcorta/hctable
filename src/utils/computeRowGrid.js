export function computeRowGrid({ columns, width, minColumnWidth }) {
  const isTableOverWidth = isOverWindowWidth({ columns, width, minColumnWidth })
  let output = ''

  columns.forEach(column => {
    if (!column.width) {
      if (!isTableOverWidth) {
        output += output.length > 0 ? ` minmax(${minColumnWidth}px, 1fr)` : `minmax(${minColumnWidth}px, 1fr)`
      } else {
        output += output.length > 0 ? ` ${minColumnWidth}px` : `${minColumnWidth}px`
      }
    } else {
      if (typeof column.width === 'number') {
        output += output.length > 0 ? ` ${column.width}px` : `${column.width}px`
      } else {
        output += output.length > 0 ? ` ${column.width}` : `${column.width}`
      }
    }
  })

  return {
    computedRowGrid: output,
    rowWidth: isTableOverWidth ? 'fit-content' : '100%'
  }
}

function isOverWindowWidth({ columns, width, minColumnWidth }) {
  let value = 0
  columns.map(col => {
    if (col.width && typeof col.width === 'number') {
      value += col.width
    } else {
      value += minColumnWidth
    }
  })

  return value > width
}
