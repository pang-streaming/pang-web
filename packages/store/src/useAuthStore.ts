import { create } from "zustand"

interface MemberData {
  id: number
  userName: string
}

interface TokenData {
  accessToken: string
  refreshToken: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  memberData?: MemberData | null
  setAccessToken: (accessToken: string) => void
  setRefreshToken: (refreshToken: string) => void
  setMemberData: (memberData: MemberData) => void
  clearTokenData: () => void
  setTokenData: (tokenData: TokenData) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken:
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : "",
  refreshToken:
    typeof window !== "undefined" && localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : "",
  memberData: undefined,
  setAccessToken: (accessToken) => set({ accessToken:accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken:refreshToken }),
  setMemberData: (memberData) => set({ memberData: memberData}),
  setTokenData: (tokenData:TokenData) => {
    localStorage.setItem("accessToken", tokenData.accessToken)
    localStorage.setItem("refreshToken", tokenData.refreshToken)
    set({
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken
  })},
  clearTokenData: () => {
    localStorage.setItem("accessToken", "")
    localStorage.setItem("refreshToken", "")
    set({
      accessToken: null,
      refreshToken: null
  })}
}))