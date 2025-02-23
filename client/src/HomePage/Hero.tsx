import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar, { SidebarBody, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger } from "../utilities/Sidebar";
import { useRef } from "react";
import Spline from "@splinetool/react-spline";
import { SPEObject, Application } from "@splinetool/runtime";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { useAppDispatch } from "../states/store";
import { toggleTheme } from "../states/reducers/themeSlice";

export default function Hero() {
  const splineRef = useRef<SPEObject | undefined>(undefined)
  function onLoad(spline: Application) {
    const obj = spline.findObjectByName('Chain');
    splineRef.current = obj;
  }
  const dispatch = useAppDispatch()

  return (
    <div className="relative text-theme-white pt-6 pb-16 h-screen flex flex-col items-center justify-between bg-[#1e1e1e]">
      <div className="relative z-90 flex items-center justify-between px-4 md:px-8 w-full">
        <Sidebar direction="left">
          <SidebarTrigger className="relative z-10 cursor-pointer">
            <GiHamburgerMenu className="size-[1.5em]" />
            <div className="sr-only">Open Sidebar</div>
          </SidebarTrigger>
          <SidebarContent className="!w-full md:!w-100">
            <SidebarHeader>
              ConnectiFlow
            </SidebarHeader>
            <SidebarBody>
              <Link to='/' className="transition-colors hover:bg-blue-500/20 block py-2 px-4">Home<div className="sr-only">Home</div></Link>
              <Link to='/about' className="transition-colors hover:bg-blue-500/20 block py-2 px-4">About<div className="sr-only">About</div></Link>
              <Link to='/chat' className="transition-colors hover:bg-blue-500/20 block py-2 px-4">Chat<div className="sr-only">Chat</div></Link>
              <Link to='/chatbot' className="transition-colors hover:bg-blue-500/20 block py-2 px-4">ChatBot<div className="sr-only">Chatbot</div></Link>
              <Link to='/contact-us' className="transition-colors hover:bg-blue-500/20 block py-2 px-4">Contact Us<div className="sr-only">Contact us</div></Link>
            </SidebarBody>
            <SidebarFooter>
              <button onClick={() => dispatch(toggleTheme())} className="transition-colors hover:bg-blue-500/20 block py-2 px-4">Toggle Theme</button>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
        <Link to='/' className="text-xl flex items-center gap-4">
          <Logo className="fill-theme-white size-[1.5em]" />
          <div className="tracking-widest md:tracking-[8px]">ConnectiFlow</div>
        </Link>
        {/* Authentication Logic will be implemented below */}
        <button className="p-2 md:p-4 cursor-pointer text-lg bg-radial from-white/20 to-30% to-transparent transition-colors">
          Login
        </button>
      </div>
      <div className="absolute -top-1 bottom-0 inset-x-0 z-2 pointer-events-none after:absolute after:w-40 after:h-20 after:bottom-0 after:right-0 after:z-1 after:pointer-events-none after:bg-[#1e1e1e]">
        <Spline
          scene="https://prod.spline.design/HYajYOXALionEIiP/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      <div className="absolute tracking-wide -top-1 bottom-0 inset-x-0 z-1 flex items-center justify-center text-4xl text-center font-light px-8">
        <div>Bridging the gap between physically abled and disabled individuals</div>
      </div>
      <div className="relative z-10 text-center text-white">
        <div className="">
          {/* Authentication Logic will be implemented here */}
          <Link
            to='/sign'
            className="bg-theme-black px-6 py-2 rounded-full relative after:absolute after:-inset-[2px] after:bg-gradient-to-r after:from-stone-300 after:to-stone-500 after:to-50% after:-z-1 after:rounded-full after:shadow-lg after:blur-[1px] after:opacity-50 after:transition-opacity after:duration-300 after:delay-100 after:content-['']"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
