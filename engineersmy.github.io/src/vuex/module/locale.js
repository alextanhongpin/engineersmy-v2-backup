/*
 * src/store/modules/loader.js
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Created by Alex Tan Hong Pin 23/02/2017
 * Copyright (c) 2017 alextanhongpin. All rights reserved.
**/

const SET_LOCALE = 'SET_LOCALE'
import moment from 'moment'
import { Languages } from '../../locale/index'
const state = {
  locale: 'en-us',
  languages: Languages
}

const actions = {
  setLocale ({ commit }, locale) {
    commit(SET_LOCALE, locale)
  }
}

const mutations = {
  [SET_LOCALE] (state, locale) {
    moment.locale(locale)
    state.locale = locale
  }
}

const getters = {
  locale (state, getters) {
    return state.locale
  },
  languages (state, getters) {
    return state.languages
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
