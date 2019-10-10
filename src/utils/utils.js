export function formatDate(date, fmt) {
    if(!date){
        return "";
    }
    date = new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

export function formatFullDate(date) {
    return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
}

export function formatShortDate(date) {
    return formatDate(date, 'yyyy-MM-dd');
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

export function waitAllPromiseFinish(promiseArray) {
    let allCount = promiseArray ? promiseArray.length : 0;
    let errorCount = 0;
    let finishCount = 0;
    const result = {};
    return new Promise(function (resolve, reject) {
        if (allCount == 0) {
            resolve({});
        } else {
            promiseArray.forEach(promise => {
                promise.then(data => {
                    result[promise.key] = data;
                    finishCount += 1;
                    if (finishCount >= allCount) {
                        resolve(result);
                    }
                }).catch(() => {
                    errorCount += 1;
                    if (finishCount + errorCount >= allCount) {
                        reject();
                    }
                })
            });
        }
    });
}

