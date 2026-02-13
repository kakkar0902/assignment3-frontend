import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null)

  return <AuthContext.Provider value={{ token, setToken, isAuthenticated: !!token}}>
    {children}
  </AuthContext.Provider>
}


export const useAuthContext = () => useContext(AuthContext);

  
