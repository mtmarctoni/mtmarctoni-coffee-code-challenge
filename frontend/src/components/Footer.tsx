import { BeansScatter } from "./BeansScatter";
import { Logo } from "./icons";

export const Footer = () => {
  return (
    <footer className="relative bg-bg text-text overflow-hidden">
      {/* background scatter of beans */}
      <BeansScatter />

      <div className="relative z-10 max-w-6xl max-h-80 mx-auto my-40 text-center">
        <Logo className="w-64 md:w-96 h-12 mx-auto mb-6" />
      </div>
    </footer>
  );
};
