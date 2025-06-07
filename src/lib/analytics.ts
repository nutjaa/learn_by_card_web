export function trackPageView(page: string) {
  if (typeof window !== 'undefined') {
    // Add your analytics tracking here
    console.log(`Page view: ${page}`);
  }
}

export function trackError(error: Error, context?: string) {
  if (typeof window !== 'undefined') {
    console.error(`Error tracked: ${error.message}`, { error, context });
    // Send to your error monitoring service
  }
}
