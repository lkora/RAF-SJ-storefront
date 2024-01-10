"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
vue_1.default.use(vuex_1.default);
exports.default = new vuex_1.default.Store({
    state: {
        token: ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.token = token;
        },
        removeToken(state) {
            state.token = '';
            localStorage.token = '';
        },
    },
    actions: {
        register({ commit }, obj) {
            fetch('http://127.0.0.1:9001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(res => res.json())
                .then(data => commit('setToken', data.token));
        },
        login({ commit }, obj) {
            fetch('http://127.0.0.1:9001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(res => res.json())
                .then(data => {
                if (data.msg) {
                    alert(data.msg);
                }
                else {
                    commit('setToken', data.token);
                }
            });
        }
    }
});
//# sourceMappingURL=index.js.map