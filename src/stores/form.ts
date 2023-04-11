import {createStore} from "../store-lib";
import {Form} from "../auth/types"

export const useFormStore = createStore<Form | undefined>((get, set) => {
    return {
        value: undefined,
        getFormStore: () => get(),
        setFormStore: (newStore: Form) => set(newStore)
    }
});