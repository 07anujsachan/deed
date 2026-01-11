import Header from "../components/Header";
import SideNavbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <div className='fixed top-0 left-0 right-0 z-50'>
        <Header />
      </div>

      <div className='flex flex-1 pt-16'>
        {/* Sidebar (desktop) */}
        <div className='hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 z-40'>
          <SideNavbar />
        </div>

        {/* Main Content */}
        <main className='flex-1 pt-6 bg-gray-50 overflow-y-auto md:ml-[160px] pb-16'>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 z-50'>
        <SideNavbar />
      </div>

      {/* Footer */}
      <div className='block mb-16 md:mb-0'>
        <Footer />
      </div>
    </div>
  );
}
