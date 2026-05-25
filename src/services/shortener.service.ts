import axios from "axios"

const API_URL =
  "https://1qnuwglmkg.execute-api.us-east-1.amazonaws.com/shorten"

export async function shortenUrl(url: string) {
  const response = await axios.post(API_URL, {
    url,
  })

  return response.data.data
}