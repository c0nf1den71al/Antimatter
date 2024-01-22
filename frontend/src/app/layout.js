import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/providers/auth-provider';
import { DataProvider } from '@/providers/data-hook';


import './globals.css'

export const metadata = {
  title: 'Antimatter',
  description: 'Report writing and vulnerability management platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <AuthProvider>
          <DataProvider>
            {children}
            <Toaster />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
