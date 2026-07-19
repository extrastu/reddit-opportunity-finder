import Masthead from "@/components/Masthead";
import StatsBar from "@/components/StatsBar";
import Feed from "@/components/Feed";
import Trends from "@/components/Trends";
import Recommendation from "@/components/Recommendation";
import Footer from "@/components/Footer";
import { opportunities } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Masthead />
      <div className="py-8">
        <StatsBar items={opportunities} />
      </div>
      <Feed items={opportunities} />
      <Trends items={opportunities} />
      <Recommendation />
      <Footer />
    </main>
  );
}
