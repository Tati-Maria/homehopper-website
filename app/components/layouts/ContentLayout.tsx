'use client'

const ContentLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section
    className="flex flex-col gap-2"
    >
        {children}
    </section>
  )
}

export default ContentLayout