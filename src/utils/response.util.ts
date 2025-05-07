export function handleResponse(message: string, result?: any) {
    return {
      message,
      result: result ?? null,
    };
  }
  