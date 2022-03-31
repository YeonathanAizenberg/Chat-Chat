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
      socket.on("new_user_in_room", (data) => {
        setUserArray((list) => 
            [...list, data]
        )
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
