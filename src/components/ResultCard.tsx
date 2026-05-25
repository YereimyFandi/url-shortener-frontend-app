import { useState } from "react"

type Props = {
  shortUrl: string
}

export default function ResultCard({
  shortUrl,
}: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-medium text-gray-500">
        Short URL
      </p>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={shortUrl}
          readOnly
          className="
            flex-1
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            p-3
            text-black
            outline-none
          "
        />

        <button
          onClick={copyToClipboard}
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}