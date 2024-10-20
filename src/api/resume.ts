/**
 * Filter by timestamp
 */
export type TsPicker = {
    type: 'ts'
    range?: boolean
    required?: boolean
}

export type MetricsOption = {
    value: string
    label?: string
}

/**
 * Metrics selector
 */
export type MetricsSelector = {
    type: 'metrics'
    options?: MetricsOption[]
    required?: boolean
    defaultValue?: string
}

export type Filter = TsPicker | MetricsSelector

export type Row = {
    height: number | string
    cols?: Col[]
}

export type Col = {
    span?: number
    item: Item
}

type Indicator = {
    type: 'indicator'
}

type LineChart = {
    type: 'line'
}

export type Item = Indicator | LineChart

export type ResumeSchema = {
    filters: Filter[]
    content: Row[]
}

export async function queryResumeSchema(bucketId: number): Promise<ResumeSchema> {
    return {
        filters: [
            {
                type: 'metrics',
                required: true,
                options: [{
                    value: 'focus',
                    label: 'Browsing time',
                }, {
                    value: 'visit',
                    label: 'Visit count',
                }],
            }, {
                type: 'ts',
                required: true,
                range: true,
            }
        ],
        content: [
            {
                height: 60,
                cols: [{
                    item: {
                        type: 'indicator'
                    }
                }, {
                    item: {
                        type: 'indicator'
                    }
                }, {
                    item: {
                        type: 'indicator'
                    }
                }, {
                    item: {
                        type: 'indicator'
                    }
                }]
            }, {
                height: 80,
                cols: [{
                    item: { type: 'line' }
                }]
            }
        ]
    }
}