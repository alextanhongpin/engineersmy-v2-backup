/*
 * src/store/modules/notification.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 23/02/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

const SET_USER = 'SET_USER'

const state = {
  data: {
  }
}

const actions = {
  set_user ({ commit, dispatch }, user) {
    commit(SET_USER, user)
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  }
}

const getters = {
  user (state, getters, rootState, rootGetters) {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
