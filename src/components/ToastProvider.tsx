// Toast *triggering* is app-level (apps wire their own toast lib, e.g. sonner), so the
// design system stays toast-library-agnostic. This intentional no-op placeholder keeps
// the module present without a hard dependency. Not exported from the package index.
export function ToastProvider() {
  return null
}
