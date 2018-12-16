/*
 * src/store/modules/notification.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 23/02/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

import uuidV1 from 'uuid/v1'

const SHOW = 'SHOW'
const START = 'START'
const PAUSE = 'PAUSE'
const REMOVE = 'REMOVE'

const state = {
  data: [],
  timer: {}
}

const actions = {
  show ({ commit, dispatch }, { title, description }) {
    const id = uuidV1()
    const timestamp = Date.now()
    commit(SHOW, {
      id,
      title,
      description,
      timestamp
    })
    dispatch('start', id)
  },
  start ({ commit }, id) {
    commit(START, id)
  },
  pause ({ commit }, id) {
    commit(PAUSE, id)
  },
  remove ({ commit }, id) {
    commit(REMOVE, id)
  }
}

const mutations = {
  [SHOW] (state, { id, title, description }) {
    state.data.push({ id, title, description })
  },
  [START] (state, id) {
    state.timer[id] = window.setTimeout(() => {
      state.data = state.data.filter((d) => d.id !== id)
    }, 4000)
  },
  [PAUSE] (state, id) {
    window.clearTimeout(state.timer[id])
  },
  [REMOVE] (state, id) {
    state.data = state.data.filter((d) => d.id !== id)
  }
}

const getters = {
  data (state, getters, rootState, rootGetters) {
    return state.data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
