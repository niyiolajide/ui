interface LoadingSpinnerProps {
  message?: string
  fullPage?: boolean
  className?: string
}

export default function LoadingSpinner({ message = 'Loading...', fullPage = true, className }: LoadingSpinnerProps) {
  const content = (
    <div className="text-center" role="status">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">{message}</p>
    </div>
  )

  if (fullPage) {
    return (
      <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center${className ? ` ${className}` : ''}`}>
        {content}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center py-12${className ? ` ${className}` : ''}`}>
      {content}
    </div>
  )
}
