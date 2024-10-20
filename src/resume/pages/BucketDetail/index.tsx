import { Bucket, getBucketDetail } from "@api/bucket"
import { Container } from "@mui/material"
import Flex from "@resume/components/Flex"
import Resume from "@resume/components/Resume"
import { useRequest } from "ahooks"
import { useMatch } from "react-router"
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
            <Flex flexDirection="column" gap={30} width="100%">
                <Header value={detail} />
                <div>
                    {detail?.id && <Resume bucketId={detail?.id} />}
                    {/* {detail?.builtin === 'BrowserTime' && <BrowserTime bucketId={detail?.id} />} */}
                </div>
            </Flex>
        </Container>
    )
}

export default BucketDetail