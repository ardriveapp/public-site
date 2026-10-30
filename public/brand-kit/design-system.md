# ArDrive design system

Version 2026-10-28. Human page: https://ardrive.io/brand-kit/. Machine
summary: https://ardrive.io/brand-kit/agents.json.

This is the standard every ArDrive app is built to: the web app, the desktop
app and anything new. It gives values (hex, px, weights) and rules, not code,
so it applies on any platform. The web app implements it in Flutter in the
`ardrive_ui` package (github.com/ardriveapp/ardrive-web, `packages/ardrive_ui`);
where the two disagree, report it rather than picking one.

The brand layer under it, the six brand colours, Wavehaus and the logos, is on
the brand kit page. This document adds what a product needs on top: themes,
tokens, type scale, spacing, components and copy.

## 1. Principles

- **Use the system's pieces.** Build screens from the components below. When
  one falls short, fix the component so every screen gets the fix; don't draw
  a one-off.
- **Every colour is a token, in both themes.** Dark is the default theme and
  light is first class. A literal colour looks right in one theme only.
- **Minimal text.** Cut any description that restates its label. No em
  dashes anywhere, code comments included.
- **Show a balance, wallet or address only where the user acts on it.** Never
  add one for information.
- **A phone browser is first class.** Every screen works at 390 px wide.
- **Accessible by default.** Text meets WCAG AA (4.5:1). Every control is
  reachable by keyboard, shows a focus ring and is named for a screen reader.

## 2. Colour

### 2.1 Brand palette

| Name | Hex | Use |
|---|---|---|
| Onyx | `#121212` | Dark background |
| Alabaster | `#FAFAFA` | Text and foreground on dark |
| Primary | `#D31721` | CTAs, primary buttons, key accents |
| Ruddy | `#FE0230` | The logo mark, decorative highlights and glows. Not for buttons: white on Ruddy is about 4.0:1 and fails AA |
| Success | `#18A957` | Success states |
| Info | `#3142C4` | Info states |

There is no brand warning or error colour. Errors use the reds (Primary and
its ladder). Warnings are neutral: a raised surface, its edge and normal text,
with a warning icon carrying the meaning. Never add a yellow, orange or pink.

### 2.2 Theme tokens

Surfaces stack from `L0` (the page) up to `L3` (dialogs). `raised` is a card
one step above whatever it sits on, in both themes. Light-theme surface greys
carry a slight warm tint toward the brand red; text and icon greys stay
neutral.

| Token | Dark | Light | Use |
|---|---|---|---|
| `container-l0` | `#080808` | `#F8F6F7` | Page background |
| `container-l1` | `#0D0D0D` | `#EDEAEB` | Panels, navigation |
| `container-l2` | `#121212` | `#E0DCDE` | Cards on a panel |
| `container-l3` | `#171717` | `#E0DCDE` | Dialogs, sheets, menus |
| `container-raised` | `#1F1F1F` | `#FFFFFF` | A card raised above its surroundings |
| `container-red` | `#D31721` | `#D31721` | The dialog's top band |
| `text-high` | `#E0E0E0` | `#3B3B3B` | Body text, titles |
| `text-mid` | `#A6A6A6` | `#4F4F4F` | Secondary text, descriptions |
| `text-low` | `#7D7D7D` | `#666666` | Labels, captions, metadata |
| `text-xlow` | `#424241` | `#8A8A8A` | Placeholders, disabled text |
| `text-link` | `#A6A6A6` | `#4F4F4F` | Links (underlined) |
| `text-on-primary` | `#FFFFFF` | `#F8F6F7` | Text on a primary button |
| `text-red` | `#D42C35` | `#D42C35` | Destructive text |
| `stroke-low` | `rgba(237,237,237,0.08)` | `rgba(30,0,10,0.12)` | Dividers |
| `stroke-mid` | `rgba(237,237,237,0.12)` | `rgba(30,0,10,0.16)` | Field and card edges |
| `stroke-high` | `rgba(237,237,237,0.16)` | `#D1CBCE` | Focused or hovered edges |
| `stroke-red` | `#C0151E` | `#DF565D` | Error edges |
| `button-primary` | `#D31721` | `#D31721` | Primary button; hover dark `#C0151E` / light `#DF565D`, press dark `#9A1118` / light `#E78086` |
| `button-secondary` | `rgba(237,237,237,0.08)` | `rgba(30,0,10,0.08)` | Secondary button, a tint of whatever it sits on; hover 0.12, press 0.16 |
| `button-outline` | transparent | transparent | Outline button; hover dark `#2E2E2E` / light `rgba(30,0,10,0.12)` |
| `button-disabled` | `#2E2E2E` | `#D1CBCE` | Any disabled button |
| `input` | `#0D0D0D` | `#EDEAEB` | Text field fill |
| `input-disabled` | `#121212` | `#D1CBCE` | Disabled field fill |
| `icon-low` | `#5E5E5E` | `#8A8A8A` | Quiet icons |
| `icon-mid` | `#A6A6A6` | `#666666` | Most icons |
| `icon-high` | `#FFFFFF` | `#4F4F4F` | Emphasised icons |
| `scrim` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | Behind a dialog or a bottom sheet |

