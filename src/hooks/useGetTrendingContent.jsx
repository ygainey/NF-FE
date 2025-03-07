import { useEffect, useState } from "react"
import { useContentStore } from "../utils/content" // Keep using Zustand here

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
const API_PATH = import.meta.env.VITE_API_PATH 

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { contentType } = useContentStore() // Still using Zustand store

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}${API_PATH}/${contentType}/trending`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' 
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        setTrendingContent(data.content)
        setError(null)
      } catch (err) {
        console.error("Error fetching trending content:", err)
        setError("Failed to load trending content")
        setTrendingContent(null)
      } finally {
        setIsLoading(false)
      }
    }

    getTrendingContent()
  }, [contentType])

  return { trendingContent, isLoading, error }
}

export default useGetTrendingContent