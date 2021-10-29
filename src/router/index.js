import {createRouter,createWebHashHistory} from 'vue-router'
import Library from '../views/Library/Library.vue'
import Works from '../views/Works/Works.vue'
import Live from '../views/Live/Live.vue'
import Promises from '../views/Promises/Promises.vue'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/content/library',
      component: Library,
    },
    {
      path: '/content/works',
      component: Works,
    },
    {
      path: '/content/live',
      component: Live,
    },
    {
      path: '/content/promises',
      component: Promises,
    },
  ],
})
