function Loading() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <p className="text-center animate-pulse text-blue-400">Loading</p>
      <div className="h-8 w-8 border-[3px] border-r-blue-400 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
