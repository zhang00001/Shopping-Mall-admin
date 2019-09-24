import { Message, MessageBox } from 'element-ui'
/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}
export function beforeAvatarUpload(file) {
    debugger
    // 上传图片前处理函数
    const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
    const isLt2M = file.size / 1024 / 1024 < 0.195; // 限制小于200KB
    let that = this;
    let isAllow = false;
    if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、gif 格式!");
    }
    if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200KB!");
    }
    const isSize = new Promise(function(resolve, reject) {
        let width = 90;
        let height = 90;
        let _URL = window.URL || window.webkitURL;
        let image = new Image();
        image.onload = function() {
            let valid = image.width == width && image.height == height;
            valid ? resolve() : reject();
        };
        image.src = _URL.createObjectURL(file);
    }).then(
        () => {
            return file;
        },
        () => {
            this.$message.error("上传头像图片尺寸不符合,只能是90*90!");
            return Promise.reject();
        }
    );
    return isJPG && isLt2M && isSize;
}