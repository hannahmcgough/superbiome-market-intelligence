import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geist=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata: Metadata={title:"Superbiome | Barrier-Repair Cleanser Intelligence",description:"Weekly Amazon and TikTok Shop category intelligence for barrier-repair cleansers.",icons:{icon:"/favicon.svg"},openGraph:{title:"Barrier Repair Market Intelligence",description:"Superbiome baseline · July 2026",images:["/og.png"]},twitter:{card:"summary_large_image",title:"Barrier Repair Market Intelligence",description:"Superbiome baseline · July 2026",images:["/og.png"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>}
