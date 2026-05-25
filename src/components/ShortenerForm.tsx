import { useState, type FormEvent } from "react"

import { shortenUrl } from "../services/shortener.service"

import { isValidUrl } from "../utils/validators"

import ResultCard from "./ResultCard"

import LoadingSpinner from "./LoadingSpinner"

export default function ShortenerForm() {
  const [url, setUrl] = useState("")

  const [shortUrl, setShortUrl] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setError("")

    setShortUrl("")

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL")

      return
    }

    try {
      setLoading(true)

      const data = await shortenUrl(url)

      setShortUrl(data.shortUrl)

      setShowModal(true)

      setUrl("")
    } catch (error) {
      console.error(error)

      setError("Failed to shorten URL")
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <div className="mx-auto mt-24 max-w-2xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-black">
              URL Shortener
            </h1>

            <p className="mt-3 text-gray-500">
              Create fast and secure short links
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="
                rounded-2xl
                border
                border-gray-300
                bg-white
                p-4
                text-black
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-black
                focus:ring-4
                focus:ring-black/5
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-2xl
                bg-black
                p-4
                text-lg
                font-semibold
                text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Generating..."
                : "Shorten URL"}
            </button>
          </form>

          {loading && <LoadingSpinner />}

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-center text-red-500">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              bg-white
              p-8
              shadow-2xl
              animate-in
              fade-in
              zoom-in
            "
          >
            <div className="mb-6 text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-green-100
                "
              >
                <span className="text-3xl">
                  ✅
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-bold">
                URL Shortened
              </h2>

              <p className="mt-2 text-gray-500">
                Your short link is ready to use
              </p>
            </div>

            <ResultCard shortUrl={shortUrl} />

            <button
              onClick={closeModal}
              className="
                mt-6
                w-full
                rounded-2xl
                border
                border-gray-300
                p-4
                font-medium
                transition
                hover:bg-gray-100
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}