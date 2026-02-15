# v0 Prompt Examples

v0 APIに渡す高品質なプロンプトの実例集。各例には入力要件、生成されたプロンプト、期待される出力を含む。

---

## Example 1: SaaS Dashboard

### 入力要件
```yaml
project_type: dashboard
target_user: SaaSプロダクトマネージャー（30-40代）
purpose: チームのKPIモニタリング
tone_keywords: professional, trustworthy, modern
references: Linear, Notion
axes: {density: 4, tone: 2, era: 4, saturation: 2}
style: Dark Mode Minimal
```

### v0プロンプト
```
Create a KPI monitoring dashboard for SaaS product managers with the following specifications:

**Layout Structure:**
- Left sidebar (64px width) with icon-only navigation
- Top header with search bar, notifications, and user avatar
- Main content area with:
  - 4 KPI cards in a row (Revenue, Active Users, Churn Rate, NPS)
  - Large area chart showing weekly trends
  - Two-column layout below: Activity feed (left), Team performance table (right)

**Visual Style:** Dark Mode Minimal
- Deep dark background (#0f0f0f) with subtle borders (#1f1f1f)
- Minimal use of color, data-focused
- Cards with subtle elevation (no harsh shadows)
- Monospace numbers for data display

**Color Palette:**
- Primary: #ffffff (text)
- Secondary: #71717a (zinc-500, muted text)
- Accent: #22d3ee (cyan-400, for positive metrics)
- Negative: #f87171 (red-400, for negative metrics)
- Background: #0f0f0f
- Card Background: #171717

**Typography:**
- Headings: Space Grotesk, 600
- Body: DM Sans, 400
- Numbers: JetBrains Mono, 500
- Import: https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=DM+Sans&family=JetBrains+Mono:wght@500&display=swap

**Key Components:**
1. KPI Card: Large number with label, sparkline, and delta percentage
2. Area Chart: Gradient fill, grid lines, hover tooltip
3. Activity Feed: Timestamp, user avatar, action description
4. Data Table: Sortable columns, alternating row colors

**Interactions:**
- KPI cards: subtle scale on hover (1.02)
- Chart: crosshair on hover with tooltip
- Table rows: highlight on hover

**Constraints:**
- Use shadcn/ui components (Card, Table, Avatar)
- Use Tailwind CSS
- Use Recharts for the area chart
- Responsive: collapse sidebar on mobile

**Avoid:**
- Purple/blue gradients
- Bright white backgrounds
- Generic card shadows
- Rounded corners larger than 8px

This design should feel focused and professional, memorable for its data-dense yet clean presentation.
```

---

## Example 2: E-commerce Landing Page

### 入力要件
```yaml
project_type: landing-page
target_user: 20-30代女性、ファッション好き
purpose: 新作コレクション紹介
tone_keywords: elegant, modern, aspirational
references: Everlane, COS
axes: {density: 2, tone: 3, era: 4, saturation: 2}
style: Editorial Minimal
```

### v0プロンプト
```
Create a fashion e-commerce landing page for a new collection launch with the following specifications:

**Layout Structure:**
- Sticky header with logo (center), nav (left), cart icon (right)
- Full-screen hero with large product image and minimal text overlay
- 2-column asymmetric grid for featured products (60/40 split)
- Full-width lookbook section with horizontal scroll
- Newsletter signup with minimal form
- Footer with 4 columns

**Visual Style:** Editorial Minimal
- Magazine-like editorial feel
- Large typography, generous whitespace
- Photography-focused with minimal UI chrome
- Asymmetric layouts creating visual tension

**Color Palette:**
- Primary: #1a1a1a (near black text)
- Secondary: #737373 (neutral-500)
- Accent: #dc2626 (red-600, for sale/new badges)
- Background: #fafafa
- Card Background: #ffffff

**Typography:**
- Headings: Cormorant Garamond, 500, uppercase with letter-spacing: 0.1em
- Body: DM Sans, 400
- Import: https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=DM+Sans&display=swap

**Key Components:**
1. Hero: Full-height image with text overlay at bottom-left, "Shop Now" link
2. Product Card: Image (aspect-ratio 3/4), product name below, price, no border
3. Lookbook: Horizontal scroll container with large images
4. Newsletter: Single email input with arrow submit button

**Interactions:**
- Hero text fades in on load
- Product images: slight zoom on hover (scale 1.05, overflow hidden)
- Horizontal scroll: smooth snapping
- Links: underline animation on hover

**Constraints:**
- Use shadcn/ui components (Button, Input)
- Use Tailwind CSS
- Mobile-first responsive design
- Lazy loading for images

**Avoid:**
- Bright accent colors
- Heavy drop shadows
- Rounded corners (use sharp edges)
- Cluttered product information

This design should feel sophisticated and editorial, memorable for its use of whitespace and typography hierarchy.
```

