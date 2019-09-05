'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"http://192.168.1.12/index.php/"'
    BASE_API: "'http://data.hbsytl.cn/index.php/'"
        // BASE_API: "'http://192.168.1.17/'"
        // BASE_API: "'http://47.74.243.243:8980'"
})