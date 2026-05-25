import axios from "axios"

const API_URL =
  "https://1qnuwglmkg.execute-api.us-east-1.amazonaws.com"

export async function getStats(code: string) {
  const response = await axios.get(
    `${API_URL}/stats/${code}`
  )

  return response.data
}