### 2.3 Status colours

Each status has a foreground (icon, emphasis), a container (fill) and a
stroke (edge). Body text on a status container stays `text-high`. Every pair
meets AA in both themes.

| Status | Dark fg / container / stroke | Light fg / container / stroke |
|---|---|---|
| Info | `#8B98F9` / `#111833` / `#253293` | `#3142C4` / `#ECEEFE` / `#B1BAFB` |
| Success | `#18A957` / `#052211` / `#0A4423` | `#11763D` / `#F4FBF7` / `#D1EEDD` |
| Error | `#DF565D` / `#260406` / `#730D12` | `#C0151E` / `#FCF9FA` / `#F2B6B9` |
| Warning | `#E0E0E0` / `#1F1F1F` / `rgba(237,237,237,0.16)` | `#3B3B3B` / `#FFFFFF` / `#D1CBCE` |

Info and success are the brand hues, lightened or darkened only where the
brand value can't be read on its container. Warning is deliberately grey.

### 2.4 As CSS custom properties

```css
:root, [data-theme="dark"] {
  --container-l0: #080808; --container-l1: #0D0D0D; --container-l2: #121212;
  --container-l3: #171717; --container-raised: #1F1F1F; --container-red: #D31721;
  --text-high: #E0E0E0; --text-mid: #A6A6A6; --text-low: #7D7D7D; --text-xlow: #424241;
  --text-link: #A6A6A6; --text-on-primary: #FFFFFF; --text-red: #D42C35;
  --stroke-low: rgba(237,237,237,0.08); --stroke-mid: rgba(237,237,237,0.12);
  --stroke-high: rgba(237,237,237,0.16); --stroke-red: #C0151E;
  --button-primary: #D31721; --button-primary-hover: #C0151E; --button-primary-press: #9A1118;
  --button-secondary: rgba(237,237,237,0.08); --button-secondary-hover: rgba(237,237,237,0.12);
  --button-secondary-press: rgba(237,237,237,0.16); --button-disabled: #2E2E2E;
  --input: #0D0D0D; --input-disabled: #121212;
  --icon-low: #5E5E5E; --icon-mid: #A6A6A6; --icon-high: #FFFFFF;
  --info-fg: #8B98F9; --info-container: #111833; --info-stroke: #253293;
  --success-fg: #18A957; --success-container: #052211; --success-stroke: #0A4423;
  --error-fg: #DF565D; --error-container: #260406; --error-stroke: #730D12;
  --warning-fg: #E0E0E0; --warning-container: #1F1F1F; --warning-stroke: rgba(237,237,237,0.16);
  --scrim: rgba(0,0,0,0.5); --shadow: rgba(13,13,13,0.9);
}
[data-theme="light"] {
  --container-l0: #F8F6F7; --container-l1: #EDEAEB; --container-l2: #E0DCDE;
  --container-l3: #E0DCDE; --container-raised: #FFFFFF; --container-red: #D31721;
  --text-high: #3B3B3B; --text-mid: #4F4F4F; --text-low: #666666; --text-xlow: #8A8A8A;
  --text-link: #4F4F4F; --text-on-primary: #F8F6F7; --text-red: #D42C35;
  --stroke-low: rgba(30,0,10,0.12); --stroke-mid: rgba(30,0,10,0.16);
  --stroke-high: #D1CBCE; --stroke-red: #DF565D;
  --button-primary: #D31721; --button-primary-hover: #DF565D; --button-primary-press: #E78086;
  --button-secondary: rgba(30,0,10,0.08); --button-secondary-hover: rgba(30,0,10,0.12);
  --button-secondary-press: rgba(30,0,10,0.16); --button-disabled: #D1CBCE;
  --input: #EDEAEB; --input-disabled: #D1CBCE;
  --icon-low: #8A8A8A; --icon-mid: #666666; --icon-high: #4F4F4F;
  --info-fg: #3142C4; --info-container: #ECEEFE; --info-stroke: #B1BAFB;
  --success-fg: #11763D; --success-container: #F4FBF7; --success-stroke: #D1EEDD;
  --error-fg: #C0151E; --error-container: #FCF9FA; --error-stroke: #F2B6B9;
  --warning-fg: #3B3B3B; --warning-container: #FFFFFF; --warning-stroke: #D1CBCE;
  --scrim: rgba(0,0,0,0.5); --shadow: rgba(48,49,51,0.1);
}
```

