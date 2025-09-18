import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="bg-[url('/hero-img.webp')] bg-cover bg-center bg-no-repeat text-white relative min-h-screen">
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 flex items-center justify-between px-8 py-16 min-h-[calc(100vh-100px)]">
        <div className="flex-1 max-w-2xl ml-28">
          <h1 className="font-primary text-[130px] mb-6 leading-none">
            ROASTED COFFEE
          </h1>
          <p className="text-gray-300 text-xl mb-8 w-full">
            Choose a coffee from below or create your own.
          </p>
          <Link
            href="/create"
            className="bg-accent text-white px-8 py-3 rounded-full text-lg hover:bg-accent/50 transition-colors inline-block">
            Choose your coffee
          </Link>
        </div>

        
      </div>
    </section>
  );
};
