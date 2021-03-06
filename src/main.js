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

import '@/icons' // icon


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
import { formatDate } from '@/utils/date.js'
Vue.use(VueQuillEditor)
Vue.filter('formatDate', function(time) {
    var date = new Date(time * 1000);
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})