import axios from 'axios'

const state = {
  todos: []
}
const getters = {
  allTodos:state=>state.todos
}
const actions = {
  async fetchTodos ({commit}) {
    const response = await axios.get('http://jsonplaceholder.typicode.com/todos')
    commit('initTodos',response.data)
  },
  async addTodo({commit},data) {
    const response = await axios.post('http://jsonplaceholder.typicode.com/todos', {
      title: data,
      competed:false
    })
    commit('addTodo',response.data)
  },
  deleteTodo({ commit }, id){
    commit('removeTodo',id)
  },
  async filterTodo({ commit }, num) {
    const response=await axios.get(`http://jsonplaceholder.typicode.com/todos?_limit=${num}`)
    commit('initTodos',response.data)
  },
  async updateTodo({ commit }, todo) {
    // const response = await axios.put(`http://jsonplaceholder.typicode.com/todos/${todo.id}`, {
    //   competed: !todo.competed
    // });
    todo.completed = !todo.completed;
    commit('updateTodo', todo);
  }
}
const mutations = {
  initTodos:(state,data)=> {
    state.todos=data
  },
  addTodo:(state,data)=> {
    state.todos.unshift(data)
  },
  removeTodo: (state,id) => {
    state.todos=state.todos.filter(todo=>todo.id != id)
  },
  updateTodo:(state,data)=> {
    const index = state.todos.findIndex(todo => todo.id == data.id)
    if (index !== -1) {
      state.todos.splice(index, 1, data)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}