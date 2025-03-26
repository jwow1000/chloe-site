import { Libre_Baskerville, Space_Grotesk } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-space-grotesk',
});

export const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-libre-baskerville'

})