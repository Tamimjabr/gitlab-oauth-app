import axios from "axios"

export interface GitlabUserInfo {
  id: number,
  name: string,
  username: string
  email: string,
  avatar_url: string
  last_activity_on: string
}

export const getGitlabUserInfo = async (accessToken: string) => {
  try {
    const url = "https://gitlab.lnu.se/api/v4/user"

    const response = await axios.get<GitlabUserInfo>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    return response.data

  } catch (error: any) {

    throw new Error("Failed to get GitLab user info")
  }
}