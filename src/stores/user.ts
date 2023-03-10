import {createStore} from "../store-lib";
import {User} from "../auth/types"

export const useUserStore = createStore<User | undefined>((get, set) => {
    return {
        value: undefined,
        getUserStore: () => get(),
        setUserStore: (newStore: User) => set(newStore)
    }
});