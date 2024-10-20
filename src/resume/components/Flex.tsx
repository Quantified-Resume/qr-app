import { CSSProperties, ReactElement } from "react"

type Props = {
    children?: any
} & Pick<
    CSSProperties,
    | 'justifyContent' | 'alignItems' | 'flexDirection' | 'gap' | 'flex'
    | 'width' | 'height' | 'padding' | 'boxSizing'
>

const Flex = (props: Props) => {
    const { children, ...styleProps } = props

    return (
        <div style={{ display: 'flex', ...styleProps }}>
            {children}
        </div>
    )
}

export default Flex