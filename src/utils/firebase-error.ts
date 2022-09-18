interface IFirebaseError extends Error {
  code: string;
  message: string;
  stack?: string;
}

export function isFirebaseError(err: any): err is IFirebaseError {
  return err.code && err.code.startsWith('auth/');
}
