const GlassBackground = () => {
  // Make sure parent has relative position
  return (
    <div className="absolute z-10 hidden group-hover:block shadow-lg shadow-black/30 rounded-md backdrop-blur-sm -inset-x-6 -inset-y-6 bg-cyan-700/10 animate-in group-hover:zoom-in-50 duration-30 overflow-hidden">
      <div className="absolute z-20 bg-white/60 opacity-5 left-1/2 h-full w-2/3 -skew-x-12 border-2 border-l-0 border-white" />
    </div>
  );
};

export default GlassBackground;
