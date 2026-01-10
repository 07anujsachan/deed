const Loader = () => {
  return (
    <div className='w-full h-1 bg-gray-200 rounded-full overflow-hidden'>
      <div className='h-full bg-green-500 animate-progress origin-left-right'></div>
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 70%;
            margin-left: 30%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-progress {
          animation: progress 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Loader;
