export type { ApiResponse };

declare global {
  interface ApiResponse<T> {
    status: boolean;
    result: T;
  }
}
