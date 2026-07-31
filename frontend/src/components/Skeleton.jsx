function Skeleton({
  className = ""
}) {
  return (
    <div
      className={`
        animate-pulse
        rounded-lg
        bg-slate-300
        dark:bg-slate-700
        ${className}
      `}
    />
  );
}

export default Skeleton;