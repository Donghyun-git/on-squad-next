export interface ResponseModel {
  success: boolean;
  error?: {
    message: string;
  };
}
