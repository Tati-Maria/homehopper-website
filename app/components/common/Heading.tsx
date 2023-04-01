'use client'

interface HeadingProps {
    title: string;
    subText?: string;
    center?: boolean;
}

const Heading = ({title, subText, center}: HeadingProps) => {
  return (
    <article
    className={`${center ? 'text-center' : 'text-start'}`}
    >
        <h2
        className='text-2xl font-bold'
        >
            {title}
        </h2>
        <h3
        className='text-neutral-500 mt-2 font-light'
        >
            {subText}
        </h3>
    </article>
  )
}

export default Heading;