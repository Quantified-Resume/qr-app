import { Container } from "@mui/material"
import { useRequest } from "ahooks"
import { Bucket, getBucketDetail } from "../../../api/bucket"
import { useMatch } from "react-router"

async function queryDetail(idStr?: string): Promise<Bucket | undefined> {
    if (!idStr) return undefined
    const id = parseInt(idStr)
    return getBucketDetail(id)
}

const BucketDetail = () => {
    const match = useMatch("/bucket/:id")
    const { data: detail } = useRequest(
        () => queryDetail(match?.params?.id),
        { refreshDeps: [match] },
    )
    return (
        <Container>
            {detail?.name}
        </Container>
    )
}

export default BucketDetail