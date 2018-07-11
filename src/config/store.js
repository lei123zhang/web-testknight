import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member: null,
        activeNav: '',
        currentStep: 0,
    },
    mutations: {
        navigate(state,nav){
            state.activeNav = nav;
        },
        getCurrentStep(state,currentStep){
            state.currentStep = currentStep;
        },
        setMember(state, member) {
            state.member = member;
            localStorage.setItem('MEMBER', JSON.stringify(member));
        },
        recoveryMember(state){
            state.member = JSON.parse(localStorage.getItem('MEMBER'));
        }
    },
    getters: {
        getTabbarStatus(state) {
            return state.isShowTabbar;
        },
        member(state) {
            // debugger
            return state.member;
        },
        isLogin(state){
            // debugger
            return state.member != null;
        }
    }
});