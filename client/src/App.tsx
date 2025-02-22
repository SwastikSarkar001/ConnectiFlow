import { createContext, lazy, useEffect, useState } from 'react'

const HomePage = lazy(() => import('./HomePage/HomePage'))
const Chat = lazy(() => import('./Chat/Chat'))
const ChatBot = lazy(() => import('./ChatBot/ChatBot'))
const InvalidPage = lazy(() => import('./utilities/InvalidPage'))
const About = lazy(() => import('./About/About'))
const ContactUs = lazy(() => import('./ContactUs/ContactUs'))

import { Toaster } from 'sonner'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import GoToTop from './utilities/GoToTop'
import { useAppSelector } from './states/store'

type ScrollContextProps = {
  scrolled: boolean
}

export const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

const router = createBrowserRouter([{
      path: '/',
      element: <HomePage />,
      errorElement: <InvalidPage />
    }, {
      path: '/chatbot',
      element: <ChatBot />
    }, {
      path: '/chat',
      element: <Chat />,
      errorElement: <InvalidPage />
    }, {
      path: '/contact-us',
      element: <ContactUs />
    }, {
      path: '/about',
      element: <About />
    }
  ], {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true
    }
  }
)

export default function App() {
  const theme = useAppSelector(state => state.theme.theme)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', '')
    }
  }, [theme])

  const handleScroll = () => {
    const scrollThreshold = window.innerHeight * 0.15; // 15% of viewport height
    if (window.scrollY > scrollThreshold) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  window.onscroll = handleScroll
  const scrollValue: ScrollContextProps = {
    scrolled: scrolled
  }
  return (
    <ScrollContext.Provider value={scrollValue}>
      <RouterProvider router={router} />
      <GoToTop />
      <Toaster position='top-center' richColors closeButton duration={6000} />
    </ScrollContext.Provider>
  )
}