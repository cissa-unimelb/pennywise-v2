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

/**
 * the login flow is:
 *  1. try automatic login, user redirected to login page
 *      if contains both token and bsb, redirect to previous page
 *  2. user must login on login page
 *      if successful, only set token and redirect to dashboard
 *  3. try fetching user on db
 *      if found, set the bsb and account num
 *  4. ask for bsb info, then save the info to context
 */
export const UserContext = createContext({
    user: createUser(null),
    setUser: (user: User) => {}
});

/**
 * Used to indicate autologin
 */
export const AutoLoginContext = createContext({
    loading: false,
    setLoading: (state: boolean) => {}
});