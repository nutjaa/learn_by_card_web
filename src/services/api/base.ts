export abstract class BaseApiService {
  protected publicUrl = 'https://www.learnbycards.com/api/public/v1';
  protected privateUrl = 'https://www.learnbycards.com/api/auth/v1';

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {},
    usePrivateApi: boolean = false
  ): Promise<T> {
    const baseUrl = usePrivateApi ? this.privateUrl : this.publicUrl;

    const headers: Record<string, string> = {
      accept: 'application/ld+json',
      'Content-Type': 'application/json',
    };

    // Add authentication headers for private API
    if (usePrivateApi) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access
        this.handleUnauthorized();
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected getAuthToken(): string | null {
    // Get token from localStorage, sessionStorage, or your auth store
    return localStorage.getItem('authToken');
  }

  protected handleUnauthorized(): void {
    // Handle unauthorized access (redirect to login, clear token, etc.)
    localStorage.removeItem('authToken');
    // You might want to redirect to login page or emit an event
    console.warn('Unauthorized access detected');
  }
}
