import { useEffect, useState } from "react";
import { Type } from "react-toastify/dist/utils";

interface State<Type> {
    value: Type;
    [key: string]: Function | Type;
}
export interface StateInitializer<Type> {
    (get: Function, set: Function): State<Type>;
}

let id = 0;

export function createStore<Type>(init: StateInitializer<Type>): Function {
    let subscribers: Record<number, Function> = {};
    // @ts-expect-error
    let store: State<Type> = { value: null };
    let get = () => store.value;
    let set = (x: Type) => {
        store.value = x;
        for (const func of Object.values(subscribers)) {
            func({ ...store, value: x });
        }
    };

    store = init(get, set);

    const useStore = () => {
        let [localStore, setLocalStore] = useState<State<Type>>(store);

        useEffect(() => {
            subscribers[id] = setLocalStore;
            id += 1;

            return () => {
                delete subscribers[id];
            };
        }, []);

        return localStore;
    };

    return useStore;
}
