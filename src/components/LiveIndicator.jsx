export default function LiveIndicator({ size = 24 }) {
  const dot = Math.max(4, Math.round(size / 4));
  return (
    <div
      className="rounded-full border border-[#00973A] flex items-center justify-center group-hover:bg-[#00973A]/20 transition-colors"
      style={{ width: size, height: size }}
    >
      <div
        className="bg-[#00973A] rounded-full"
        style={{ width: dot, height: dot }}
      ></div>
    </div>
  );
}
