import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: 'Korea Nomad List — 한국 디지털 노마드 도시 비교',
  description:
    '서울·부산·제주 등 한국 주요 도시의 노마드 생활 조건을 한 눈에 비교하세요. 인터넷 속도, 생활비, 카페 밀도 등 노마드 특화 지표를 제공합니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0f] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
