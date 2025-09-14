type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = { success: false; error: string };

export type ServerActionResponse<T> = Promise<SuccessResponse<T> | ErrorResponse>;
