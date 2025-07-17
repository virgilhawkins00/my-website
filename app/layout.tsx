import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';

// Optimize font loading by specifying only the subsets and display type needed
const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap', // Use swap to prevent layout shifts
  preload: true,
  weight: ['400', '500', '600'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://omarelhedfi.vercel.app'),
  title: {
    default:
      'Omar El Hedfi | DevSecOps & Full Stack Developer | AI Integration Specialist',
template: '%s | Omar El Hedfi',
  },
description: 
  'DevSecOps Engineer & Full Stack Developer specializing in Next.js, React, CI/CD automation, and AI integration for secure and scalable web applications.',
keywords: [
  'DevSecOps Engineer',
  'Full Stack Developer',
  'Next.js Developer',
  'React Developer',
  'AI Integration',
  'CI/CD Automation',
  'Jenkins Pipelines',
  'Docker & Kubernetes',
  'Secure Web Development',
  'Software Engineer',
  'Web Applications',
  'Performance Optimization',
  'Omar El Hedfi',
],

  authors: [{ name: 'Omar El Hedfi' }],
  creator: 'Omar El Hedfi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://omarelhedfi.vercel.app',
    siteName: 'Omar El Hedfi Portfolio',
    title: 'Omar El Hedfi | DevSecOps Engineer & Full Stack Developer',
    description:
      'DevSecOps Engineer & Full Stack Developer specializing in Next.js, React, CI/CD automation, and AI integration for secure and scalable applications.',
    images: [
      {
        url: '/imgs/website.webp',
        width: 1200,
        height: 630,
        alt: 'Omar El Hedfi - DevSecOps Engineer & Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omar El Hedfi | DevSecOps Engineer & Full Stack Developer',
    description:
      'Expert in building secure CI/CD pipelines, Next.js & React applications, and integrating AI for modern, scalable solutions.',
    images: ['/imgs/website.webp'],
    creator: '@OmarElHedfi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://omarelhedfi.vercel.app',
  },
  icons: {
    icon: '/imgs/logo.webp',
    apple: '/imgs/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='dark' lang='en'>
      <head />
      <body className={`${firaCode.className} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
