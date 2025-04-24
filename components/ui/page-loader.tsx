export function PageLoader({ message = "Wird geladen..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 rounded-full border-salmon border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg font-medium text-foreground">{message}</p>
      </div>
    </div>
  )
}
