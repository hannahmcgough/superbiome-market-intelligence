"use client";

import { useMemo, useState } from "react";

type Product = {
  rank: number; brand: string; product: string; platform: "Amazon" | "TikTok Shop" | "Cross-platform";
  price: number; listPrice?: number; size: number; ppo: number; asin?: string; bsr?: number; subrank?: number;
  velocity: string; signal: string; tier: "Value" | "Sweet spot" | "Premium"; url: string; confidence: "High" | "Medium";
};

const products: Product[] = [
  {rank:1,brand:"Prequel",product:"Gleanser",platform:"TikTok Shop",price:22,size:13.5,ppo:1.63,velocity:"56.5K sold",signal:"Category breakout: face + body, 50% glycerin",tier:"Sweet spot",url:"https://shop.tiktok.com/us/k/gleanser-prequel",confidence:"High"},
  {rank:2,brand:"CeraVe",product:"Hydrating Facial Cleanser",platform:"Amazon",price:14.37,listPrice:18.99,size:16,ppo:.90,asin:"B01MSSDEPK",bsr:50,subrank:2,velocity:"70K+ / month",signal:"Mass anchor; 24% discount; ceramide authority",tier:"Value",url:"https://www.amazon.com/dp/B01MSSDEPK",confidence:"High"},
  {rank:3,brand:"Vanicream",product:"Gentle Facial Cleanser",platform:"Amazon",price:9.97,listPrice:12.55,size:8,ppo:1.25,asin:"B00QY1XZ4W",bsr:38,subrank:3,velocity:"70K+ / month",signal:"Sensitive-skin trust; 21% discount",tier:"Value",url:"https://www.amazon.com/dp/B00QY1XZ4W",confidence:"High"},
  {rank:4,brand:"La Roche-Posay",product:"Toleriane Hydrating Gentle Cleanser",platform:"Amazon",price:19.97,size:13.52,ppo:1.48,asin:"B01N7T7JKJ",bsr:87,subrank:6,velocity:"70K+ / month",signal:"Derm credibility + ceramide/niacinamide",tier:"Value",url:"https://www.amazon.com/dp/B01N7T7JKJ",confidence:"High"},
  {rank:5,brand:"BYOMA",product:"Creamy Jelly Cleanser",platform:"Cross-platform",price:11.49,size:5.91,ppo:1.94,velocity:"25 sold (visible listing)",signal:"Tri-ceramide + bright visual codes; TikTok-native",tier:"Sweet spot",url:"https://shop.tiktok.com/us/pdp/creamy-jelly-cleanser-byoma-for-hydration-skin-barrier-repair/1731151872467439664",confidence:"Medium"},
  {rank:6,brand:"Naturium",product:"Niacinamide Cleansing Gelée 3%",platform:"TikTok Shop",price:17.90,listPrice:21,size:7.1,ppo:2.52,velocity:"326 sold",signal:"15% promo; active-led, non-stripping proposition",tier:"Sweet spot",url:"https://shop.tiktok.com/us/pdp/niacinamide-cleansing-gelee-3-by-naturium-for-soft-smooth-skin/1729776876934828438",confidence:"High"},
  {rank:7,brand:"KraveBeauty",product:"Matcha Hemp Hydrating Cleanser",platform:"Amazon",price:16,size:4.05,ppo:3.95,asin:"B0BZ9KMY3S",bsr:7562,subrank:135,velocity:"Amazon rank visible",signal:"K-beauty sensoriality; non-stripping",tier:"Premium",url:"https://www.amazon.com/dp/B0BZ9KMY3S",confidence:"High"},
  {rank:8,brand:"BeautyStat",product:"Universal Microbiome Barrier Balancing Cleanser",platform:"TikTok Shop",price:13,listPrice:26,size:4,ppo:3.25,velocity:"24.8K shop sold; 148 reviews",signal:"Direct microbiome language; 50% retail markdown",tier:"Premium",url:"https://shop.tiktok.com/us/pdp/cleanser-beautystat-universal-microbiome-barrier-150ml-hydrates-protects/1729414753674367088",confidence:"High"},
  {rank:9,brand:"Aveeno",product:"Calm + Restore Nourishing Oat Cleanser",platform:"Cross-platform",price:11.99,size:7.8,ppo:1.54,velocity:"Editorial + marketplace visibility",signal:"Oat/comfort cue; sensitive-skin mass value",tier:"Sweet spot",url:"https://www.ulta.com/p/calm-restore-nourishing-oat-facial-cleanser-pimprod2017040",confidence:"Medium"},
  {rank:10,brand:"ROUND LAB",product:"1025 Dokdo Cleanser",platform:"Amazon",price:11.39,listPrice:15,size:5.07,ppo:2.25,velocity:"1,761 Amazon ratings",signal:"Low-pH K-beauty; 24% observed discount",tier:"Sweet spot",url:"https://www.amazon.com/s?k=ROUND+LAB+1025+Dokdo+Cleanser+150ml",confidence:"Medium"},
  {rank:11,brand:"Skinfix",product:"Barrier+ Ceramide + Ectoin Gentle Gel",platform:"Cross-platform",price:30,size:6,ppo:5,velocity:"Current barrier-community chatter",signal:"Clinical-premium; ectoin + ceramide",tier:"Premium",url:"https://skinfix.com/products/barrier-ectoin-ceramide-gentle-gel-cleanser",confidence:"Medium"},
  {rank:12,brand:"ETUDE",product:"SoonJung pH 6.5 Whip Cleanser",platform:"Amazon",price:13,size:5.06,ppo:2.57,velocity:"Current deal/search visibility",signal:"Low-pH foam for sensitive skin",tier:"Sweet spot",url:"https://www.amazon.com/s?k=ETUDE+SoonJung+pH+6.5+Whip+Cleanser",confidence:"Medium"},
  {rank:13,brand:"Cetaphil",product:"Gentle Skin Cleanser",platform:"Amazon",price:14.47,size:20,ppo:.72,velocity:"Mass evergreen",signal:"Lowest unit-cost anchor; sensitive-skin trust",tier:"Value",url:"https://www.amazon.com/s?k=Cetaphil+Gentle+Skin+Cleanser+20+oz",confidence:"Medium"},
  {rank:14,brand:"The Ordinary",product:"Glycolipid Cream Cleanser",platform:"Cross-platform",price:12.50,size:5,ppo:2.50,velocity:"Strong brand/search visibility",signal:"Cream texture + minimalist clinical value",tier:"Sweet spot",url:"https://theordinary.com/en-us/glycolipid-cream-face-cleanser-100615.html",confidence:"Medium"},
  {rank:15,brand:"Eucerin",product:"Hydrating Cleansing Gel",platform:"Amazon",price:10.99,size:6.8,ppo:1.62,velocity:"Derm/mass search visibility",signal:"Hyaluronic-acid hydration at value pricing",tier:"Sweet spot",url:"https://www.amazon.com/s?k=Eucerin+Hydrating+Cleansing+Gel",confidence:"Medium"},
];

