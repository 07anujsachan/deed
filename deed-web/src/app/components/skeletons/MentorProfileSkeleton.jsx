import { Skeleton } from "@/components/ui/Skeleton";

export default function MentorProfileSkeleton() {
  return (
    <div className='mx-auto animate-pulse'>
      <div className='min-h-screen bg-[#E3F1E8] font-sans'>
        {/* Header Section */}
        <div className='bg-gradient-to-b from-white to-[#E3F1E8] relative'>
          <div className='max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8'>
            {/* Profile Image Skeleton */}
            <Skeleton className='w-[300px] h-[300px] rounded-full shrink-0' />

            {/* Name + Title + Connect Button */}
            <div className='flex flex-col md:flex-row justify-between w-full items-center gap-4'>
              <div className='flex-1 space-y-4 w-full text-center md:text-left'>
                <Skeleton className='h-8 w-3/4 md:w-1/2' />
                <Skeleton className='h-6 w-full md:w-2/3' />
              </div>
              <Skeleton className='h-12 w-48 rounded-lg shrink-0' />
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className='max-w-6xl mx-auto px-6 flex gap-8 border-b border-gray-300 pb-3 mt-8 overflow-x-auto'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-6 w-24' />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Left Column */}
          <div className='md:col-span-2 space-y-6'>
            <div className='space-y-3'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
            <div className='space-y-3 pt-6'>
              <Skeleton className='h-6 w-32' />
              <div className='flex gap-3'>
                <Skeleton className='h-8 w-8 rounded-full' />
                <Skeleton className='h-8 w-8 rounded-full' />
                <Skeleton className='h-8 w-8 rounded-full' />
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className='bg-white rounded-xl w-full p-4 h-fit space-y-6'>
            <Skeleton className='h-6 w-40' />
            <div className='grid grid-cols-2 gap-4'>
              <Skeleton className='h-16 w-full rounded' />
              <Skeleton className='h-16 w-full rounded' />
              <Skeleton className='h-16 w-full rounded' />
              <Skeleton className='h-16 w-full rounded' />
            </div>
            <div className='pt-4 space-y-3'>
              <Skeleton className='h-6 w-40' />
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-6 w-20 rounded-full' />
                <Skeleton className='h-6 w-24 rounded-full' />
                <Skeleton className='h-6 w-16 rounded-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
