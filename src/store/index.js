import { createStore } from 'vuex';

let userInforr = localStorage.getItem('userInfo');
    let isLoggedInn = localStorage.getItem('isLoggedIn');
    console.log(isLoggedInn === 'true', JSON.parse(userInforr))

export default createStore({
  state: {
    
    isLoggedIn: isLoggedInn === 'true' ? true : false,
    userInfo: userInforr ? JSON.parse(userInforr) : {},
  },
  mutations: {
    // Mutation để thay đổi trạng thái đăng nhập
    setLoginStatus(state, status) {
      state.isLoggedIn = status.isLoggedIn;
      state.userInfo = status.userInfo;
    },
  },
  actions: {
    // Action để thực hiện các thay đổi trạng thái
    login({ commit }, payload) {
      // Giả sử bạn có một API để đăng nhập
      // Sau khi đăng nhập thành công, gọi mutation để cập nhật state
      commit('setLoginStatus', payload);
    },
    logout({ commit }) {
      commit('setLoginStatus', { isLoggedIn: false, userInfo: {} });
    },
  },
  getters: {
    // Getter để truy xuất trạng thái
    getLoginStatus(state) {
      return state.isLoggedIn;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
  },
});
