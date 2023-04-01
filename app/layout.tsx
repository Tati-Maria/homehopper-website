import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import {Poppins} from "next/font/google"
import './globals.css'
import ToasterProvider from './providers/ToasterProvider';


export const metadata = {
  title: 'Homehopper',
  description: 'Discover your next home away from home with Homehopper. Our web application connects travelers with unique and affordable accommodations around the world. Book your stay today and start exploring!',
}

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
      className={poppins.className}
      >
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <main className='min-h-screen'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
