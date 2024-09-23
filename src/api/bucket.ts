export type Bucket = {
    id: number
    name: string
    builtin: string
}

export async function listAllBuckets(): Promise<Bucket[]> {
    const res = await fetch("/api/0/bucket", { method: 'get' })
    if (res.status === 200) {
        const buckets: Bucket[] = await res.json()
        return buckets
    } else {
        throw new Error(res.statusText || 'Unknown error')
    }
}