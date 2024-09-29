export async function get<T>(url: string): Promise<T> {
    const res = await fetch(`/api/0${url}`, { method: 'get' })
    if (res.status === 200) {
        return await res.json()
    } else {
        throw new Error(res.statusText || 'Unknown error')
    }
}

export async function post<T>(url: string, body: any): Promise<T> {
    const bodyStr: string | null = body === null || body === undefined ? null : JSON.stringify(body)
    const res = await fetch(`/api/0${url}`, {
        method: 'post',
        body: bodyStr,
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (res.status === 200) {
        return await res.json()
    } else {
        throw new Error(res.statusText || 'Unknown error')
    }
}