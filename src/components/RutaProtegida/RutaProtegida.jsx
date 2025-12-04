// src/components/RutaProtegida/RutaProtegida.jsx
import {Navigate} from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext/useAuthContext';

export const RutaProtegida = ({children}) => {
  const {user} = useAuthContext();

  if (!user) {
    return <Navigate to="/" replace />; 
  }

  return children;
};