## 3. Typography

### 3.1 Faces

**Wavehaus** is the face for all text except the monospace cases below. It is
a licensed face: ArDrive apps get the font files from the ArDrive team, and
everyone else uses the fallback stack
`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial,
sans-serif`.

| Wavehaus cut | CSS weight | Use |
|---|---|---|
| 158 ExtraBold | 800 | Marketing headlines only (the website), not in the apps |
| 128 Bold | 700 | Titles: dialog and page headings |
| 95 SemiBold | 600 | Labels, buttons, emphasis |
| 66 Book | 400 | Body text, the default |
| 42 Light | 300 | Large figures only: amounts, sizes and counts at heading sizes, where the figure is the point of its block |

Text with no weight set is always Book, never Light. The font files
themselves declare Light as 400 and Book as 500, so a web page declares the
CSS weights above in `@font-face`, and an app that cannot (the Flutter apps,
whose renderer reads the files) makes Book its theme's default instead. The
28 Thin cut is never used.

A figure in Light sits beside its unit in Book or SemiBold at a smaller size
("7.8766 credits", "$42.00 USD"), set as one line of text that wraps, never
as two boxes that can overflow.

Wavehaus figures are proportional: a 1 is half as wide as a 0, and the face
has no tabular figures. Right-align a column of numbers, and give a figure
that changes in place (a percentage, a counter, a balance) a fixed width, so
nothing beside it moves.

Wavehaus covers Latin only. Other scripts (Hindi, Japanese, Chinese) are set
in the system's font through the fallback stack.

**Roboto Mono Regular** (OFL) is for exactly two kinds of text:

- code, text-file previews and note editors, where columns must line up;
- transaction, file and drive IDs, wallet addresses and keys, whole or
  shortened (`abc123...xyz9`), where every character must be told apart.

An ArNS, ENS or SNS name is a name and stays in Wavehaus; the address under it
is monospace. Set monospace a step smaller than the text beside it (13 px
next to 14 px body), where it reads the same size.

### 3.2 Scale

Phone sizes apply under 834 px wide.

| Style | Desktop px / line height | Phone px |
|---|---|---|
| display | 45 / 1.3 | 30 |
| heading1 | 36 / 1.3 | 28 |
| heading2 | 28 / 1.3 | 26 |
| heading3 | 25 / 1.3 | 23 |
| heading4 | 22 / 1.4 | 21 |
| heading5 | 20 / 1.4 | 19 |
| heading6 | 18 / 1.4 | 16 |
| paragraph-xxl | 20 / 1.4 | 19 |
| paragraph-xl | 18 / 1.5 | 16 |
| paragraph-l | 16 / 1.5 | 15 |
| paragraph-normal | 14 / 1.5 | 13 |
| paragraph-small | 12 / 1.5 | 12 |
| caption | 11 / 1.5 | 10 |
| code | 13 / 1.5 | 12 |

Dialog titles are heading3 Bold. Body copy is paragraph-normal Book. Field
labels are paragraph-normal SemiBold in `text-low`. Button labels are
paragraph-l SemiBold.

