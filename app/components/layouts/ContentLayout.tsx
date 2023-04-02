'use client'

const ContentLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section
    className="flex flex-col"
    >
        {children}
    </section>
  )
}

export default ContentLayout