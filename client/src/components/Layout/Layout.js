import Footer from "../../pages/Footer"
import Header from "./Header"
import {Toaster} from "react-hot-toast"
 
export default function Layout({children}){
    return (
        <>
            <Header />
            <main style={{minHeight:"80vh"}}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </>
    )
}