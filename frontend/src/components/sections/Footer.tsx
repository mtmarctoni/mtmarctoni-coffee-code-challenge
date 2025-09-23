import { BeansScatter } from "@/components/ui/BeansScatter";
import { Logo } from "@/components/icons";

export const Footer = () => {
  return (
    <footer className="relative bg-bg text-text overflow-hidden">
      {/* background scatter of beans */}
      <BeansScatter count={25} size={200} seed={50} y0={50} className="md:hidden hidden 2xl:block"/>
      <BeansScatter count={15} size={200} seed={50} y0={50} className="md:block hidden 2xl:hidden"/>
      <BeansScatter count={10} size={200} seed={50} y0={50} className="md:hidden"/>
      <div className="relative max-w-6xl max-h-80 mx-auto my-30 text-center">
        <Logo className="w-64 md:w-96 h-12 mx-auto mb-6" />
      </div>
      <BeansScatter count={20} size={200} seed={150} y0={15} className="z-10 md:hidden hidden 2xl:block"/>
      <BeansScatter count={10} size={200} seed={150} y0={15} className="z-10 md:block hidden 2xl:hidden" />
      <BeansScatter count={5} size={200} seed={150} y0={15} className="z-10 md:hidden" />
    </footer>
  );
};