## 4. Space, shape and depth

**Spacing scale**, and nothing in between:

| Token | px | Use |
|---|---|---|
| `xxs` | 4 | Icon to label; two lines of one item |
| `xs` | 8 | Related items: buttons in a row, a label and its field |
| `sm` | 12 | Inside a compact surface: a notice, a list row |
| `md` | 16 | Card padding; the page gutter on a phone |
| `lg` | 24 | Between groups in a dialog or page; a dialog's padding |
| `xl` | 32 | Between sections of a page |
| `xxl` | 48 | Around an empty state or a page's main block |

**Corner radii**, and nothing in between:

| Token | px | Use |
|---|---|---|
| `sm` | 4 | Small controls: checkboxes, segments, chips |
| `control` | 6 | Buttons and text fields |
| `md` | 8 | Cards, notices, segmented controls and menus |
| `lg` | 12 | Dialogs, sheets and large panels |

**Elevation** (shadow colour from the theme, section 2.4):

| Level | Offset y / blur |
|---|---|
| 20 | 0 / 1 |
| 40 | 2 / 4 |
| 60 | 4 / 8 |
| 80 | 8 / 16 |
| 100 | 16 / 24 |

Dialogs use 80. Pick a level by how far a surface floats above the one
under it.

**Breakpoint:** one, at 834 px. Under it, phone type sizes, a 16 px gutter,
dialogs full width and a bottom sheet in place of the New menu.

## 5. Components

### Buttons

Three variants: **primary** (filled `button-primary`, `text-on-primary`
label) for the one main action of a view; **secondary** (the translucent
tint) for everything else; **outline** (transparent with a `stroke-mid` edge)
where a tint would be too heavy. A button is sized to its label unless it
fills its container. Corner radius 6.

Three heights, chosen by where the button sits, so every button in one place
is the same height:

| Size | Height | Where |
|---|---|---|
| compact | 36 | Inside a card, banner, list row or notice |
| regular | 40 | Dialog actions, toolbars, anywhere else |
| large | 48 | A full-width button that is a page's main action (sign in, an empty page) |

### Dialogs

A 6 px `container-red` band across the top, then the title (heading3 Bold)
with a close button on the right (named "Close" for screen readers), an
optional one-line description in `text-mid`, the content, and the action row.
Padding 24 horizontal. Surface `container-l3`, radius 12, elevation 80, over
the scrim.

The action row is right-aligned. The last action is primary. Cancel and
Close are dismiss actions: secondary, never red, even when alone. A disabled
action looks disabled and can't be pressed. Long content scrolls inside the
dialog and the actions stay reachable.

Errors show inside the dialog that failed (a notice, with a way to fix or
retry), never as a second dialog on top. On a phone, a dialog may be a bottom
sheet with the same title, spacing and action row.

### Text fields

Fill `input`, a 1 px `stroke-mid` edge, radius 6, 20 px side padding, 49 px
tall. Focused: `stroke-high`. Error: `stroke-red`, with the message
under the field. Label above in paragraph-normal SemiBold `text-low`; a
required field's label ends in " *". A field that takes an ID or key uses
monospace text and keeps the height of the other fields. Every field in a
form is the same height.

### Select fields

Pick one of a list in a form. Drawn as a text field is, at the same height,
with the label above, the value in the field and a down arrow at its right.
It opens a menu under it, at least as wide, of choice rows (Menus, below).
A select that isn't in a form, such as a unit beside an amount, is a button
that opens the same menu.

### Segmented control

Pick one of a few. 40 px tall, a `container-raised` track with a
`stroke-mid` edge and radius 8; the chosen segment is filled `text-mid` with
its label in `container-raised`, the others are plain. Either it shares the width
equally (a row of amounts) or it hugs its labels (a two-way switch). Each
segment is a button for screen readers and says whether it is chosen.

### Notices

A message with a meaning: info, warning, error or success, from section 2.3.
A 20 px status icon, an optional SemiBold title, the text in `text-high`, an
optional compact action and close button. Inline it is a box with radius 8
and 12 px padding; as a banner it spans the width without corners and with
16 px side padding.

### Links

