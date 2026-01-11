import { Skeleton } from "@/components/ui/Skeleton";

export default function MentorListSkeleton() {
  return (
    <div className='flex gap-4 overflow-hidden'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='shrink-0' style={{ width: "300px" }}>
          <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full flex flex-col gap-4'>
            {/* Header with Avatar */}
            <div className='flex items-center gap-3'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-3 w-32' />
              </div>
            </div>
            {/* chips */}
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-16 rounded-full' />
              <Skeleton className='h-6 w-20 rounded-full' />
            </div>
            {/* Education */}
            <div className='space-y-2 mt-2'>
              <div className='flex gap-2'>
                <Skeleton className='h-8 w-8 rounded bg-gray-100' />
                <div className='space-y-1'>
                  <Skeleton className='h-3 w-40' />
                  <Skeleton className='h-3 w-28' />
                </div>
              </div>
              <div className='flex gap-2'>
                <Skeleton className='h-8 w-8 rounded bg-gray-100' />
                <div className='space-y-1'>
                  <Skeleton className='h-3 w-40' />
                  <Skeleton className='h-3 w-28' />
                </div>
              </div>
            </div>
            {/* Button */}
            <Skeleton className='h-10 w-full rounded-lg mt-auto' />
          </div>
        </div>
      ))}
    </div>
  );
}
