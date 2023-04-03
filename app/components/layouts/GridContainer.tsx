export default function GridContainer({ children }: { children: React.ReactNode }) {
    return (
        <section
        aria-label="Grid Container"
        id="grid-container" 
         className="grid gap-8 grid-cols-fluid-2 mt-10">
            {children}
        </section>
    )
}