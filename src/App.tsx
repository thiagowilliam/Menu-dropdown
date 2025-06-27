import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <SubMenuItem
          title="Configurações"
          iconname="settings"
          id="config-menu"
          subItems={[
            {
              id: "profile",
              title: "Perfil",
              goTo: "/profile"
            },
            {
              id: "security", 
              title: "Segurança",
              goTo: "/security"
            },
            {
              id: "notifications",
              title: "Notificações", 
              goTo: "/notifications",
              Badge: <span>3</span>
            }
          ]}
        />
    </>
  )
}

export default App
