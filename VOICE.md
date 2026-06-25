# Pulse Voice & Microcopy Guide (SH-4)

The single source of truth for how the Pulse family *sounds*. These are serious finance,
health, and home apps — confidence matters — but they should feel like a sharp, friendly
expert, not a form. Warm, human, lightly informal. **Never** cutesy, never corporate, no
drama, no forced cheer, no emoji spam.

North star: the LifePulse daily-synthesis voice — executive, factual, a touch informal.

## The three reusable moments

| Moment | Formula | Do | Don't |
|---|---|---|---|
| **Success** (`toast.success`) | outcome + next step | "Category created — use it on your next transaction." | "Success!" / "Saved." |
| **Error** (`toast.error`, `PageErrorState`) | what broke (no blame) + how to fix | "That didn't save — try again or refresh." | "Error: request failed (500)." |
| **Empty / first-run** (`EmptyState`) | acknowledge state + the one next action | "No accounts yet — let's add one." + a clear CTA | "No data." |

## Principles

1. **Active voice, second person.** "We're pulling your latest transactions…" beats
   "Transactions are being fetched."
2. **Name the specific thing.** Amounts, names, dates, counts — never "an item" when you
   can say "the $84.20 electric bill, due Tuesday."
3. **No blame on errors.** The app failed the user, not the reverse. Offer the fix.
4. **One next step, not three.** Empty states and toasts point to a single obvious action.
5. **Confidence without hype.** State outcomes plainly; skip exclamation marks and "🎉".
6. **Don't narrate the machine.** Users don't care about Stagehand steps or ingest
   heartbeats. Tell them what it means for them ("check back in a few minutes").

## Reach for the primitive, not a hand-roll

- Confirmation / feedback → `useToast()` (`success` / `error` / `info`, optional Undo action).
- Loading → `Skeleton` / `SkeletonText` / `SkeletonCard` / `SkeletonStat` / `SkeletonTable`
  (layout-matched so content doesn't reflow), not a bare spinner where a shape is known.
- Empty / first-run → `EmptyState` (centered, with CTA) or `PageEmptyState` (card).
- Pending buttons → `<Button loading loadingLabel="Saving…">`, never a bare "Loading".

Keep the design-guard green: `@niyi/ui` primitives + teal / Plus Jakarta / DM Serif tokens,
no raw `slate-*` / `gray-*` / hex, no inline `style={{}}` for color/layout.
