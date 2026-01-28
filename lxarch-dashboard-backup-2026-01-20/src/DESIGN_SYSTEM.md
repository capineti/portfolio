# Design Library

---

## About the Library

### LxArch Analytics Design System

This Analytics Design System centralizes the foundations, components, and interaction patterns used across the platform.

The coded components serve as the source of truth. Please check the structure regularly for styles, components (including documentation, usage, availability, and functionality), as well as the latest updates.

---

## 0. Overview
High-level system vision and global decisions.

### Design Principles
- Consistency
- Clarity
- Accessibility-first
- Data-driven UI

### Accessibility
- WCAG compliance level
- Contrast strategy
- Focus and keyboard navigation

### Theming
- Light / Dark mode strategy
- Theme tokens and scope

### Naming & Conventions
- Token naming
- Component naming
- UI-facing data naming

---

## 1. Foundations
Non-negotiable base decisions of the system.

### 1.1 Brand Colors
- Brand colors
- Semantic colors
- OKLCH scales
- Contrast rules

### 1.2 Typography
- Font families
- Type scale
- Line height rules

#### Desktop
| Role | Weight | Size |
|---|---|---|
| Display | Light | 2.5rem |
| H1 | SemiBold | 1.5rem |
| H2 | SemiBold | 1.25rem |
| H3 | Medium | 1.1rem |
| Body | Regular | 1rem |

#### Tablet (Portrait)
| Role | Weight | Size |
|---|---|---|
| Display | Light | 2rem |
| H1 | SemiBold | 1.35rem |
| H2 | SemiBold | 1.15rem |
| H3 | Medium | 1rem |
| Body | Regular | 0.95rem |

#### Mobile
| Role | Weight | Size |
|---|---|---|
| Display | Light | 1.75rem |
| H1 | SemiBold | 1.25rem |
| H2 | SemiBold | 1.1rem |
| H3 | Medium | 0.95rem |
| Body | Regular | 0.9rem |

### Spacing
- Spacing scale
- Layout rhythm
- Margins and paddings

### Elevation
- Surface levels
- Shadow tokens

### Motion
- Durations
- Easings
- Motion principles

---

## 2. Atoms
Small, indivisible UI elements.

- Icons
- Text styles
- Badges
- Loaders
- Dividers
- Status indicators (dot, pill)

---

## 3. Primitives
Interactive but non-composed elements.

- Buttons (primitive)
- Inputs
- Selects
- Toggles
- Checkboxes
- Radio buttons
- Sliders

---

## 4. Molecules
Functional combinations of atoms and primitives.

- Form fields
- Input groups
- Alerts
- Tooltips
- Dropdowns
- Card headers
- Basic KPI blocks

---

## 5. Components
Product-ready UI components.

- Buttons (complete)
- Cards
- Tables
- Lists
- Modals
- Tabs
- Accordions

Each component includes:
- Description
- Variants
- States
- Accessibility notes
- Usage guidelines

---

## 6. Panels
Structural containers for layout and hierarchy.

- Side panels
- Drawers
- Dashboard sections
- Content wrappers
- Page-level layouts

---

## 7. Navigation
Elements that allow movement through the product.

- Top navigation
- Side navigation
- Breadcrumbs
- Pagination
- Step navigation
- Navigation tabs

---

## 8. Interaction
System behavior and feedback patterns.

### States
- Hover
- Focus
- Active
- Disabled

### Feedback
- Loading
- Success
- Error
- Warning

### Empty & Edge States
- No data
- Partial data
- First-time use
- Delayed data

---

## 9. Data & Analytics
Conceptual layer between backend automation and UI.

### Analytics Domains
- Performance analytics
- Activity analytics
- Quality / scoring analytics
- Alerts & thresholds

### Data Flows (Conceptual)
Explains how data is generated and consumed by the UI (without documenting tooling).

- Flow A — Event-driven / Near real-time  
  Triggers alerts, live indicators, and status components.

- Flow B — Aggregated / Scheduled  
  Feeds dashboards, summaries, and trends.

### Data Contracts (UI-facing)
- Expected data structure
- Update frequency
- Reliability assumptions

### Data States
- Loading
- Partial
- Stale
- Error
- Out of sync

### UI Implications
- UI behavior when data is missing or delayed
- What the UI must not infer or fabricate

---

## 10. Data Visualization
Rules and components for representing data.

### Charts
- Line charts
- Bar charts
- Area charts
- Progress indicators

### Tables & KPIs
- Summary tables
- KPI cards
- Comparison views

### Visual Rules
- Color usage for data
- Threshold representation
- Density and readability

---

## Changelog
- Version history
- Breaking changes
- Deprecations
- Migration notes

---

## Contributing
- How to propose changes
- Review and approval process
- Ownership and governance
