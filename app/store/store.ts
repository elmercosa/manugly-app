import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

const businessAtom = atomWithStorage("business", null);

export { businessAtom };
