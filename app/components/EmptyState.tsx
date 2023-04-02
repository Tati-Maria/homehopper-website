'use client'
import { useRouter } from "next/navigation";
import Heading from "./common/Heading";
import Button from "./common/Button";

interface EmptyStateProps {
    title?: string;
    subTitle?: string;
    showResetButton?: boolean;
}

const EmptyState = (
    {title = 'No listings found', 
    subTitle = 'Try adjusting your search or reset your filters',
    showResetButton
}: EmptyStateProps) => {

    const router = useRouter();

  return (
    <div
    className='h-[calc(100vh-6rem)] flex flex-col items-center justify-center gap-2'
    >
        <Heading
        center
        title={title}
        subText={subTitle}
        />
        <div className="w-48 mt-4">
            {showResetButton && (
                <Button
                outline
                label="Reset filters"
                onClick={() => router.push('/')} 
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState;