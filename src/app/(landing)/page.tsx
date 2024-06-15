import { Hero } from "./_components/hero";
import { Header } from "./_components/header";
import { Features } from "./_components/features";
import { Highlights } from "./_components/highlights";
import { BentoGridFeatures } from "./_components/bento-grid-features";

export default function Home() {
    return (
        <main className="w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <section className="max-w-6xl mx-auto">
                <Header />
                <Hero />
                <Features />
                <BentoGridFeatures />
                <Highlights />
            </section>
        </main>
    )
}