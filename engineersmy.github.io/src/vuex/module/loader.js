/*
 * src/store/modules/loader.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 23/02/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

const TOGGLE = 'TOGGLE'

const state = {
  isVisible: false
}
const actions = {
  show ({ commit }) {
    commit(TOGGLE, true)
  },
  hide ({ commit }) {
    commit(TOGGLE, false)
  }
}

const mutations = {
  [TOGGLE] (state, isVisible) {
    state.isVisible = isVisible
  }
}

const getters = {
  isVisible (state, getters) {
    return state.isVisible
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
