import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"

type Props = {
    value?: Dayjs | null
    onChange?: (val: Dayjs | null) => void
    label?: string
}

const DateFilter = (props: Props) => {
    const { label, value, onChange } = props

    return (
        <DatePicker
            slotProps={{
                textField: { size: 'small', style: { width: 160 } },
            }}
            shouldDisableDate={(val: Dayjs) => val.isAfter(dayjs())}
            value={value}
            onChange={onChange}
            label={label}
        />
    )
}

export default DateFilter