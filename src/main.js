import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import SIdentify from './components/Identify/identify';
import '@/icons' // icon

Vue.component("SIdentify", SIdentify);
Vue.use(ElementUI, { locale })

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
Vue.config.productionTip = false
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})