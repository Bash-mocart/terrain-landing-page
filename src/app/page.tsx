import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/home/Journey";
import { Protection } from "@/components/home/Protection";
import { Closing } from "@/components/home/Closing";
import { Footer } from "@/components/Footer";

// One buyer's journey, then why it's safe, who's on Terrain, and the close.
//
//   Hero (live map)   Own. Build. Grow. + waitlist
//   Journey           five chapters, finds -> hers      #how-it-works
//   Protection        built to protect you from fraud, with the real
//                     verified companies as proof        #protection #companies
//   Closing           sell on Terrain + be first in + waitlist  #for-companies #waitlist
export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <Journey />
        <Protection />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
