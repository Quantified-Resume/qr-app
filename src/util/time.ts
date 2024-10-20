import dayjs, { Dayjs } from "dayjs"

export function startOfToday(): number {
    return startOfDay(dayjs())
}

export function startOfDay(day: Dayjs): number {
    return day
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0)
        .valueOf()
}

export function endOfToday(): number {
    return endOfDay(dayjs())
}

export function endOfDay(day: Dayjs): number {
    return day
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .set('millisecond', 999)
        .valueOf()
}

export const cvtTs2Dayjs = (ts?: number): Dayjs | undefined => {
    if (!ts) return
    return dayjs(ts)
}