---

## Example 3: Mobile Fintech App

### 入力要件
```yaml
project_type: mobile-fintech
target_user: 20-30代、投資初心者
purpose: 資産管理と投資
tone_keywords: trustworthy, modern, friendly
references: Revolut, Robinhood
axes: {density: 3, tone: 3, era: 4, saturation: 3}
style: Clean Fintech
```

### v0プロンプト
```
Create a mobile fintech app home screen for beginner investors with the following specifications:

**Layout Structure (Mobile: 375px width):**
- Status bar safe area at top
- Header with greeting and profile avatar
- Main balance card (prominent)
- Quick action buttons row (4 buttons)
- Portfolio summary with mini chart
- Recent transactions list
- Bottom navigation (5 items)

**Visual Style:** Clean Fintech
- Trustworthy with modern, approachable feel
- Cards with subtle shadows and rounded corners
- Clear data hierarchy
- Friendly use of color for status indicators

**Color Palette:**
- Primary: #1e293b (slate-800)
- Secondary: #64748b (slate-500)
- Positive: #22c55e (green-500)
- Negative: #ef4444 (red-500)
- Accent: #6366f1 (indigo-500)
- Background: #f1f5f9 (slate-100)
- Card Background: #ffffff

**Typography:**
- Headings: Plus Jakarta Sans, 700
- Body: Plus Jakarta Sans, 400
- Numbers: Plus Jakarta Sans, 600 (tabular-nums)
- Import: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap

**Key Components:**
1. Balance Card: Large balance number, "View Details" link, subtle gradient overlay
2. Quick Actions: Icon + label, circular background, grid of 4
3. Portfolio Chart: Mini area chart with positive/negative color
4. Transaction Item: Icon, merchant name, amount, timestamp

**Interactions:**
- Balance card: press to reveal/hide balance
- Quick actions: haptic feedback simulation (scale 0.95 on press)
- Pull to refresh indicator
- Smooth transitions between states

**Constraints:**
- Use React Native / React components
- Use Tailwind CSS (or NativeWind concepts)
- Touch targets minimum 44x44px
- Safe area insets for notch/home indicator

**Avoid:**
- Overly complex charts
- Too many colors
- Small touch targets
- Information overload

This design should feel trustworthy and approachable, memorable for its clarity and ease of understanding financial data.
```

---

## Example 4: Creative Agency Portfolio

### 入力要件
```yaml
project_type: portfolio
target_user: ブランド担当者、マーケター
purpose: クリエイティブ実績のショーケース
tone_keywords: bold, creative, memorable
references: Pentagram, Collins
axes: {density: 2, tone: 4, era: 4, saturation: 4}
style: Neo Brutalism
```

### v0プロンプト
```
Create a creative agency portfolio website with the following specifications:

**Layout Structure:**
- Fixed header with logo (left) and menu button (right)
- Full-screen hero with agency name in massive typography
- Project grid with varying sizes (Bento-style)
- About section with team photos
- Contact section with bold CTA
- Minimal footer

**Visual Style:** Neo Brutalism
- Bold, unapologetic design choices
- Heavy borders, stark contrasts
- Intentional "rawness"
- Typography as the main visual element

**Color Palette:**
- Primary: #000000
- Secondary: #ffffff
- Accent 1: #ff3333 (bright red)
- Accent 2: #ffff00 (yellow)
- Accent 3: #00ff00 (green)
- Background: #ffffff

**Typography:**
- Display: Bebas Neue, 400, very large (clamp(4rem, 15vw, 12rem))
- Headings: Space Grotesk, 700
- Body: Space Grotesk, 400
- Import: https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;700&display=swap

**Key Components:**
1. Hero: Full-screen with massive text, animated underline
2. Project Card: Image with thick black border, title overlay on hover
3. Menu: Full-screen overlay with large navigation links
4. Contact CTA: Bold button with hard shadow

**Interactions:**
- Hero text: letter-by-letter reveal animation
- Project cards: border color change on hover
- Menu: slide-in from right with stagger
- Cursor: custom cursor that changes on interactive elements

**Constraints:**
- Use shadcn/ui components
- Use Tailwind CSS
- No smooth corners (border-radius: 0)
- Heavy animations with Framer Motion

**Avoid:**
- Subtle design choices
- Pastel colors
- Rounded corners
- Generic stock imagery

This design should feel bold and unapologetic, memorable for its typographic impact and confident use of color.
```

