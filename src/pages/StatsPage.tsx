import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import { getStats } from "../services/stats.service"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type StatsResponse = {
  code: string

  totalVisits: number

  visitsByDate: {
    date: string
    visits: number
  }[]
}

export default function StatsPage() {
  const { code } = useParams()

  const [stats, setStats] =
    useState<StatsResponse | null>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!code) return

        const data = await getStats(code)

        setStats(data)
      } catch (error) {
        console.error(error)

        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [code])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading stats...</p>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Failed to load stats
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold">
          URL Statistics
        </h1>

        <p className="mb-8 text-gray-500">
          Analytics for: {stats.code}
        </p>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-lg text-gray-500">
            Total Visits
          </h2>

          <p className="mt-2 text-5xl font-bold">
            {stats.totalVisits}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Visits by Date
          </h2>

          {stats.visitsByDate.length === 0 ? (
            <p className="text-gray-500">
              No visits yet.
            </p>
          ) : (
            <div className="h-96">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={stats.visitsByDate}>
                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="visits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}