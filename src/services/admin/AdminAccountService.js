import request from '@/utils/request'

export async function searchAdminAccount(data) {
    return request({ url: '/controller/admin/admin-account/search', method: 'SEARCH', data })
}

export async function findAdminAccountById(data) {
    return request({ url: '/controller/admin/admin-account/find-by-id', method: 'POST_GET', data })
}

export async function createAdminAccount(data) {
    data.status = "NORMAL";
    data.type = "NORMAL";
    return request({ url: '/controller/admin/admin-account/create', method: 'POST', data })
}

export async function updateAdminAccount(id, data) {
    data.id = id;
    return request({ url: '/controller/admin/admin-account/update-selective', method: 'POST', data })
}

export async function lockAdminAccount(data) {
    return request({ url: '/controller/admin/admin-account/lock', method: 'POST', data })
}

export async function unlockAdminAccount(data) {
    return request({ url: '/controller/admin/admin-account/unlock', method: 'POST', data })
}

export async function resetPassword(data) {
    return request({ url: '/controller/admin/admin-account/reset-password', method: 'POST', data })
}