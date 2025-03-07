type Status = 'success' | 'fail' | 'error';

interface JSend<S extends Status> {
  status: S;
  message?: string;
  data?: object;
}

interface JSendSuccess extends JSend<'success'> {
  data: object;
}

interface JSendFail extends JSend<'fail'> {
  data: object;
}

interface JSendError extends JSend<'error'> {
  message: string;
}

export type JSendObject = JSendSuccess | JSendFail | JSendError;
