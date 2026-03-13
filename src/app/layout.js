import Link from 'next/link';
import { 
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import './globals.css'
import GenresNav from '@/components/GenresNav';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header className="w-full h-auto flex flex-col">

              <div className="flex gap-7 p-4 pt-0">
                <SignInButton />
                  <SignUpButton>
                    <button className="bg-[#5a556b] text-white font-light h-10 sm:h-6 px-2 sm:px-3 rounded-b-sm cursor-pointer"
                    >
                    Sign Up
                  </button>
                </SignUpButton>
                  <div>
                    <UserButton />
                  </div>
              </div>
          </header>
              <div className="relative gap-5 flex flex-col">          
              <GenresNav/>
              <Navbar/>
            </div>
          {children}
          <Footer/>
        </ClerkProvider>
      </body>
    </html>
  );
}
