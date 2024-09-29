import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from "dayjs"
import { useState } from "react"
import DateFilter from './DateFilter'

type Props = {
    defaultValue?: [Dayjs?, Dayjs?]
    onChange?: (val: [Dayjs?, Dayjs?]) => void
}

const DateRangeFilter = (props: Props) => {
    const { defaultValue, onChange } = props
    const [start, setStart] = useState<Dayjs | null>(defaultValue?.[0] ?? null)
    const [end, setEnd] = useState<Dayjs | null>(defaultValue?.[1] ?? null)

    const handleChange = (start: Dayjs | null, end: Dayjs | null) => {
        if (start && end && start.isAfter(end)) {
            setEnd(start)
            setStart(end)
        } else {
            setStart(start)
            setEnd(end)
        }
        onChange?.([start ?? undefined, end ?? undefined])
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <DateFilter value={start} onChange={v => handleChange(v, end)} label="Start date" />
                <span>-</span>
                <DateFilter value={end} onChange={v => handleChange(start, v)} label="End date" />
            </div>
        </LocalizationProvider>
    )
}

export default DateRangeFilter