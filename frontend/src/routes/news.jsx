import { createFileRoute } from "@tanstack/react-router";
import { App } from "antd";
import { PageHero } from "@/components/PageHero.jsx";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import roomBath from "@/assets/room-bath.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Better Luxury Hotel" },
      { name: "description", content: "Latest news from Better — refurbishments, events and stories from our hotel." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { message } = App.useApp();
  const posts = [
    { img: gallery1, title: "Restore Lighting Design in The Hotel" },
    { img: gallery2, title: "Grand Reopening of the Rooftop Pool" },
    { img: roomBath, title: "New Marble Bath Collection Launched" },
  ];
  return (
    <>
      <PageHero
        title="Latest News"
        crumb="News"
        image="/images/jpeg/room-4.jpeg"
      />
      <section className="py-16">
        <div className="mx-auto max-w-[1300px] px-6 grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <article key={i} className="group">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              </div>
              <div className="p-6 border border-t-0 border-border">
                <div className="text-xs text-muted-foreground tracking-widest">By Admin • Jan 12, 2024</div>
                <h3 className="mt-3 font-serif text-xl">{p.title}</h3>
                <button
                  onClick={() => message.info("News article details coming soon!")}
                  className="mt-4 text-xs uppercase tracking-widest text-gold font-bold hover:underline transition-all cursor-pointer"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
