# @finn-ui/theme

Theme creation and default themes for Finn UI.

## Status

This package is private and pre-release. The API may change while the MVP is
being stabilized.

## Usage

```ts
import { createTheme, lightTheme } from "@finn-ui/theme";

const customTheme = createTheme({
  name: "custom",
  colors: {
    primary: "#0F766E",
    primaryForeground: "#FFFFFF"
  }
});
```

The package exports `createTheme`, `lightTheme`, `darkTheme`, and theme types.

## Build

```powershell
pnpm --filter @finn-ui/theme build
```
