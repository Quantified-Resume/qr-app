import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem'

type Props<T extends string | number> = {
    options?: {
        label?: string
        value?: T
    }[]
    value?: T
    onChange?: (val: T) => void
    label?: string
}

const SelectFilter = <T extends string | number>(props: Props<T>) => {
    const { label, options, value, onChange } = props
    return (
        <Select
            size="small"
            label={label}
            style={{ width: 160 }}
            value={value}
            onChange={(e: SelectChangeEvent<T>) => onChange?.(e.target?.value as T)}
        >
            {options?.map?.(item => (
                <MenuItem
                    key={`SelectFilter-${item?.value}`}
                    value={item.value}
                    children={item.label}
                />
            ))}
        </Select>
    )
}

export default SelectFilter