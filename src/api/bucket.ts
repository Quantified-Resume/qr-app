import { get } from "./request"

export type Builtin = 'BrowserTime'

export type Bucket = {
    id: number
    name: string
    builtin?: Builtin
    builtinRefId?: string
}

export type BucketKey = {
    id: number
} | {
    builtin: Builtin
    builtinRefId?: string
}

export async function listAllBuckets(): Promise<Bucket[]> {
    return get("/bucket")
}

export async function getBucketDetail(id: number): Promise<Bucket> {
    return get(`/bucket/${id}`)
}