const signals = [
  ["Viral leader", "Prequel Gleanser", "56.5K TikTok Shop units visible — far ahead of the observed challenger set."],
  ["Price disruption", "BeautyStat", "50% sale compresses a $6.50/oz list position to $3.25/oz; useful for trial, risky for premium reference price."],
  ["New-SKU watch", "Skinfix soft-foam clay", "Brand comparison imagery marks a Balancing Soft-Foam Clay Cleanser as new: barrier is expanding beyond dry/sensitive."],
  ["Format shift", "High-glycerin + face/body", "Gleanser proves that radical value-per-ounce and a named formulation story can coexist."],
];

export default function Home() {
  const [query,setQuery]=useState(""); const [platform,setPlatform]=useState("All"); const [sort,setSort]=useState("rank");
  const rows=useMemo(()=>products.filter(p=>(platform==="All"||p.platform.includes(platform))&&(p.brand+" "+p.product).toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==="ppo"?a.ppo-b.ppo:sort==="bsr"?(a.bsr??999999)-(b.bsr??999999):a.rank-b.rank),[query,platform,sort]);
  return <main>
    <header className="hero"><nav><span className="mark">○</span><b>superbiome</b><span className="date">BASELINE · JUL 14, 2026</span></nav><div className="heroGrid"><div><p className="eyebrow">WEEKLY MARKET INTELLIGENCE</p><h1>Barrier repair has become<br/>the price of entry.</h1><p className="dek">The opportunity is no longer to say “gentle.” It is to make a more ownable promise at the category’s proven unit economics.</p></div><div className="heroMetric"><span>Observed sweet spot</span><strong>$1.50–$2.60</strong><small>per fluid ounce · central cluster</small></div></div></header>

    <section className="metrics">
      <div><span>15</span><p>priority SKUs</p></div><div><span>$2.25</span><p>median / fl oz</p></div><div><span>4</span><p>live Amazon BSRs captured</p></div><div><span>56.5K</span><p>Gleanser TikTok units</p></div>
    </section>

    <section className="section narrative"><div><p className="eyebrow">THE CATEGORY READ</p><h2>Mass trust owns velocity.<br/>TikTok owns the new language.</h2></div><div className="readout"><p><b>CeraVe, Vanicream and La Roche-Posay</b> sit inside Amazon’s top 100 Beauty & Personal Care products on the observed pages. Their advantage is not novelty; it is low unit cost, enormous review proof and the absence of drama.</p><p><b>Prequel is the strategic outlier.</b> It turns a technical formulation fact—50% glycerin—into an ownable name, sells a generous face/body pack at $1.63/oz, and shows 56.5K TikTok Shop units sold.</p><p><b>Implication for Superbiome:</b> Larry’s cleanser should not enter as another ceramide-safe wash. The white space is “fewer products, better biology” with a concrete formulation reason to believe and an opening price near the $18–$24 corridor.</p></div></section>

    <section className="section chartSection"><div className="sectionHead"><div><p className="eyebrow">PRICE ARCHITECTURE</p><h2>Unit price, not ticket price, reveals the field.</h2></div><div className="legend"><i className="value"/>Value <i className="sweet"/>Sweet spot <i className="premium"/>Premium</div></div>
      <div className="chart">{[...products].sort((a,b)=>a.ppo-b.ppo).map(p=><div className="barRow" key={p.brand}><span>{p.brand}</span><div className="track"><div className={`bar ${p.tier.replace(" ","").toLowerCase()}`} style={{width:`${p.ppo/5*100}%`}}/><em style={{left:`${Math.min(92,p.ppo/5*100)}%`}}>${p.ppo.toFixed(2)}</em></div></div>)}</div>
      <div className="chartNote"><b>Sweet spot:</b> median $2.25/oz; the middle 50% concentrates around $1.50–$2.60/oz. Premium formulations must visibly earn the step-up above $3/oz.</div>
    </section>

    <section className="section"><div className="sectionHead"><div><p className="eyebrow">COMPETITIVE SET</p><h2>Baseline product table</h2></div><a className="download" href="/data/baseline-2026-07-14.csv" download>Download CSV ↓</a></div>
      <div className="controls"><input aria-label="Search products" placeholder="Search brand or SKU" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter platform" value={platform} onChange={e=>setPlatform(e.target.value)}><option>All</option><option>Amazon</option><option>TikTok Shop</option></select><select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="rank">Sort: trend score</option><option value="ppo">Sort: price / oz</option><option value="bsr">Sort: Amazon BSR</option></select></div>
      <div className="tableWrap"><table><thead><tr><th>#</th><th>Brand / SKU</th><th>Platform</th><th>Price</th><th>Size</th><th>$/oz</th><th>Amazon BSR</th><th>Velocity signal</th></tr></thead><tbody>{rows.map(p=><tr key={p.rank}><td>{p.rank}</td><td><a href={p.url} target="_blank" rel="noreferrer"><b>{p.brand}</b><small>{p.product}</small></a></td><td><span className="pill">{p.platform}</span></td><td>${p.price.toFixed(2)}{p.listPrice&&<small className="strike">${p.listPrice.toFixed(2)} list</small>}</td><td>{p.size} oz</td><td><b>${p.ppo.toFixed(2)}</b></td><td>{p.bsr?<><b>#{p.bsr.toLocaleString()}</b><small>Beauty · #{p.subrank} Face Wash</small></>:<span className="na">Not exposed</span>}</td><td><small>{p.velocity}</small><span className={`confidence ${p.confidence.toLowerCase()}`}>{p.confidence}</span></td></tr>)}</tbody></table></div>
    </section>

    <section className="section signalSection"><p className="eyebrow">MOVEMENT WATCH</p><h2>What deserves attention now</h2><div className="signalGrid">{signals.map((s,i)=><article key={s[0]}><span>0{i+1}</span><p className="eyebrow">{s[0]}</p><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div></section>

    <section className="section actions"><div><p className="eyebrow">SUPERBIOME ACTIONS</p><h2>Three moves toward the<br/>1,000-customer engine.</h2></div><ol><li><b>Price the entry cleanser for legibility.</b><span>Model $18–$24, but protect a $1.50–$2.60/oz story through pack size. A tiny premium tube will read like the category, not category creation.</span></li><li><b>Name the biological mechanism.</b><span>“Microbiome-friendly” is already generic. Build the proposition around the specific thing the formula preserves, removes less of, or helps maintain—subject to substantiation.</span></li><li><b>Use TikTok for proof, not fear.</b><span>Lead with post-cleanse feel, simplification and visible routine relief. Science earns the claim underneath; “your cleanser is destroying you” spends trust.</span></li></ol></section>

    <footer><div><b>Methodology</b><p>Composite trend set based on live Amazon BSR/velocity where exposed, TikTok Shop sold/review signals, current marketplace visibility, and 2026 editorial/community momentum. Prices are observed or current retailer prices and may vary by seller/location. “Not exposed” means the accessible live page did not provide a defensible BSR. No BSR was inferred. First run establishes the time-series baseline.</p></div><div><b>Next refresh</b><p>Tuesday, July 21, 2026 · 9:00 AM ET<br/>Weekly comparisons begin after observation two.</p></div></footer>
  </main>;
}
