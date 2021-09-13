import Main from '@/pages/Main';
import { createRouter, createWebHistory } from 'vue-router';
import PostPage from '@/pages/postPage';
import About from '@/pages/About';
import postIdPage from '@/pages/postIdPage';
import postPageWithStore from '@/pages/postPageWithStore';
import postPageCompositionAPI from '@/pages/postPageCompositionAPI'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/Posts',
        component: PostPage
    },
    {
        path: '/About',
        component: About
    },
    {
        path: '/Posts/:id',
        component: postIdPage 
    },
    {
        path: '/Store',
        component: postPageWithStore
    },
    {
        path: '/Composition',
        component: postPageCompositionAPI
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;