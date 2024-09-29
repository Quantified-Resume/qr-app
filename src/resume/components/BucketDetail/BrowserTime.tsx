import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import SelectFilter from "../../filter/SelectFilter"
import DateRangeFilter from "../../filter/DateRangeFilter"
import { useRequest } from "ahooks"
import { ItemQueryRequest, queryItems } from "@api/query"

type Metrics = "focus" | "time"

const BrowserTime = (props: { bucketId: number }) => {
    const { bucketId } = props
    const [dateRange, setDateRange] = useState<[Dayjs?, Dayjs?]>([dayjs().add(-30, 'day'), dayjs()])
    const [] = useState()

    const { data } = useRequest(async () => {
        const req: ItemQueryRequest = {
            bucket: { id: bucketId },
            tsStart: dateRange?.[0]?.valueOf(),
            tsEnd: dateRange?.[1]?.valueOf(),
        }
        const result = await queryItems(req)
        return result?.items
    }, { refreshDeps: [dateRange] })

    return (
        <div>
            <div style={{ display: 'flex', gap: 30 }}>
                <SelectFilter />
                <DateRangeFilter defaultValue={dateRange} onChange={setDateRange} />
            </div >
        </div>
    )
}

export default BrowserTime