import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import axios from "axios"

export default function RedirectPage() {
  const { code } = useParams()

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(false)

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(
          `https://1qnuwglmkg.execute-api.us-east-1.amazonaws.com/${code}`
        )

        const destination =
          response.request.responseURL

        setTimeout(() => {
          window.location.href = destination
        }, 5000)
      } catch (error) {
        console.error(error)

        setError(true)
      } finally {
        setLoading(false)
      }
    }

    redirect()
  }, [code])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl border bg-white p-10 shadow">
          <h1 className="text-2xl font-bold">
            Link not found
          </h1>

          <p className="mt-2 text-gray-500">
            The short URL does not exist.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Redirecting...
      </h1>

      <p className="text-gray-500">
        Please wait while we redirect you.
      </p>

      {loading && (
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent" />
      )}
    </div>
  )
}