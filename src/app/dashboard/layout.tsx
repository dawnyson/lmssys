export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="max-w-screen-xl h-full mx-auto p-4">
            {children}
        </section>
    );
}