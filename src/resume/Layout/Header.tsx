import { Button, List, MenuItem, Popover } from "@mui/material"
import { useRequest } from "ahooks"
import { useLocation, useNavigate } from "react-router"
import { listAllBuckets } from "../../api/bucket"
import { useEffect, useRef, useState } from "react"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"

const calcInitialBucket = (pathname: string): number | null => {
    const pattern = /^\/bucket\/(?<bucketId>[^\/])\/?/
    const res = pattern.exec(pathname)
    if (!res) return null
    const bidStr = res.groups?.bucketId?.toString?.()
    if (!bidStr) return null
    try {
        return parseInt(bidStr)
    } catch {
        return null
    }
}

const BucketSelect = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [bucketId, setBucketId] = useState(calcInitialBucket(location?.pathname))
    const [open, setOpen] = useState(false)
    const { data: buckets } = useRequest(listAllBuckets, {
        onSuccess: list => {
            const needSetFirst = !bucketId || !list?.some?.(b => b.id === bucketId)
            needSetFirst && setBucketId(list?.[0]?.id)
        }
    })
    const anchor = useRef(null)
    const handleSelect = (val: number) => {
        setOpen(false)
        setBucketId(val)
    }
    useEffect(() => {
        const path = `/bucket/${bucketId}`
        navigate(path, { replace: false })
    }, [bucketId])
    return <>
        <Button
            variant="text"
            onClick={() => setOpen(true)}
            size="large"
            ref={anchor}
        >
            Buckets
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
        <Popover
            open={open}
            anchorEl={anchor.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onClose={() => setOpen(false)}
        >
            <List>
                {buckets?.map(b => (
                    <MenuItem
                        onClick={e => handleSelect(e.currentTarget?.value)}
                        key={`menu-${b.id}`}
                        value={b.id}
                        selected={b.id === bucketId}
                        children={b.name}
                    />
                ))}
            </List>
        </Popover>
    </>

}

const Header = () => {
    return (
        <div style={{
            display: 'flex',
            height: 60,
            width: '100%',
            justifyContent: 'space-between',
            padding: '0 40px',
            boxSizing: 'border-box',
            alignItems: 'center',
        }}>
            <div style={{ flex: 1, textAlign: 'start' }}>
                <BucketSelect />
            </div>
            <div style={{ flex: 1 }}>
                Quantified Resume
            </div>
            <div style={{ flex: 1, textAlign: 'end' }}>
                Right
            </div>
        </div>
    )
}
export default Header