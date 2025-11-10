export interface IDonationRequest {
  username: string
  amount: number
}

export interface IDonationResponse {
  status: string
  message: string
  timestamp: string
}

