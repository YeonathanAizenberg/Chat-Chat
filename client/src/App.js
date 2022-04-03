import ChatPage from './components/pages/chatPage/ChatPage';
import WelComePage from './components/pages/welComePage/WelcomePage';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';
import { createContext, useEffect, useState } from 'react';
import './App.css';

const socket = io.connect("https://chatchatsocket.herokuapp.com")

export const UsersDataContext = createContext()

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [usersArray, setUserArray] = useState([])
  const [userName, setUserName] = useState("")

  const usersDataContainer = {
    userName: userName, 
    usersList: usersArray, 
    socket: socket
  }

    useEffect(() => {
      socket.on("update_room_users", (data) => {
        let users = []
        for (let i = 0; i < data.users.length; i++) {
          users.push(data.users[i].username)
        }

        setUserArray(users)
    })
    }, [socket])

  return (
    <div className="App">
      <UsersDataContext.Provider value={usersDataContainer}>
        {userLoggedIn ?
          <ChatPage/>
          :
          <WelComePage
            setUserName={setUserName}
            logIn={setUserLoggedIn}
          />
        }
      </UsersDataContext.Provider>
    </div>
  );
}

export default App;
