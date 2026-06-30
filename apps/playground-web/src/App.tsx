import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  FormField,
  Input,
  Skeleton,
  Stack,
  Switch,
  Text,
  UIProvider
} from "@finn-ui/react";
import { createTheme, darkTheme, lightTheme, type Theme } from "@finn-ui/theme";

type ThemeMode = "light" | "dark" | "custom";

const customTheme = createTheme({
  name: "custom",
  colors: {
    background: "#F7FAF8",
    foreground: "#14211B",
    card: "#FFFFFF",
    cardForeground: "#14211B",
    border: "#BCD7C8",
    primary: "#0F766E",
    primaryForeground: "#FFFFFF",
    neutral: "#E8F2ED",
    neutralForeground: "#14211B",
    muted: "#567066",
    mutedForeground: "#779186"
  },
  components: {
    Button: {
      radius: "full",
      borderWidth: "thin"
    },
    Card: {
      radius: "xl",
      shadow: "md"
    },
    Input: {
      radius: "lg"
    }
  }
});

const themeByMode: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  custom: customTheme
};

export function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [email, setEmail] = useState("hello@finn-ui.dev");
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const theme = themeByMode[themeMode];
  const backgroundStyle = useMemo(
    () => ({
      background:
        themeMode === "dark"
          ? "linear-gradient(135deg, #0B1120 0%, #111827 100%)"
          : "linear-gradient(135deg, #F8FAFC 0%, #EEF6F2 100%)",
      color: theme.colors.foreground
    }),
    [theme.colors.foreground, themeMode]
  );

  return (
    <UIProvider theme={theme}>
      <main className="app-shell" style={backgroundStyle}>
        <section className="playground-panel">
          <Stack gap="xl">
            <Stack gap="sm">
              <Stack direction="row" gap="sm" align="center" wrap="wrap">
                <Badge tone="success">Phase 6</Badge>
                <Badge variant="outline" tone="primary">Badge ready</Badge>
              </Stack>
              <Text as="h1" variant="display">
                Finn UI consume test
              </Text>
              <Text variant="body" color="muted">
                This Vite app imports Finn UI packages through workspace package
                dependencies and verifies provider, theme, and MVP components
                outside Storybook.
              </Text>
            </Stack>

            <Card variant="elevated" p="xl">
              <Stack gap="lg">
                <Stack direction="row" gap="sm" wrap="wrap">
                  <Button
                    variant={themeMode === "light" ? "solid" : "outline"}
                    tone="primary"
                    onClick={() => setThemeMode("light")}
                  >
                    Light theme
                  </Button>
                  <Button
                    variant={themeMode === "dark" ? "solid" : "outline"}
                    tone="neutral"
                    onClick={() => setThemeMode("dark")}
                  >
                    Dark theme
                  </Button>
                  <Button
                    variant={themeMode === "custom" ? "solid" : "soft"}
                    tone="success"
                    onClick={() => setThemeMode("custom")}
                  >
                    Custom theme
                  </Button>
                </Stack>

                <Divider />

                <Box
                  bg="background"
                  borderColor="border"
                  borderWidth="thin"
                  p="lg"
                  radius="lg"
                >
                  <Stack gap="md">
                    <Text as="h2" variant="heading">
                      Account preview
                    </Text>
                    <Stack direction="row" gap="sm" align="center">
                      <Avatar fallback="FU" tone="primary" size="lg" />
                      <Stack gap="xs">
                        <Text variant="label">Finn UI workspace</Text>
                        <Text variant="caption" color="muted">Avatar fallback renders from package exports.</Text>
                      </Stack>
                    </Stack>
                    <Stack gap="sm">
                      <Skeleton width="68%" height={14} />
                      <Skeleton width="46%" height={14} animated={false} />
                    </Stack>
                    <Stack direction="row" gap="sm" wrap="wrap">
                      <Badge tone="success">Active</Badge>
                      <Badge variant="outline" tone="neutral">Workspace</Badge>
                    </Stack>
                    <FormField
                      id="playground-email"
                      label="Email"
                      helperText="The playground verifies label, helper text, and controlled input wiring."
                      required
                    >
                      <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                      />
                    </FormField>
                    <Stack gap="sm">
                      <Checkbox
                        checked={updatesEnabled}
                        label="Send account updates"
                        onCheckedChange={setUpdatesEnabled}
                        tone="success"
                      />
                      <Switch
                        checked={alertsEnabled}
                        label="Enable workspace alerts"
                        onCheckedChange={setAlertsEnabled}
                        tone="primary"
                      />
                    </Stack>
                    <Stack direction="row" gap="sm" wrap="wrap">
                      <Button>Save changes</Button>
                      <Button variant="ghost" tone="danger">
                        Reset
                      </Button>
                    </Stack>
                    <Text variant="caption" color="muted">
                      Active theme: {theme.name}. Email value: {email || "empty"}.
                      Updates: {updatesEnabled ? "on" : "off"}. Alerts: {alertsEnabled ? "on" : "off"}.
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </section>
      </main>
    </UIProvider>
  );
}
