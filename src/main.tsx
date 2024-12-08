import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StateContextProvider } from './Context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StateContextProvider>
    <App />
  </StateContextProvider>
)
