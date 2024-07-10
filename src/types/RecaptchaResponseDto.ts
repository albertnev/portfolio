export interface RecaptchaResponseDto {
  challenge_ts: string;
  "error-codes": string[];
  hostname: string;
  success: boolean;
}
