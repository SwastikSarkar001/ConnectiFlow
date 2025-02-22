export default function Tiles() {
  return (
    <div className="relative min-h-screen">
      <div className="grid grid-cols-3 h-screen gap-8 p-8">
        <div className="col-span-1 border-2 rounded-xl border-gray-400/30"></div>
        <div className="col-span-2 border-2 rounded-xl border-gray-400/30"></div>
        <div className="col-span-2 border-2 rounded-xl border-gray-400/30"></div>
        <div className="col-span-1 border-2 rounded-xl border-gray-400/30"></div>
      </div>
      <div className="bg-radial -translate-x-1/2 -trnslate-y-1/2 from-emerald-500/20 to-70% to-transparent absolute top-[calc(50%_-_4rem)] left-[calc(100%_/_3)] size-40 blur-1" />
      <div className="bg-radial -translate-x-1/2 -trnslate-y-1/2 from-red-500/20 to-70% to-transparent top-[calc(50%_-_4rem)] left-[calc(200%_/_3)] absolute top-0 size-40 blur-1" />
    </div>
  )
}
