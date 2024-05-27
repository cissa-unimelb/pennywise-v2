import {createStore} from "../store-lib";
import {User, createUser} from "../auth/types"

export const useUserStore = createStore<User>((get, set) => {
    return {
        value: createUser(null),
        getUserStore: () => get(),
        setUserStore: (newStore: User) => set(newStore)
    }
});