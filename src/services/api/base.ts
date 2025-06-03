export abstract class BaseApiService {
  // Use proxy URLs for development, direct URLs for production
  protected getPublicUrl(): string {
    // Server-side: use direct API URL
    if (typeof window === 'undefined') {
      return 'https://www.learnbycards.com/api/public/v1';
    }

    // Client-side: use proxy in development, direct in production
    return process.env.NODE_ENV === 'development'
      ? '/api/proxy/public'
      : 'https://www.learnbycards.com/api/public/v1';
  }

  protected getPrivateUrl(): string {
    if (typeof window === 'undefined') {
      return 'https://www.learnbycards.com/api/auth/v1';
    }

    return process.env.NODE_ENV === 'development'
      ? '/api/proxy/auth'
      : 'https://www.learnbycards.com/api/auth/v1';
  }

  protected get publicUrl() {
    return this.getPublicUrl();
  }

  protected get privateUrl() {
    return this.getPrivateUrl();
  }

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
    return localStorage.getItem('authToken');
  }

  protected handleUnauthorized(): void {
    localStorage.removeItem('authToken');
    console.warn('Unauthorized access detected');
  }
}
