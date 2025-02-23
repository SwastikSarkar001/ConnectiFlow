import Spline from "@splinetool/react-spline";
import { SPEObject, Application } from "@splinetool/runtime";
import { useRef } from "react";

export default function Tiles() {
  const splineRef = useRef<SPEObject | undefined>(undefined)
  function onLoad(spline: Application) {
    const obj = spline.findObjectByName('Chain');
    splineRef.current = obj;
  }
  return (
    <div className="relative min-h-screen">
      <div className="absolute overflow-hidden -top-1 bottom-0 inset-x-0 z-2 after:absolute after:w-40 after:h-20 after:bottom-0 after:right-0 after:z-1 after:pointer-events-none after:bg-background">
        <Spline
          scene="https://prod.spline.design/QZbnCaRaEajXEQ6X/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      <div className="relative z-2 grid grid-cols-3 h-screen gap-8 p-8">
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
