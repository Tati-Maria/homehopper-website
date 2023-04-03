import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import Navbar from './components/nav/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import './globals.css'
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import { getCurrentUser } from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';


export const metadata = {
  title: 'Homehopper',
  description: 'Discover your next home away from home with Homehopper. Our web application connects travelers with unique and affordable accommodations around the world. Book your stay today and start exploring!',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
      className={'font-satoshi'}
      >
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <main className='min-h-screen pb-20 pt-28'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
