import firebase from "firebase/app";

export default {
    actions: {
        // eslint-disable-next-line no-unused-vars
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError, e')
                throw e
            }
        }
    }
}