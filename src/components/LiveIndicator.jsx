export default function LiveIndicator({ size = 24 }) {
  const dot = Math.max(4, Math.round(size / 4));
  return (
    <div
      className="rounded-full border border-rose-500 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors"
      style={{ width: size, height: size }}
    >
      <div
        className="bg-rose-500 rounded-full"
        style={{ width: dot, height: dot }}
      ></div>
    </div>
  );
}
