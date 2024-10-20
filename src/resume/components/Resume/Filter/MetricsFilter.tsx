import { MetricsSelector } from "@api/resume"
import { MenuItem, Select, SelectChangeEvent } from "@mui/material"

type Props = {
    schema: MetricsSelector
    value?: string
    onChange?: (val: string) => void
}

const MetricsFilter = (props: Props) => {
    const { schema, value, onChange } = props
    const { options } = schema

    return (
        <Select
            size="small"
            label='Metrics'
            style={{ width: 160 }}
            value={value || ''}
            onSelect={v => console.log(v)}
            onChange={(e: SelectChangeEvent<string>) => onChange?.(e.target?.value)}
        >
            {options?.map?.(item => (
                <MenuItem
                    key={`MetricsSelectFilter-${item?.value}`}
                    value={item.value}
                    children={item.label}
                />
            ))}
        </Select>
    )
}

export default MetricsFilter

export const initialMetrics = (schema: MetricsSelector): string | undefined => {
    const { defaultValue, required, options } = schema
    if (defaultValue) return defaultValue
    return required ? options?.[0]?.value : undefined
}