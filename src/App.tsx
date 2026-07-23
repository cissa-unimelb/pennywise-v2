import React, {useEffect, useState} from "react";
import RouterProvider from "./routes/RouterProvider";
import "./App.css";
import {AutoLoginContext, UserContext} from "./stores/user";
import {createUser, User} from "./auth/types";
import {retainSession} from "./auth/session";
import {getUser} from "./database";

function App() {
  const [user, setUser] = useState<User>(createUser(null));
  // Auth restoration is asynchronous. Start in the loading state so routes do
  // not mistake the initial empty context for a signed-out user.
  const [loading, setLoading] = useState<boolean>(true);

  // Try logging in
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // first fetch existing firebase token, then fetch db
        const fetchedUser = await retainSession();
        try {
          const newUser = await getUser(fetchedUser.id);
          setUser({
            ...fetchedUser,
            ...newUser
          });
        } catch (err) {
          // A Firebase session is still valid when a user profile has not been
          // created yet. BankForm handles creating the missing profile.
          setUser(fetchedUser);
        }
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
