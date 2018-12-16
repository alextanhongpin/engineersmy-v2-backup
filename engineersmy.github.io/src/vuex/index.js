/*
 * src/store/main.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 21/02/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

// const SHOW_LOADER = 'loader/show'
// const HIDE_LOADER = 'loader/hide'
const NONE = 'none'

import NotificationModule from './module/notification'
import UserModule from './module/user'
import LoaderModule from './module/loader'
import LocaleModule from './module/locale'

const state = {
  data: {}
}

const actions = {
  all ({ dispatch, commit, state }, { expenses }) {
    // dispatch(SHOW_LOADER)
    // commit(ALL, { expenses })
    // dispatch(HIDE_LOADER)
  }
}

const mutations = {
  [NONE] (state, payload) {
    // state.expenses = payload.expenses
  }
}
const getters = {
  data (state, getters) {
    return state.data
  },
  user (state, getters) {}
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules: {
    notification: NotificationModule,
    user: UserModule,
    loader: LoaderModule,
    locale: LocaleModule
  }
}