Underlined `text-link`. Reachable by keyboard and announced as a link. A link
that leaves the app carries the new-window icon. A link that performs an
action (Copy, Apply) is announced as a button.

### Feedback and state

- **Spinner:** 16 px inside buttons and rows, 32 px on its own.
- **Progress bar:** 4 px; indeterminate when progress isn't known.
- **Empty state:** an icon, a heading, one line of text and up to two
  actions, with `xxl` space around it.
- **Copy field:** a read-only field with a Copy link; a secret is masked
  behind a reveal toggle.

### Menus

Every menu is the same card: radius `md`, elevation 80, the menu surface
from the table under Lists and tables, items in `text-high` with an icon or
checkbox before the label. A menu opens beside the button that opened it
and flips to stay on the screen; a nested menu opens beside its item. Escape
or a click outside closes it, and a click outside still reaches what it lands
on. A
screen reader reads a menu's items after the page, and with the
accessibility tree on, a click on an item runs that item, not the row behind
it. Under 834 px, a long menu that starts things (New) is a bottom sheet;
row menus stay menus.

A menu of actions groups its items, with a 1 px `stroke-low` line and 4 px
above and below it between groups. The line takes no click and a screen
reader skips it. A drive, a folder and a file each have one menu, the same
wherever it opens (its row, the page header, the details panel, a phone), in
this order. An item that doesn't apply is left out, never shown disabled for
good:

- **Drive:** Share, Publish to web | Download, Export contents | Rename,
  Create snapshot, Hide | Sync, Full resync | More info | Detach. Until this
  device has synced the drive, only what doesn't need its contents shows.
- **Folder:** Open | Share, Publish to web | Download | Rename, Move, Add
  license, Hide | More info.
- **File:** Preview | Share, Publish to web | Download | Rename (Edit for a
  note), Move, Add license, Hide | Check upload status (while it uploads),
  More info. A file's name is set inside Publish to web; where nothing
  publishes, Add name stands in its place.

A menu that picks a value uses choice rows: 40 px tall, a 16 px slot before
the label that holds a tick on the current value (so labels line up), the
label in `text-high`, and the menu's hover colour on hover or keyboard
focus. Opened from the keyboard, the menu focuses the current value; Up and
Down move, Enter picks, Escape closes, and focus returns to the button.

### Lists and tables

A click selects and highlights a row. A double-click, a tap on touch, or
Enter opens it. Row actions sit in a menu at the row's end. Items in the left
navigation open on a single click.

| Surface | Dark | Light |
|---|---|---|
| Table | `#121212`, rows `#191919`, hover `#222222`, selected `#2C2C2C` | `#FBF9FA`, rows `#F1EFF0`, hover `#E8E5E7`, selected `#E0DCDE` |
| Menu | `#1F1F1F`, hover `#2C2C2C` | `#FBF9FA`, hover `#F1EFF0` |

## 6. Copy

- Sentence case for every label, button and title.
- Minimal: no description that restates its label, no filler.
- No em dashes.
- Terms:
  - **Turbo Credits** is the product name; after an amount, lowercase
    ("7.8766 credits"). Show credits to 4 decimal places.
  - **free upload allowance**, not "free tier" or "free uploads".
  - **ar.io Console**, with ar.io in lowercase.
  - **address** means a wallet address only, never a name or a web location.
  - **top-up** is the noun, "top up" the verb.
  - **snapshot** is the user's word for a saved drive state.
  - **Winston** is AR's unit only, never Turbo's.
- Errors say what happened and what the user can do. Where money may have
  moved, say so plainly ("No payment was made", or that a network fee may have
  been paid).

## 7. Don'ts

- Don't use a literal or framework colour (`Colors.green`, `#ffcc00`); use a
  token.
- Don't add a warning yellow, orange or pink, or a new status hue.
- Don't use Ruddy for buttons or text.
- Don't put a dialog on top of a dialog.
- Don't draw a menu any other way, such as a framework's popup menu; every
  menu is the one card above.
- Don't set a button height outside the three sizes, or a gap off the
  spacing scale.
- Don't put the wire landscape (Permahills) motif inside the apps.
- Don't use Roboto Slab or any face other than Wavehaus and Roboto Mono.
