import { Bucket, getBucketDetail } from "@api/bucket"
import { Container } from "@mui/material"
import { useRequest } from "ahooks"
import { useMatch } from "react-router"
import BrowserTime from "./BrowserTime"
import Header from "./Header"

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
        <Container style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%' }}>
                <Header value={detail} />
                <div>
                    {detail?.builtin === 'BrowserTime' && <BrowserTime bucketId={detail?.id} />}
                </div>
            </div>
        </Container>
    )
}

export default BucketDetail