import request from '@/utils/request'

export async function searchBonusPackage(data) {
    return request({ url: '/controller/bonus/bonus-package/search', method: 'SEARCH', data })
}

export async function findBonusPackageById(data) {
    return request({ url: '/controller/bonus/bonus-package/find-by-id', method: 'POST_GET', data })
}

export async function createBonusPackage(data) {
    return request({ url: '/controller/bonus/bonus-package/create', method: 'POST', data })
}

export async function updateBonusPackage(id, data) {
    data.id = id;
    return request({ url: '/controller/bonus/bonus-package/update-selective', method: 'POST', data })
}

export async function searchPackageTicket(data) {
    return request({ url: '/controller/bonus/package-ticket/search', method: 'SEARCH', data })
}

export async function exportPackageTicket(data) {
    return request({ url: '/controller/bonus/package-ticket/export', method: 'SEARCH', data })
}

export async function genTicket(data) {
    return request({ url: '/controller/bonus/bonus-package/gen-ticket', method: 'POST', data })
}