import { useState, useEffect } from "react"
import api from "../api"
import { useAuth } from '../contexts/context';

const Home = () => {
  // const [ user, setUser ] = useState([])

  // useEffect(() => {
  //   getUser ()
  // }, [])

  // const getUser = () => {
  //   api
  //     .get("/api/user/data/")
  //     .then((res) => res.data)
  //     .then((data) => { setUser(data); console.log(data) })
  //     .catch((err) => alert(err))
  // }
  
  const { user } = useAuth();
  // const { user } = null; 
  
  return <div>Home
    <p className="font-bold text-sm truncate">{ user?.username || 'Usuário' }</p>
  </div>
};

export default Home;
