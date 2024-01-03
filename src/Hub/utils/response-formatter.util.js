

export const format = (json) => {
    const _code = json.code || 200
    const _status = json.status || "no message"
    const _request = json.request || ""
    const _data = json.data || []

    return {
        code: _code,
        status: _status,
        request: _request,
        data: _data
    }
}