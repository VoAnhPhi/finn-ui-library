Finn-ui-library Spec v1
1. Tầm nhìn sản phẩm

Finn-ui-library là một UI Library dùng lại cho nhiều project cá nhân hoặc team nhỏ, giúp các project có giao diện đồng bộ theo một style riêng, nhưng vẫn đủ linh hoạt để custom theo brand từng project.

Mục tiêu dài hạn:

Một cross-platform UI Library cho Web và React Native,
dùng chung design tokens và theme system,
có Storybook online để preview/docs component,
và sau này có Theme Studio để chỉnh theme bằng giao diện.
2. Mục tiêu chính
Mục tiêu sản phẩm

Finn-ui-library cần giải quyết các vấn đề sau:

1. Dùng lại UI component qua nhiều project
2. Giữ style đồng bộ theo gu cá nhân
3. Cho phép custom brand toàn project
4. Vẫn cho custom từng component khi cần
5. Hỗ trợ Web trước, Native sau
6. Có preview/docs online bằng Storybook
7. Có nền tảng để build Theme Studio sau này
3. Định hướng đã chốt

Bạn đã chọn hướng rất hợp lý:

1. Ưu tiên custom brand toàn project
   Nhưng vẫn cho custom từng component khi cần.

2. Ưu tiên đồng bộ mạnh vừa phải
   Không quá khóa cứng, nhưng không để style loạn.

3. Theme Studio chỉnh theme tổng thể trước
   Sau này mới thêm preview và copy code từng component.

Triết lý chính:

Theme-first UI Library

Nghĩa là:

Custom chính: theme
Custom phụ: props
Custom đặc biệt: style/className override
4. Tên project và package
Repo name
Finn-ui-library
Package scope đề xuất
@finn-ui
Package names
@finn-ui/tokens
@finn-ui/theme
@finn-ui/react
@finn-ui/native
@finn-ui/icons

Ban đầu chỉ cần làm:

@finn-ui/tokens
@finn-ui/theme
@finn-ui/react
apps/storybook

Native và Studio làm sau.

5. Kiến trúc tổng thể

Cấu trúc monorepo đề xuất:

Finn-ui-library
  apps
    storybook
    playground-web
    playground-native
    studio

  packages
    tokens
    theme
    react
    native
    icons

Giai đoạn MVP nên bắt đầu với:

Finn-ui-library
  apps
    storybook

  packages
    tokens
    theme
    react
6. Vai trò từng phần
packages/tokens

Chứa các giá trị thiết kế gốc.

Ví dụ:

colors
spacing
radius
typography
shadow
borderWidth
opacity
zIndex
duration
easing

Ví dụ code:

export const tokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  },

  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },

  borderWidth: {
    none: 0,
    thin: 1,
    medium: 2,
  },
};
packages/theme

Chứa theme system dùng chung cho Web và Native.

Nó nên export:

createTheme
lightTheme
darkTheme
ThemeProvider type
Theme type
Component theme config

Ví dụ:

export const lightTheme = createTheme({
  colors: {
    background: '#FFFFFF',
    foreground: '#111827',
    card: '#F9FAFB',
    border: '#E5E7EB',

    primary: '#2563EB',
    primaryForeground: '#FFFFFF',

    danger: '#DC2626',
    dangerForeground: '#FFFFFF',

    muted: '#6B7280',
    mutedForeground: '#9CA3AF',
  },

  components: {
    Button: {
      radius: 'lg',
      borderWidth: 'thin',
    },
    Input: {
      radius: 'md',
      borderWidth: 'thin',
    },
    Card: {
      radius: 'lg',
      borderWidth: 'thin',
    },
  },
});
packages/react

Component cho React Web.

Nó nên export:

import {
  UIProvider,
  Box,
  Text,
  Stack,
  Button,
  Input,
  Card,
  Divider,
} from '@finn-ui/react';

Ví dụ dùng:

import { UIProvider, Button, Card, Stack, Text } from '@finn-ui/react';
import { lightTheme } from '@finn-ui/theme';

export function App() {
  return (
    <UIProvider theme={lightTheme}>
      <Card>
        <Stack gap="md">
          <Text variant="heading">Welcome</Text>

          <Button variant="solid" tone="primary" size="md">
            Continue
          </Button>
        </Stack>
      </Card>
    </UIProvider>
  );
}
packages/native

Component cho React Native.

Làm sau khi API Web ổn.

API nên giống Web khoảng 70–80%, nhưng implementation khác.

Ví dụ:

import { UIProvider, Button, Card, Stack, Text } from '@finn-ui/native';
import { lightTheme } from '@finn-ui/theme';

