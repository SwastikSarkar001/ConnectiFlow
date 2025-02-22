"use client"

import Spline from "@splinetool/react-spline"
import { Application, SPEObject } from "@splinetool/runtime";
import { useRef } from "react"
import { Bodoni_Moda } from "next/font/google";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Button
} from "@/components/ui/button"
import { Menu } from "lucide-react";
import ThemeToggler from "@/components/ThemeToggler";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

const bodoniModa = Bodoni_Moda({ subsets: ['latin'] })

export default function Hero() {
  const splineRef = useRef<SPEObject | undefined>(undefined)
  function onLoad(spline: Application) {
    const obj = spline.findObjectByName('Chain');
    splineRef.current = obj;
  }
  return (
    <section className="relative h-screen flex flex-col items-stretch overflow-hidden bg-background">
      <div className="flex items-center bg-red-200">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className="text-foreground">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className={`${bodoniModa.className}`}>
                ConnectiFlow
              </SheetTitle>
            </SheetHeader>
            <div>
              <ThemeToggler />
            </div>
          </SheetContent>
        </Sheet>
        <h1>ConnectiFlow</h1>
        <div>
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
        </div>
      </div>
      <div>

      </div>
      {/* <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${bodoniModa.className}`}>ConnectiFlow</h1> */}
      {/* <p className="text-xl text-white md:text-2xl mb-8 absolute z-1">Bridging the gap between physically abled and disabled individuals</p> */}
      <div className="absolute top-20 bottom-0 inset-x-0 z-2 pointer-events-none after:absolute after:w-40 after:h-20 after:bottom-0 after:right-0 after:z-1 after:pointer-events-none after:bg-background">
        <Spline
          scene="https://prod.spline.design/HYajYOXALionEIiP/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      {/* <div className="relative z-10 text-center text-white">
        <a
          href="#features"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Learn More
        </a>
      </div> */}
    </section>
  )
}

