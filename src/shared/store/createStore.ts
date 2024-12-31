import type { StateCreator } from 'zustand'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const createStore = <T extends object>(
  initializer: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/immer', never]]
  >,
  name: string,
) => create<T>()(devtools(immer(initializer), { name }))
