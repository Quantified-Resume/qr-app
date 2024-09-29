import { BucketKey } from "./bucket"
import { post } from "./request"

export type ItemQueryRequest = {
    bucket: BucketKey
    tsStart?: number
    tsEnd?: number
    metrics?: string[]
}

export type Item = {
    id: number
    timestamp: number
    payload?: Record<string, any>
    metrics?: Record<string, number>
}

export type ItemQueryResult = {
    items: Item[]
    req: ItemQueryRequest
    version: number
}

export function queryItems(req: ItemQueryRequest): Promise<ItemQueryResult> {
    return post("/query/item", req)
}