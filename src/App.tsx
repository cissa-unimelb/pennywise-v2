import React, {useState} from "react";
import RouterProvider from "./routes/RouterProvider";
import "./App.css";
import {UserContext} from "./stores/user";
import {createUser, User} from "./auth/types";

function App() {
  const [user, setUser] = useState<User>(createUser(null));

  return <UserContext.Provider value={{user, setUser}}>
    <RouterProvider />
  </UserContext.Provider>;
}

export default App;
