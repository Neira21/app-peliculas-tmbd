import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
    flexDirection: 'column',
    marginTop: '20px',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid black',
  },
}

const ListaPeliculasValoradas = () => {
  const [movies, setMovies] = useState([])
  const [isMovie, setIsMovie] = useState(true)

  const rows = isMovie ? movies.map((movie,index) => (
      { id: index, col1: movie.title, col2: movie.rating }
    )) : movies.map((movie,index) => (
      { id: index, col1: movie.name, col2: movie.rating }
    ))
  
  const columns = [
    { field: 'col1', headerName: 'Pelicula', width: 300 },
    { field: 'col2', headerName: 'Valoración', width: 300 },
  ];
  
  const ObtenerPeliculasRated = async () => {
    const type = isMovie ? 'movies' : 'tv'
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}account/13007389/rated/${type}?api_key=${import.meta.env.VITE_API_KEY}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODZlZTUyY2U2MGM5ZWJiMzgwNTEyN2RiNTNkN2Y2NyIsInN1YiI6IjYyYzBjYjE2NTMyYWNiMDMyOGQyNmY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UbHOvXv3cT2bIHqz86uBHYGBj8VUyqB9PbCN477p9FM'
        }
      })

      if(response.status !== 200){
        return console.log('Error del servidor')
      }

      const data = await response.json()
      setMovies(data.results)  

    } catch (error) {
      console.log(error)
    }
  }

  const ChangeToPelicula = () => {
    setIsMovie(true)
  }

  const ChangeToSerie = () => {
    setIsMovie(false)
  }

  useEffect(()=>{
    ObtenerPeliculasRated()
  },[isMovie])

  return (
    <div style={style.container}>
      <Link to='/' style={{textAlign:'center', textDecoration:'none'}}>
        <button style={{color:'white', cursor: 'pointer'}}>Ir al inicio</button>
      </Link>
      <div className="center">
        <button
          style={{backgroundColor: isMovie ? 'blue' : 'red'}}
          onClick={ChangeToPelicula}>Peliculas</button>
        <button 
          style={{backgroundColor: isMovie ? 'red' : 'blue'}}
          onClick={ChangeToSerie}>Series
        </button>
      </div>
      

      <DataGrid
        rows = {rows}
        columns={columns}
        pageSize={7}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          autoPageSize: true,
        }}
        pageSizeOptions={[5, 10]}
      />


      {/* <table style={style.table} >
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valoración</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie,index) => (
            <tr key={index}>
              <td>{movie.title}</td>
              <td>{movie.rating}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
}

//npm install @mui/icons-material

export default ListaPeliculasValoradas