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
import Image from "next/image";
import {
  Button
} from "@/components/ui/button"
import { Menu } from "lucide-react";
import ThemeToggler from "@/components/ThemeToggler";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const bodoniModa = Bodoni_Moda({ subsets: ['latin'] })

export default function Hero() {
  const splineRef = useRef<SPEObject | undefined>(undefined)
  function onLoad(spline: Application) {
    const obj = spline.findObjectByName('Chain');
    splineRef.current = obj;
  }
  return (
    <section className="relative h-screen flex flex-col items-stretch justify-between pb-20 overflow-hidden bg-[#1e1e1e]">
      <div className='flex items-center justify-between w-full py-4 px-8'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className="text-foreground">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                
                <div>ConnectiFlow</div>
              </SheetTitle>
            </SheetHeader>
            <div>
              <ThemeToggler />
            </div>
          </SheetContent>
        </Sheet>
        <div className="!tracker-wider text-xl flex">
          <div>C o n n e c t i F l o w</div>
          </div>
        <div>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-red-400">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
      <div>

      </div>
      {/* <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${bodoniModa.className}`}>ConnectiFlow</h1> */}
      <p className={`text-2xl text-foreground md:text-3xl mb-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-8 z-1`}>Bridging the gap between physically abled and disabled individuals</p>
      <div className="absolute top-20 bottom-0 inset-x-0 z-2 pointer-events-none after:absolute after:w-40 after:h-20 after:bottom-0 after:right-0 after:z-1 after:pointer-events-none after:bg-[#1e1e1e]">
        <Spline
          scene="https://prod.spline.design/HYajYOXALionEIiP/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      <div className="relative z-10 text-center text-white justify-self-end">
        <Link
          href='/about'
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  )
}

