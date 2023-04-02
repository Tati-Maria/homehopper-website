import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import {Poppins} from "next/font/google"
import './globals.css'
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import { getCurrentUser } from './actions/getCurrentUser';


export const metadata = {
  title: 'Homehopper',
  description: 'Discover your next home away from home with Homehopper. Our web application connects travelers with unique and affordable accommodations around the world. Book your stay today and start exploring!',
}

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
      className={poppins.className}
      >
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <main className='min-h-screen'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
