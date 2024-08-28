import {createStore} from "../store-lib";
import {User, createUser} from "../auth/types"
import {createContext} from "react";

export const useUserStore = createStore<User>((get, set) => {
    return {
        value: createUser(null),
        getUserStore: () => get(),
        setUserStore: (newStore: User) => set(newStore)
    }
});

// migration to context
export const UserContext = createContext({
    user: createUser(null),
    setUser: (user: User) => {}
});