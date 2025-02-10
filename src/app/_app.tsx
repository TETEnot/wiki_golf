import '../styles/globals.css';
import { Roboto } from 'next/font/google';
import type { AppProps } from 'next/app';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // 必要なフォントウェイトを指定
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
} 