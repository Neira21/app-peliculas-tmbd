
import { useEffect, useState } from "react"

import { getMoviesOrSeries } from "../utils/queryMovies"

const useTrending = () => {

  const [trending, setTrending] = useState([])

  const fetchTrending = async () => {
    try {
      const data = await getMoviesOrSeries('trending/all/day')
      setTrending(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return {
    trending
  }
}

export default useTrending