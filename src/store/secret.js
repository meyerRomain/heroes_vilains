import Vue from 'vue'
import Vuex from 'vuex'

import {getUserInfo, registerUser, signIn, updateHeroWithAuth} from "@/services/auth.services";

Vue.use(Vuex);

export default{
    namespaced: true,
    state: ({
        passwordOrg: "",
        auth: false,
        jwtToken: null,
        xsrfToken: null,
        refreshToken: null,
        userInfo: null,
    }),
    getters: {
        getUserInfoName: state => state.userInfo.login,
        getUserInfoHero: state => state.userInfo.hero,
    },
    mutations: {
        setPasswordOrgs(state, password) {
            state.passwordOrg = password;
        },
        setAuth(state, status) {
            state.auth = status;
        },
        setJWTToken(state, token) {
            state.jwtToken = token;
        },
        setXSRFToken(state, token) {
            state.xsrfToken = token;
        },
        setRefreshToken(state, token) {
            state.refreshToken = token;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setUserInfoHero(state, hero) {
            state.userInfo.hero = hero;
        }
    },
    actions: {
        async registerUser({commit}, hero){
            const res = await registerUser(hero)
            console.log(res)

            if (res.error === 0) {
                commit('setUserInfo', res.data);
            } else {
                console.error('Error fetching user informations:', res.data.data);
            }
        },

        logoutUser({ commit }) {
            commit('setAuth', false);
            commit('setJWTToken', null);
            commit('setXSRFToken', null);
            commit('setUserInfo', null);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('xsrfToken');
        },

        async updateAuthHero({commit, state}, hero) {
            hero._id = state.userInfo.hero._id;
            
            await console.log(hero);
            const res = await updateHeroWithAuth(hero);

            console.log(res);
            if (res.error === 0) {
                commit('setUserInfoHero', res.data);
            } else {
                console.error('Error fetching user informations:', res.data.data);
            }
        },

        async setPasswordOrg({ commit }, password) {
            try {
                commit('setPasswordOrgs', password);
            } catch (error) {
                console.error('Error fetching orgs:', error);
            }
        },

        async signIn({ commit }, userData) {
            try {
                console.log('store')
                console.log(userData)
                const res = await signIn(userData);

                console.log(res)
                if (res.error === 0) {
                    commit('setJWTToken', res.data.jwtToken);
                    commit('setXSRFToken', res.data.xsrfToken);
                    commit('setRefreshToken', res.data.refreshToken);
                    const res_user = await getUserInfo(userData.login);

                    console.log(res_user.data)
                    if (res_user.error === 0) {
                        commit('setUserInfo', res_user.data);
                    } else {
                        console.error('Error fetching user informations:', res_user.data.data);
                    }

                    commit('setAuth', true);
                } else {
                    commit('errors/pushError', res.data.data, { root: true });

                }
            } catch (error) {
                console.error('Connexion error:', error);
            }
        },

    },

    modules: {
    }
}
