---
name: Workflow pnpm version alignment
description: The workspace package-manager pin must match the pnpm version available in the Replit runtime.
---

Managed artifact workflows may repeatedly try to download the package-manager version declared in the root package.json when it differs from the installed Replit pnpm, causing startup failures before the app command runs.

**Why:** The EuroToolBox workflow failed before Vite started because the project requested pnpm 10.11.1 while the runtime provided pnpm 10.26.1.

**How to apply:** When a managed pnpm workflow loops on `pnpm add pnpm@...`, compare the root `packageManager` value with `pnpm --version` before changing application code or workflow configuration.