export function App() {
  return (
    <UIProvider theme={lightTheme}>
      <Card>
        <Stack gap="md">
          <Text variant="heading">Welcome</Text>

          <Button variant="solid" tone="primary" size="md">
            Continue
          </Button>
        </Stack>
      </Card>
    </UIProvider>
  );
}
apps/storybook

Dùng để:

Preview component
Test variant
Test props
Test theme
Viết docs
Deploy online để share/view

Storybook không chỉ dùng giai đoạn đầu. Nó có thể là docs/component catalog dài hạn cho Finn-ui-library.

apps/studio

Theme Studio làm sau.

Vai trò:

Chỉnh theme bằng giao diện
Preview theme tổng thể
Export theme.ts hoặc theme.json
Sau này thêm copy code component

Không nên build Studio ngay từ đầu.

7. Quy tắc custom

Finn-ui-library nên có 3 tầng custom.

Tầng 1: Custom bằng theme

Đây là cách chính.

Ví dụ đổi brand toàn project:

const customTheme = createTheme({
  colors: {
    primary: '#7C3AED',
    background: '#FFFFFF',
    foreground: '#111827',
    border: '#E5E7EB',
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
  },

  components: {
    Button: {
      radius: 'lg',
      borderWidth: 'thin',
    },
  },
});

Dùng:

<UIProvider theme={customTheme}>
  <App />
</UIProvider>
Tầng 2: Custom bằng props

Ví dụ:

<Button variant="solid" tone="primary" size="md">
  Save
</Button>

<Button variant="outline" tone="danger" size="lg">
  Delete
</Button>

Các props nên chuẩn hóa:

variant
tone
size
radius
fullWidth
disabled
loading
leftIcon
rightIcon
Tầng 3: Custom trực tiếp

Dùng khi thật sự cần.

Web:

<Button
  variant="solid"
  tone="primary"
  className="custom-button"
  style={{ minWidth: 180 }}
>
  Save
</Button>

Native:

<Button
  variant="solid"
  tone="primary"
  style={{ minWidth: 180 }}
>
  Save
</Button>

Quy tắc quan trọng:

Không khuyến khích dùng style override làm cách custom chính.
Nếu custom được bằng theme thì ưu tiên theme.
Nếu custom được bằng props thì ưu tiên props.
Style/className chỉ là escape hatch.
8. Component API convention

Nên dùng API theo kiểu:

<Button variant="solid" tone="primary" size="md">
  Save
</Button>

Trong đó:

variant = kiểu hiển thị
tone = màu/ngữ nghĩa
size = kích thước
radius = độ bo góc

Ví dụ:

<Button variant="solid" tone="primary">
  Save
</Button>

<Button variant="outline" tone="danger">
  Delete
</Button>

<Button variant="ghost" tone="neutral">
  Cancel
</Button>

<Button variant="soft" tone="primary">
  Continue
</Button>

Không nên gom quá nhiều ý nghĩa vào một prop kiểu:

<Button variant="primary" />
<Button variant="danger" />
<Button variant="outlineDanger" />
<Button variant="ghostPrimary" />

Vì kiểu đó khó scale khi số lượng variant/tone tăng lên.

9. Component MVP

Bộ component đầu tiên nên làm:

Box
Text
Stack
Button
Input
Card
Divider

Lý do:

Box: primitive layout
Text: chuẩn typography
Stack: layout có gap
Button: action chính
Input: form cơ bản
Card: container phổ biến
Divider: line/separator

Sau MVP mới làm tiếp:

FormField
Badge
Avatar
Modal
Toast
Skeleton
EmptyState
Switch
Checkbox
Tabs

Không nên làm sớm:

DatePicker
Calendar
DataTable
Dropdown phức tạp
RichTextEditor
Chart
Animation system riêng
10. Spec từng component MVP
Box

Mục tiêu: primitive layout wrapper.

Props đề xuất:

as
p
px
py
m
mx
my
bg
color
radius
borderWidth
borderColor
shadow
style
className
children

Ví dụ:

<Box bg="card" p="lg" radius="lg" borderWidth="thin">
  <Text>Content</Text>
</Box>
Text

Mục tiêu: chuẩn hóa typography.

Props đề xuất:

variant
tone
color
align
weight
size
children
style
className

Variants:

display
heading
title
body
caption
label
button

Ví dụ:

<Text variant="heading">Settings</Text>

<Text variant="body" color="muted">
  Manage your account information.
</Text>
Stack

Mục tiêu: layout dọc/ngang có gap.

Props đề xuất:

direction
gap
align
justify
wrap
children
style
className

Ví dụ:

<Stack gap="md">
  <Text variant="heading">Profile</Text>
  <Input placeholder="Email" />
  <Button>Save</Button>
</Stack>
Button

Mục tiêu: action component chính.

Props đề xuất:

variant
tone
size
radius
fullWidth
disabled
loading
leftIcon
rightIcon
onClick / onPress
children
style
className

