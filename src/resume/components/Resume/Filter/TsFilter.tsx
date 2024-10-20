import { TsPicker } from "@api/resume"
import { cvtTs2Dayjs, endOfDay, endOfToday, startOfDay, startOfToday } from "@util/time"
import dayjs, { Dayjs } from "dayjs"
import DateFilter from "./DateFilter"
import DateRangeFilter from "./DateRangeFilter"

type Props = {
    schema: TsPicker
    value?: [number?, number?]
    onChange?: (startTs?: number, endTs?: number) => void
}

const computeRangeEnd = (endTs?: number): Dayjs | undefined => {
    if (!endTs) return
    return cvtTs2Dayjs(Math.min(endTs, Date.now()))
}

const TsFilter = (props: Props) => {
    const {
        schema,
        value: [start, end] = [,],
        onChange,
    } = props

    const handleSingleChange = (val?: Dayjs) => {
        const start = val ? startOfDay(val) : undefined
        const end = val ? endOfDay(val) : undefined
        onChange?.(start, end)
    }

    return (
        schema?.range
            ? <DateRangeFilter
                value={[cvtTs2Dayjs(start), computeRangeEnd(end)]}
                onChange={(start, end) => onChange?.(start?.valueOf?.(), end?.valueOf?.())}
            />
            : <DateFilter
                value={cvtTs2Dayjs(start)}
                onChange={handleSingleChange}
            />
    )
}

export default TsFilter

export const initialTs = (schema: TsPicker): [number?, number?] => {
    const { range, required } = schema
    if (!required) return [,]
    if (!range) return [startOfToday(), endOfToday()]

    const start = dayjs().add(-30, 'day')
    return [startOfDay(start), endOfToday()]
}