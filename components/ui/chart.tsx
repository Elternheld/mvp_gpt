
import * as React from "react"
import { clsx } from "clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ChartComponent({ indicator }: { indicator: string }) {
  return (
    <div
      className={clsx(
        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
        {
          "h-2.5 w-2.5": indicator === "dot",
          "w-1": indicator === "line",
          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "none",
          "my-0.5": true,
        }
      )}
    >
      Chart goes here
    </div>
  )
}
