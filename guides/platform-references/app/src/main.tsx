import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

const host = document.documentElement.dataset.colorMode

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={host === "dark" || host === "light" ? host : "system"}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
