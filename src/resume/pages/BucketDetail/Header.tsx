import { Bucket, Builtin } from "@api/bucket"
import { Card, Chip } from "@mui/material"

type Props = {
    value?: Bucket
}

const BUILTIN_LABEL: { [b in Builtin]: string } = {
    BrowserTime: "Time Tracker - Browser Extension",
}

const BuiltinTag = (props: { value?: Builtin }) => {
    const { value } = props
    if (!value) return null
    const label = BUILTIN_LABEL[value] || value
    return <Chip variant="outlined" size="small" color="primary" label={label} />
}

const Header = (props: Props) => {
    const { value } = props
    return (
        <Card variant="outlined" style={{ padding: 20, textAlign: 'start' }}>
            <h2>{value?.name}</h2>
            <div>
                <BuiltinTag value={value?.builtin} />
            </div>
        </Card>
    )
}

export default Header