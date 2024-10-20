import { Divider } from "@mui/material"
import { Outlet, Route, Routes } from "react-router"
import { HashRouter } from "react-router-dom"
import BucketDetail from "../pages/BucketDetail"
import Header from "./Header"
import Flex from "@resume/components/Flex"

const _Layout = () => {
    return (
        <Flex flexDirection="column">
            <Header />
            <Divider />
            <div style={{ width: '100%', flex: 1 }}>
                <Outlet />
            </div>
        </Flex>
    )
}

export default () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<_Layout />}>
                    <Route path="bucket/:id" element={<BucketDetail />} />
                    <Route path="*" element={<div>404</div>} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

