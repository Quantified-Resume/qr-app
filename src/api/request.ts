export async function get<T>(url: string): Promise<T> {
    const res = await fetch(`/api/0${url}`, { method: 'get' })
    if (res.status === 200) {
        return await res.json()
    } else {
        throw new Error(res.statusText || 'Unknown error')
    }
}