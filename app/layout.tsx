import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geist=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata: Metadata={metadataBase:new URL("https://superbiome.hannahmcgough.com"),title:"Superbiome | Barrier + Microbiome Market Intelligence",description:"Weekly Amazon and TikTok Shop intelligence across cleanse, treat, and hydrate.",icons:{icon:"/favicon.svg"},openGraph:{title:"Barrier + Microbiome Market Intelligence",description:"Cleanse · Treat · Hydrate | Weekly category intelligence by HM Studio",images:["/og.png"]},twitter:{card:"summary_large_image",title:"Barrier + Microbiome Market Intelligence",description:"Cleanse · Treat · Hydrate | Weekly category intelligence by HM Studio",images:["/og.png"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>}
