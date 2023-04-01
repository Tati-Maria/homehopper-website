import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import './globals.css'
import {Poppins} from "next/font/google"

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