Variants:

solid
outline
ghost
soft
link

Tones:

primary
neutral
danger
success
warning

Sizes:

sm
md
lg

Ví dụ:

<Button variant="solid" tone="primary" size="md">
  Save
</Button>

<Button variant="outline" tone="danger" loading>
  Delete
</Button>
Input

Mục tiêu: form input cơ bản.

Props đề xuất:

value
defaultValue
placeholder
disabled
readOnly
error
size
radius
leftIcon
rightIcon
onChange
style
className

Ví dụ:

<Input placeholder="Email" />

<Input
  placeholder="Password"
  error="Password is required"
/>
Card

Mục tiêu: container có background, border, radius, shadow.

Props đề xuất:

variant
p
radius
bg
borderWidth
borderColor
shadow
children
style
className

Variants:

solid
outline
elevated
ghost

Ví dụ:

<Card variant="outline" p="lg" radius="lg">
  <Text variant="title">Account</Text>
</Card>
Divider

Mục tiêu: line/separator.

Props đề xuất:

orientation
size
color
spacing
style
className

Ví dụ:

<Divider />
11. Storybook spec
Vai trò

Storybook là nơi:

Preview component
Test props
Test variant
Test theme
Viết docs
Deploy online
Stories cần có trong MVP
Button.stories.tsx
Input.stories.tsx
Card.stories.tsx
Text.stories.tsx
Box.stories.tsx
Stack.stories.tsx
Theme.stories.tsx
Button stories cần có
Solid Primary
Outline Primary
Ghost Primary
Soft Primary
Solid Danger
Loading
Disabled
Sizes
Full width
With icons
Input stories cần có
Default
With placeholder
With error
Disabled
Sizes
With left icon
With right icon
Theme stories cần có
Light theme
Dark theme
Custom theme
Theme comparison
Deploy Storybook

Bạn muốn view online, nên deploy Storybook.

Flow:

Build Storybook
Deploy output folder storybook-static
View online
Share link

Build command thường là:

pnpm --filter storybook build

Output thường là:

apps/storybook/storybook-static

Có thể deploy lên:

Vercel
Netlify
GitHub Pages
Chromatic

Với Vercel, cấu hình thường là:

Root Directory: apps/storybook
Build Command: pnpm build
Output Directory: storybook-static
Install Command: pnpm install
12. Theme Studio spec

Theme Studio không làm ở MVP, nhưng cần thiết kế hướng từ đầu.

Mục tiêu

Theme Studio là app chỉnh theme bằng giao diện.

Nó nên làm được:

Chỉnh màu brand
Chỉnh background
Chỉnh text color
Chỉnh border color
Chỉnh radius
Chỉnh border width
Chỉnh spacing
Preview Button/Input/Card
Export theme.ts hoặc theme.json
Bản đầu của Theme Studio

Chỉ cần:

Color picker cho primary/background/text/border
Slider cho radius
Selector cho borderWidth
Preview Button/Input/Card
Export theme object
Sau này mới thêm
Preset theme
Dark mode editor
Component state preview
Copy code từng component
Import/export JSON
Save theme online
Preview native theme
13. OpenUI spec

OpenUI không phải core của Finn-ui-library.

Vai trò đúng:

Dùng để lấy ý tưởng layout/UI nhanh
Generate draft
Sau đó refactor về token/theme/component chuẩn của Finn-ui-library

Không nên copy nguyên code OpenUI nếu nó hard-code style.

Ví dụ OpenUI generate:

<button className="rounded-xl bg-blue-600 px-4 py-2 text-white">
  Save
</button>

Bạn nên chuyển thành:

<Button variant="solid" tone="primary">
  Save
</Button>

Và đưa style vào theme/tokens.

14. Tech stack đề xuất

Không chốt version cụ thể ở đây. Stack đề xuất:

pnpm workspace
TypeScript
Turborepo nếu muốn quản lý build tốt hơn
tsup hoặc Rollup để build package
React cho Web package
Storybook cho preview/docs
Vite cho playground/studio web
Expo cho playground-native sau này
React Native cho native package

Giai đoạn đầu nên dùng:

pnpm workspace
TypeScript
tsup
React
Storybook
15. Roadmap thực hiện
Phase 1: Monorepo Foundation

Mục tiêu:

Dựng được repo
Tạo được package structure
Chạy được workspace
Build được package đơn giản

Deliverables:

Finn-ui-library repo
packages/tokens
packages/theme
packages/react
apps/storybook
Phase 2: Tokens + Theme

Mục tiêu:

Có design tokens
Có createTheme
Có lightTheme
Có darkTheme
Có UIProvider
Có useTheme

Deliverables:

@finn-ui/tokens
@finn-ui/theme
UIProvider
useTheme
lightTheme
darkTheme
Phase 3: Web Components MVP

