import { useAuth } from '../contexts/AuthContext';
// import { useEffect, useState } from 'react';
// import api from "../api";

const Home = () => {
  const { user } = useAuth();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   for (let i = 0; i < 1; i++) {
  //     if (user) break;
  //     api.get("/api/user/data/")
  //       .then(res  => res.data)
  //       .then(data => setUser(data))
  //       .catch(err => {});
  //     console.log(user);
  //   }
  // }, []);
  
  
  return <div>
    <h1>Home</h1>
    <p className="font-bold text-sm truncate">{ user?.username || 'Usuário' }</p>
    <p className="font-bold text-sm truncate">{ user?.first_name || 'first_name' }</p>
    <p className="font-bold text-sm truncate">{ user?.last_name || 'last_name' }</p>
    <p className="font-bold text-sm truncate">{ user?.email || 'email' }</p>
    <p className="font-bold text-sm truncate">{ user?.groups || 'groups' }</p>
    <a href="/logout">Sair</a>
  </div>
};

export default Home;
