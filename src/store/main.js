import {addTeamToOrg, createOrg, getOrgById, getOrgs, removeTeamFromOrg} from "@/services/org.services";
import {addHeroesToTeam, createTeam, getTeams, removeHeroesFromTeam} from "@/services/team.services";
import {createHero, getAllHeroes, updateHero} from "@/services/hero.services";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state:  ({

        currentHero: null,
        currentTeam: null,
        currentOrg: null,

        orgs: [],
        teams: [],
        heroes: [],

        type_heroes: ["force", "vitesse", "endurance", "magie", "effrayant", "furtivité", "stupidité"]

    }),

    getters: {
    },
    mutations: {
        setOrgs(states, orgs) {
            states.orgs = orgs;
        },

        setCurrentOrg(states, currentOrg) {
            states.currentOrg = currentOrg;
        },

        addOrg(states, orgs) {
            const {_id, name} = orgs;
            const newOrg = {_id, name};
            states.orgs.push(newOrg);
        },


        setCurrentTeam(states, currentTeam) {
            states.currentTeam = currentTeam;
        },

        setTeams(states, teams) {
            states.teams = teams;
        },

        addTeam(states, team) {
            const { _id, name } = team;

            const newTeam = {
                _id,
                name
            };
            states.teams.push(newTeam);
        },


        setHeroes(states, heroes) {
            states.heroes = heroes;
        },

        setCurrentHero(states, currentHero) {
            states.currentHero = currentHero;
        },

        clearCurrentHero(state) {
            state.currentHero = null;
        },
        clearCurrentTeam(state) {
            state.currentTeam = null;
        },
        clearCurrentOrg(state) {
            state.currentOrg = null;
        },

    },

    actions: {

        async getAllOrgs({ commit }) {
            try {
                const orgs = await getOrgs();
                console.log(orgs.data);

                if (!orgs.error || orgs.error === 0) {
                    commit('setOrgs', orgs.data);
                } else {
                    commit('errors/pushError', orgs.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error fetching orgs:', error);
            }
        },

        async appendOrg({ commit }, newOrg) {
            try {
                console.log('store', newOrg.name, newOrg.secret);
                const orgs = await createOrg(newOrg.name, newOrg.secret);
                console.log(orgs.data);

                if (!orgs.error || orgs.error === 0) {
                    commit('addOrg', orgs.data);
                } else {
                    commit('errors/pushError', orgs.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error appending org:', error);
            }
        },

        async setCurrentOrg({ commit }, id) {
            try {
                console.log("store", id);
                const currentOrg = await getOrgById(id);
                if(currentOrg.error===0){
                    commit('setCurrentOrg', currentOrg.data[0])
                }
                else{
                    commit('errors/pushError', currentOrg.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error fetching orgs:', error);
            }
        },
        //TEAMS

        async getAllTeams({ commit }) {
            try {
                const teams = await getTeams();
                console.log(teams.data);
                commit('setTeams', teams.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        },

        async appendTeam({ commit }, newTeam) {
            try {
                console.log('store', newTeam);
                const team = await createTeam(newTeam.name);
                console.log(team.data);

                if (!team.error || team.error === 0) {
                    commit('addTeam', team.data);
                } else {
                    commit('errors/pushError', team.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error appending team:', error);
            }
        },

        async addTeamToCurrentOrg({ commit, state }, newTeamToCurrentOrg) {
            try {
                await addTeamToOrg(newTeamToCurrentOrg._id);
                const currentOrg = await getOrgById(state.currentOrg._id);
                console.log(currentOrg.data);

                if (!currentOrg.error || currentOrg.error === 0) {
                    commit('setCurrentOrg', currentOrg.data[0]);
                } else {
                    commit('errors/pushError', currentOrg.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error adding team to org:', error);
            }
        },

        async removeTeamToCurrentOrg({ commit, state }, deleteTeamFromCurrentOrg) {
            try {
                console.log('store', deleteTeamFromCurrentOrg);
                await removeTeamFromOrg(deleteTeamFromCurrentOrg._id);
                const currentOrg = await getOrgById(state.currentOrg._id);
                console.log(currentOrg.data);

                if (!currentOrg.error || currentOrg.error === 0) {
                    commit('setCurrentOrg', currentOrg.data[0]);
                } else {
                    commit('errors/pushError', currentOrg.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error removing team from org:', error);
            }
        },

        async setCurrentTeam({ commit }, currentTeam) {
            try {
                console.log("store", currentTeam);
                commit('setCurrentTeam', currentTeam);
            } catch (error) {
                console.error('Error setting current team:', error);
            }
        },

        //HEROES

        async getAllHeroes({ commit }) {
            try {
                const heroes = await getAllHeroes();
                console.log(heroes.data);
                if (!heroes.error || heroes.error === 0) {
                    commit('setHeroes', heroes.data);
                } else {
                    commit('errors/pushError', heroes.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        },

        async addHeroesToCurrentTeam({ commit, state }, newHeroesIds) {
            try {
                console.log('store', newHeroesIds);
                const response = await addHeroesToTeam(state.currentTeam._id, newHeroesIds);
                if (!response.error || response.error === 0) {
                    commit('setCurrentTeam', response.data);
                } else {
                    commit('errors/pushError', response.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error adding heroes to the team:', error);
            }
        },

        async createHeroAndAddHeroesToCurrentTeam({ commit, state }, newHero) {
            try {
                const reponses_hero = await createHero(newHero);

                console.log(reponses_hero)

                if (!reponses_hero.error || reponses_hero.error === 0) {
                    const response = await addHeroesToTeam(state.currentTeam._id, [reponses_hero.data._id]);
                    commit('setCurrentTeam', response.data);
                } else {
                    commit('errors/pushError', reponses_hero.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error creating hero and adding to the team:', error);
            }
        },

        async removeHeroesFromCurrentTeam({ commit, state }, oldHeroesIds) {
            try {
                console.log('store', oldHeroesIds);
                const response = await removeHeroesFromTeam(state.currentTeam._id, oldHeroesIds);
                if (!response.error || response.error === 0) {
                    commit('setCurrentTeam', response.data);
                } else {
                    commit('errors/pushError', response.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error removing heroes from the team:', error);
            }
        },

        async setCurrentHero({ commit }, currentHero) {
            try {
                console.log("store", currentHero);
                commit('setCurrentHero', currentHero);
            } catch (error) {
                console.error('Error setting current hero:', error);
            }
        },

        async updateCurrentHero({ commit }, updatedCurrentHero) {
            try {
                console.log("store", updatedCurrentHero);
                const updated_hero = await updateHero(updatedCurrentHero);
                if (!updated_hero.error || updated_hero.error === 0) {
                    commit('setCurrentHero', updated_hero.data);
                } else {
                    commit('errors/pushError', updated_hero.data.data, { root: true });
                }
            } catch (error) {
                console.error('Error updating current hero:', error);
            }
        },

        clearCurrentHero({ commit }) {
            commit('clearCurrentHero');
        },
        clearCurrentTeam({ commit }) {
            commit('clearCurrentTeam');
        },
        clearCurrentOrg({ commit }) {
            commit('clearCurrentOrg');
        },

    },

    modules: {
    }

}
