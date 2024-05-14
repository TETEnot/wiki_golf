// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Cormorant_Garamond } from 'next/font/google'
import { Prata } from 'next/font/google'
import './styles.css'

const cormorant_garamond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-cormorant_garamond',
})
const prata = Prata({
  subsets: ['latin'],
  display: 'swap',
  weight: '400', 
  variable: '--font-prata',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cormorant_garamond.variable + ' ' + prata.variable}>
        {children}
      </body>
    </html>
  )
}