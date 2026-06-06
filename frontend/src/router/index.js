import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../views/HomePage.vue"
import FeaturesPage from "../views/FeaturesPage.vue"
import AboutPage from "../views/AboutPage.vue"
import ModelsPage from "../views/ModelsPage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/features",
    name: "Features",
    component: FeaturesPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/models",
    name: "Models",
    component: ModelsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
