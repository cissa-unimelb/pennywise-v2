import React, {useEffect, useState} from "react";
import RouterProvider from "./routes/RouterProvider";
import "./App.css";
import {AutoLoginContext, UserContext} from "./stores/user";
import {createUser, User} from "./auth/types";
import {retainSession} from "./auth/session";
import {getUser} from "./database";

function App() {
  const [user, setUser] = useState<User>(createUser(null));
  const [loading, setLoading] = useState<boolean>(false);

  // Try logging in
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // first fetch existing firebase token, then fetch db
        const fetchedUser = await retainSession();
        const newUser = await getUser(fetchedUser.id);

        // only if both passed we can say success
        setUser({
          ...fetchedUser,
          ...newUser
        });
        console.log('automatically logged in');
      } catch (err) {
        console.log('failed to fetch user');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <AutoLoginContext.Provider value={{loading, setLoading}}>
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider/>
    </UserContext.Provider>
  </AutoLoginContext.Provider>;
}

export default App;
