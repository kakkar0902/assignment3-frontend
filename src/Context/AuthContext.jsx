import { createContext, useState } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null)

  return <AuthContext.Provider value={{setToken, isAuthenticated: !!token}}>
    {children}
  </AuthContext.Provider>
}


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
}