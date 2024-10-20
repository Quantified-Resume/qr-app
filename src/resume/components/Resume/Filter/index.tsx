import { ResumeSchema } from "@api/resume"
import { Search } from "@mui/icons-material"
import { Button } from "@mui/material"
import Flex from "@resume/components/Flex"
import { useState } from "react"
import MetricsFilter, { initialMetrics } from "./MetricsFilter"
import TsFilter, { initialTs } from "./TsFilter"

type Props = {
    schema?: ResumeSchema['filters']
}

export type FilterParam = {
    metrics?: string
    tsStart?: number
    tsEnd?: number
} & Record<string, any>


const initialValue = (schema?: ResumeSchema['filters']): FilterParam => {
    const param: FilterParam = {}
    schema?.forEach(s => {
        const type = s.type
        if (type === 'ts') {
            const [tsStart, tsEnd] = initialTs(s)
            param.tsStart = tsStart
            param.tsEnd = tsEnd
        } else if (type === 'metrics') {
            param.metrics = initialMetrics(s)
        }
    })

    return param
}

const Filter = (props: Props) => {
    const { schema } = props

    const [param, setParam] = useState<FilterParam>(initialValue(schema))

    const updateParam = (toUpdate: FilterParam) => {
        const newParam = { ...param || {}, ...toUpdate || {} }
        setParam(newParam)
    }

    return (
        <Flex justifyContent="space-between" width='100%'>
            <Flex gap={30}>
                {schema?.map?.((s, idx) => {
                    const { type } = s
                    const key = `${s}_${idx}`
                    if (type === 'ts') {
                        return <TsFilter
                            key={key}
                            schema={s}
                            value={[param.tsStart, param.tsEnd]}
                            onChange={(tsStart, tsEnd) => updateParam({ tsStart, tsEnd })}
                        />
                    } else if (type === 'metrics') {
                        return <MetricsFilter
                            key={key}
                            schema={s}
                            value={param.metrics}
                            onChange={metrics => updateParam({ metrics })}
                        />
                    } else {
                        return ''
                    }
                })}
            </Flex>
            <div>
                <Button
                    startIcon={<Search />}
                    variant="outlined"
                    type="button"
                >
                    Query
                </Button>
            </div>
        </Flex>
    )
}

export default Filter