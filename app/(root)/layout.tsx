import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="h-screen flex flex-col justify-between">
            <NavBar />

            {children}

            <Footer />
        </main>
    )
}