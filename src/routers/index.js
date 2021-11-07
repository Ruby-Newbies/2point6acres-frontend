import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import Article from '~/pages/article/Article'
import ArticleDetail from '~/pages/article/ArticleDetail'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import UserProfile from '~/pages/UserProfile'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [{
            path: '/login',
            component: Login
        },{
            path: '/register',
            component: Register
        },{
            path: '/articles',
            component: Article
        },{
            path: '/articles/:id',
            component: ArticleDetail
        },{
            path: '/profile',
            component: UserProfile
        }]
    }
]

const router = new VueRouter({
    routes
})

export default router
