import { AnimatePresence, HTMLMotionProps, motion, Variants } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react"
import { createPortal } from "react-dom";

type SidebarContextProps = {
  open: boolean;
  direction: 'top' | 'right' | 'bottom' | 'left';
  openSidebar: () => void;
  closeSidebar: () => void;
};


type SidebarProps = {
  direction: SidebarContextProps['direction']
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export default function Sidebar({ children, direction }: React.PropsWithChildren<SidebarProps>) {
  const [open, setOpen] = useState(false)
  const openSidebar = () => {
    setOpen(true)
  }
  const closeSidebar = () => {
    setOpen(false)
  }
  const contextValue: SidebarContextProps = {
    open,
    direction,
    openSidebar,
    closeSidebar,
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up on unmount or when open changes.
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
      <SidebarOverlay onClick={closeSidebar} />
    </SidebarContext.Provider>
  )
}

export function SidebarOverlay({ onClick }: { onClick: () => void }) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarOverlay must be used within a Sidebar");
  }
  const { open } = context;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-999"
        />
      )}
    </AnimatePresence>,
    document.body
  );
}

export function SidebarTrigger({ children, onClick, ...props }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarTrigger must be used within a Sidebar");
  }
  const { openSidebar } = context;
  
  return (
    <button
      {...props}
      onClick={
        e => {
          if (onClick !== undefined) {
            onClick(e)
          }
          openSidebar()
        }
      }
    >
      {children}
    </button>
  );
}

export function SidebarContent({ children, className, ...props }: React.PropsWithChildren<HTMLMotionProps<'div'>>) {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("SidebarContent must be used within a Sidebar");
  }
  const { open, closeSidebar, direction } = context;
  const variants: Variants = {
    entry: {
      top: direction === 'top' ? '-100%' : undefined,
      right: direction === 'right' ? '-100%' : undefined,
      bottom: direction === 'bottom' ? '-100%' : undefined,
      left: direction === 'left' ? '-100%' : undefined,
    },
    animate: {
      top: direction === 'top' ? 0 : undefined,
      right: direction === 'right' ? 0 : undefined,
      bottom: direction === 'bottom' ? 0 : undefined,
      left: direction === 'left' ? 0 : undefined,
    },
    exit: {
      top: direction === 'top' ? '-100%' : undefined,
      right: direction === 'right' ? '-100%' : undefined,
      bottom: direction === 'bottom' ? '-100%' : undefined,
      left: direction === 'left' ? '-100%' : undefined,
    }
  }
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          variants={variants}
          initial='entry'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.3 }}
          className={
            `fixed z-1000 overflow-y-auto p-4 scrollbar ${(direction === 'top' || direction === 'bottom') ? 'inset-x-0 h-[20%]' : 'inset-y-0 w-[20%]'} text-text bg-background border-2 border-gray-400/20 rounded-xl flex flex-col items-stretch` +
            (className ? " " + className : "")
          }
          {...props}
        >
          <button
            className="absolute z-10 top-6 right-6 text-2xl rounded-lg size-6 outline-none flex items-center justify-center text-center border-2 border-transparent hover:border-text transition-colors"
            onClick={closeSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 cursor-pointer"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <div className="sr-only">Close sidebar</div>
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function SidebarHeader({ children, className, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={"p-1 text-xl font-bold sticky top-0 bg-background" + (className ? ' '+className : '')}
      // style={{
      //   // Option 1: Using sticky so header stays in view when body scrolls.
      //   position: "sticky",
      //   top: 0,
      //   background: "white",
      //   zIndex: 1,
      //   ...props.style,
      // }}
    >
      {children}
    </div>
  );
}

export function SidebarBody({ children, className, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={"py-4 mb-auto" + (className ? ' '+className : '')}
    >
      {children}
    </div>
  )
}

export function SidebarFooter({ children, className, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...props}
      className={"mt-auto bg-background z-10" + (className ? ' '+className : '')}
    >
      {children}
    </div>
  )
}

export function SidebarActionBtn({ children, className, onClick, ...props }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("SidebarCloseBtn must be used within a Sidebar")
  }

  const { closeSidebar } = context
  return (
    <button
      {...props}
      className={"py-2 px-4 bg-blue-500 rounded-lg text-white transition-all disabled:grayscale disabled:cursor-not-allowed not-disabled:cursor-pointer" + (className ? ' '+className : '')}
      onClick={
        e => {
          if (onClick !== undefined) {
            onClick(e)
          }
          closeSidebar()
        }
      }
    >
      {children}
    </button>
  )
}

export function SidebarCloseBtn({ children, className, onClick, ...props }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("SidebarCloseBtn must be used within a Sidebar")
  }
  const { closeSidebar } = context
  return (
    <button
      {...props}
      className={"py-2 px-4 bg-red-500 rounded-lg text-white transition-all disabled:grayscale disabled:cursor-not-allowed not-disabled:cursor-pointer" + (className ? ' '+className : '')}
      onClick={
        e => {
          if (onClick !== undefined) {
            onClick(e)
          }
          closeSidebar()
        }
      }
    >
      {children}
    </button>
  )
}