import firebase from "firebase/app";

export default {
    actions: {
        // eslint-disable-next-line no-unused-vars
        async createRecord({dispatch, commit}, record) {
            try {
                const uid = await dispatch('getUid')
                const record = {...record}
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}