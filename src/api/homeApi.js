import http from '@/utils/request'
export function getIndex() {
    return http.post("/admin/index/index", {})
}
export function account_set(data) {
    return http.post("/admin/index/account_set", { data })

}
export function admin_log(data) {
    return http.post("/admin/index/admin_log", { data })
}