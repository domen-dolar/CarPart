import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="h-screen flex flex-col justify-between">
            <NavBar />

            {children}

            <Footer />
        </main>
    )
}