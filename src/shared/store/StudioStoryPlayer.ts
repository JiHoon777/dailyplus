import { createStore } from './utils/createStore'

export type IStudioStoryPlayerStore = {}

export const StudioStoryPlayerStore = createStore<IStudioStoryPlayerStore>(
  (_set, _get) => {
    return {}
  },
  'Studio Story Player Store',
)
