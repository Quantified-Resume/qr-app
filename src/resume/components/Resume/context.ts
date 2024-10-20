import { createContext } from "react"

export type ResumeContextValue = {
    bucketId?: number
}

export const ResumeContext = createContext<ResumeContextValue>({})