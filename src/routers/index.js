import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import User from '~/components/User'
import Article from '~/components/Article'
import ArticleDetail from '~/components/ArticleDetail'
import Comment from '~/components/Comment'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [{
            path: '/users',
            component: User
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
    mode: 'history', // get rid of the # in the url
    routes
})

export default router
