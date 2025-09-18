import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="bg-[url('/hero-img.webp')] bg-cover bg-center bg-no-repeat text-white relative md:min-h-screen">
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 flex flex-col md:items-start items-center justify-center px-8 py-16 min-h-[calc(100vh-100px)]">
        <div className="max-w-2xl px-25 md:px-0 md:ml-50 text-center md:text-left">
          <h1 className="font-primary text-[64px] md:text-[130px] mb-6 leading-none">
            ROASTED COFFEE
          </h1>
          <p className="text-gray-300 text-xl mb-8 w-ful">
            Choose a coffee from below or create your own.
          </p>
          <Link
            href="/create"
            className="bg-accent text-white px-6 py-3 rounded-full text-sm hover:bg-accent/50 transition-colors inline-flex items-center whitespace-nowrap">
            Choose your own coffee
          </Link>
        </div>

        
      </div>
    </section>
  );
};