Mục tiêu:

Có bộ component web đầu tiên
Dùng theme được
Có API ổn định ban đầu

Deliverables:

Box
Text
Stack
Button
Input
Card
Divider
Phase 4: Storybook Online

Mục tiêu:

Có Storybook preview/docs
Deploy online
Có thể share link

Deliverables:

Stories cho component MVP
Theme switcher
Storybook build
Storybook deployed
Phase 5: Consume Test

Mục tiêu:

Dùng thử package trong một project React thật
Kiểm tra import/build/theme

Deliverables:

playground-web hoặc sample app
Import @finn-ui/react
Test lightTheme/customTheme
Phase 6: Native Package

Mục tiêu:

Port component API sang React Native
Dùng chung tokens/theme

Deliverables:

@finn-ui/native
Box Native
Text Native
Stack Native
Button Native
Input Native
Card Native
Phase 7: Theme Studio

Mục tiêu:

Tạo app chỉnh theme bằng UI
Preview theme
Export theme

Deliverables:

apps/studio
Color editor
Radius editor
Border editor
Preview panel
Export theme
16. MVP Definition of Done

MVP được xem là hoàn thành khi:

1. Có repo Finn-ui-library
2. Có monorepo structure
3. Có @finn-ui/tokens
4. Có @finn-ui/theme
5. Có @finn-ui/react
6. Có UIProvider/useTheme
7. Có lightTheme/darkTheme
8. Có Button/Text/Card/Box/Stack/Input/Divider
9. Có Storybook preview cho component
10. Có thể đổi theme và component đổi theo
11. Storybook deploy online được
12. Có thể import component vào một React app khác

Ví dụ app khác dùng được như này:

import { UIProvider, Button, Card, Stack, Text } from '@finn-ui/react';
import { lightTheme } from '@finn-ui/theme';

export function App() {
  return (
    <UIProvider theme={lightTheme}>
      <Card>
        <Stack gap="md">
          <Text variant="heading">Finn UI</Text>

          <Button variant="solid" tone="primary">
            Get started
          </Button>
        </Stack>
      </Card>
    </UIProvider>
  );
}
17. Non-goals cho MVP

Những thứ chưa làm ở MVP:

React Native package
Theme Studio
Public npm package
DataTable
Calendar
Dropdown phức tạp
Animation system
Full accessibility audit
Visual regression testing
Dark mode editor nâng cao
Copy code từng component

Lý do: làm quá nhiều ngay từ đầu sẽ dễ bị loạn scope.

18. Những rủi ro cần kiểm soát
Rủi ro 1: Custom quá tự do

Nếu component nào cũng cho truyền quá nhiều style props, UI sẽ dễ loạn.

Cách kiểm soát:

Theme là chính
Props là phụ
Style override là escape hatch
Rủi ro 2: Web và Native làm cùng lúc

Dễ bị quá tải.

Cách kiểm soát:

Làm Web trước
API ổn rồi mới port Native
Rủi ro 3: Làm Theme Studio quá sớm

Nếu theme system chưa ổn, Studio sẽ phải sửa lại nhiều.

Cách kiểm soát:

Storybook trước
Theme Studio sau
Rủi ro 4: API component bị rối

Ví dụ:

<Button variant="primary" />
<Button variant="outlineDanger" />
<Button bg="red" radius={20} />

Cách kiểm soát:

Dùng convention variant + tone + size
19. Thứ tự bắt đầu build

Checklist bắt đầu:

1. Tạo repo Finn-ui-library
2. Setup pnpm workspace
3. Tạo packages/tokens
4. Tạo packages/theme
5. Tạo packages/react
6. Tạo apps/storybook
7. Tạo tokens cơ bản
8. Tạo createTheme
9. Tạo lightTheme/darkTheme
10. Tạo UIProvider/useTheme
11. Làm Box
12. Làm Text
13. Làm Stack
14. Làm Button
15. Viết Button stories
16. Chạy Storybook local
17. Build Storybook
18. Deploy Storybook online

Sau đó mới làm:

Input
Card
Divider
Theme switcher
Custom theme story
20. Kết luận spec

Finn-ui-library nên được xây theo hướng:

Theme-first cross-platform UI Library

Core thật sự là:

tokens
theme
components

Công cụ hỗ trợ là:

Storybook để preview/docs/deploy online
OpenUI để lấy ý tưởng
Theme Studio để custom theme sau này

Thứ tự ưu tiên hiện tại:

1. Web trước
2. Storybook online trước
3. Native sau
4. Theme Studio sau nữa

Bản MVP đầu tiên chỉ cần chứng minh được một điều:

Một project khác có thể import @finn-ui/react,
bọc UIProvider,
dùng Button/Text/Card/Input,
đổi theme một chỗ,
và toàn bộ component đổi style theo.