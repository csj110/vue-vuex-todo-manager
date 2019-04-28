<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    </div>
    <div class="todos">
      <div @dblclick="updateTodo(todo)" v-for="todo in allTodos" :key="todo.id" class='todo' :class="{'is-complete':todo.completed}"
      >
        {{ todo.title }}
        <i @click='deleteTodo(todo.id)' class="far fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name:'Todos',
  methods: {
    ...mapActions(['fetchTodos','deleteTodo','updateTodo'])
  },
  computed: mapGetters(['allTodos']),
  created () {
    this.fetchTodos()
  },
}
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1.4rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  display:none;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.todo:hover i{
  display:block;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
.is-complete i{
  display:block;
}
@media (max-width: 1000px) {
  .todos {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 700px) {
  .todos {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
