import { queryResumeSchema } from "@api/resume"
import { useRequest } from "ahooks"
import Flex from "../Flex"
import Filter from "./Filter"
import { ResumeContext } from "./context"

type Props = {
    bucketId: number
}

const Resume = (props: Props) => {
    const { bucketId } = props

    const { data: schema } = useRequest(() => queryResumeSchema(bucketId))

    return (
        <ResumeContext.Provider value={{ bucketId }}>
            {schema ? (
                <Flex>
                    <Filter schema={schema?.filters} />
                </Flex>
            ) : (
                <div></div>
            )}

        </ResumeContext.Provider>
    )
}

export default Resume