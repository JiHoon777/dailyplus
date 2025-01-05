import { createStore } from './utils/createStore'

export type IStudioStoryEditorStore = {}

export const StudioStoryEditorStore = createStore<IStudioStoryEditorStore>(
  (_set, _get) => {
    return {}
  },
  'Studio Story Editor Store',
)