---

## Example 5: Japanese SaaS Product

### 入力要件
```yaml
project_type: saas-app
target_user: 日本の中小企業経営者（40-50代）
purpose: 経費精算システム
tone_keywords: trustworthy, efficient, japanese
references: freee, MoneyForward
axes: {density: 4, tone: 1, era: 3, saturation: 2}
style: Japanese Corporate
```

### v0プロンプト
```
Create a Japanese expense management SaaS application with the following specifications:

**Layout Structure:**
- Top navigation bar with logo, main menu, notifications, user
- Breadcrumb below navigation
- Left sidebar with secondary navigation (collapsible)
- Main content area with:
  - Page title and action buttons
  - Filter bar
  - Data table with expense entries
  - Summary panel on right (optional)

**Visual Style:** Japanese Corporate
- High information density
- Trust-building, conservative design
- Clear status indicators
- Efficient use of space

**Color Palette:**
- Primary: #003c71 (corporate blue)
- Secondary: #5a5a5a
- Accent: #0066cc (action blue)
- Success: #00875a
- Warning: #f59e0b
- Error: #dc2626
- Background: #f5f5f5
- Card Background: #ffffff

**Typography:**
- Headings: Noto Sans JP, 700
- Body: Noto Sans JP, 400
- Numbers: Roboto Mono, 500 (for amounts)
- Base size: 14px (Japanese text needs larger base)
- Line height: 1.8 (wider for Japanese)
- Import: https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto+Mono:wght@500&display=swap

**Key Components:**
1. Data Table: Dense rows, sortable headers, status badges, bulk actions
2. Filter Bar: Date range picker, status dropdown, search input
3. Status Badge: Color-coded (申請中/承認済/差戻し/精算済)
4. Summary Card: Total amount, count by status

**Japanese-Specific Elements:**
- ステータス表示: 申請中（青）、承認待ち（黄）、承認済（緑）、差戻し（赤）
- 日付形式: YYYY年MM月DD日
- 金額形式: ¥1,234,567（3桁区切り）
- 敬語レベル: です・ます調

**Interactions:**
- Table rows: highlight on hover, click to expand details
- Filters: instant apply
- Form validation: inline error messages in Japanese

**Constraints:**
- Use shadcn/ui components (Table, Badge, DatePicker)
- Use Tailwind CSS
- WCAG AA compliance
- Support for keyboard navigation

**Avoid:**
- Excessive whitespace
- Playful or casual tone
- Rounded corners larger than 4px
- Bright accent colors

This design should feel trustworthy and efficient, memorable for its clear organization and professional Japanese business aesthetic.
```

---

## プロンプト構成のベストプラクティス

### 必須セクション
1. **Layout Structure**: 具体的な構造の説明
2. **Visual Style**: スタイル名と特徴
3. **Color Palette**: HEXコード付きで明示
4. **Typography**: フォント名、ウェイト、importURL
5. **Key Components**: 主要コンポーネントの詳細
6. **Constraints**: 技術的制約

### 推奨セクション
7. **Interactions**: ホバー、アニメーション
8. **Avoid**: 避けるべきパターン
9. **Memorable element**: 最後に印象的な一文

### 避けるべきこと
- 曖昧な指示（「モダンな感じで」）
- 矛盾する指示
- 過度に長いプロンプト（2000語以下推奨）
- 技術的に不可能な要求
