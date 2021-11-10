import VueRouter from 'vue-router'
import MainLayout from '~/layouts/MainLayout'
import AdminLayout from '~/layouts/AdminLayout'
import Article from '~/pages/article/Article'
import ArticleDetail from '~/pages/article/ArticleDetail'
import ArticleEdit from '~/pages/article/ArticleEdit'
import Login from '~/pages/Login'
import AdminLogin from '~/pages/Admin/AdminLogin'
import AdminArticles from '~/pages/Admin/AdminArticles'
import AdminComments from '~/pages/Admin/AdminComments'
import AdminSections from '~/pages/Admin/AdminSections'
import AdminUsers from '~/pages/Admin/AdminUsers'
import Register from '~/pages/Register'
import UserProfile from '~/pages/UserProfile'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [{
            path: 'users/login',
            name: 'Login',
            component: Login
        },{
            path: 'users/register',
            name: 'Register',
            component: Register
        },{
            path: '/articles',
            component: Article
        },{
            path: '/articles/edit/:id?',
            component: ArticleEdit
        },{
            path: '/articles/:id',
            component: ArticleDetail
        },{
            path: '/profile',
            component: UserProfile
        }]
    },
    {
        path: '/admin/',
        component: AdminLayout,
        children: [{
            path: '',
            name: 'AdminLogin',
            component: AdminLogin
        },
        {
            path: 'articles',
            name: 'ArticleList',
            component: AdminArticles
        },
        {
            path: 'users',
            name: 'UserList',
            component: AdminUsers
        },
        {
            path: 'comments',
            name: 'CommentList',
            component: AdminComments
        },
        {
            path: 'sections',
            name: 'SectionList',
            component: AdminSections
        },
    ]
    }
]

const router = new VueRouter({
    routes
})

export default router
