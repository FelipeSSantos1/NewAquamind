import { combineReducers } from 'redux'

import user from './user'
import config from './config'
import feed from './feed'
// import tanks from './tanks'
// import plants from './plants'
// import fertilizers from './fertilizers'
// import feed from './feed'

export const rootReducer = combineReducers({
  user: user.reducer,
  config: config.reducer,
  feed: feed.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
