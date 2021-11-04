import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import User from '~/components/User'
import Article from '~/components/Article'
import ArticleDetail from '~/components/ArticleDetail'
import Comment from '~/components/Comment'
import Login from '~/components/Login'
import Register from '~/components/Register'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [{
            path: '/users',
            component: User
        },{
            path: '/users/login',
            component: Login
        },{
            path: '/users/register',
            component: Register
        },{
            path: '/articles',
            component: Article
        },{
            path: '/articles/:id',
            component: ArticleDetail
        },{
            path: '/comments',
            component: Comment
        }]
    }
]

const router = new VueRouter({
    routes
})

export default router
