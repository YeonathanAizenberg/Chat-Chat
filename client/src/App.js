import ChatPage from './components/pages/chatPage/ChatPage';
import WelComePage from './components/pages/welComePage/WelcomePage';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import './App.css';

const socket = io.connect("http://localhost:3001")

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [usersArray, setUserArray] = useState([])

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
      {userLoggedIn ?
        <ChatPage
          socket={socket}
          usersList={usersArray}
        />
        :
        <WelComePage
          socket={socket}
          logIn={setUserLoggedIn}
        />
      }
    </div>
  );
}

export default App;
