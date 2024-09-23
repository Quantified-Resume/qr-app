import { get } from "./request"

export type Bucket = {
    id: number
    name: string
    builtin: string
}

export async function listAllBuckets(): Promise<Bucket[]> {
    return get("/bucket")
}

export async function getBucketDetail(id: number): Promise<Bucket> {
    return get(`/bucket/${id}`)
}