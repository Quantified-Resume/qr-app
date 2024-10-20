import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from "dayjs"
import DateFilter from './DateFilter'
import Flex from '@resume/components/Flex'

type Props = {
    value?: [Dayjs?, Dayjs?]
    onChange?: (start?: Dayjs, end?: Dayjs) => void
}

const DateRangeFilter = (props: Props) => {
    const { value: [start, end] = [], onChange } = props

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Flex gap={10} alignItems="center">
                <DateFilter value={start} onChange={v => onChange?.(v ? v : undefined, end)} label="Start date" />
                <span>-</span>
                <DateFilter value={end} onChange={v => onChange?.(start, v ? v : undefined)} label="End date" />
            </Flex>
        </LocalizationProvider>
    )
}

export default DateRangeFilter