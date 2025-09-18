import { BeansScatter } from "./BeansScatter";

export const Footer = () => {
  return (
    <footer className="relative bg-bg text-text overflow-hidden">
      {/* background scatter of beans */}
      <BeansScatter />

      <div className="relative z-10 max-w-6xl max-h-80 mx-auto my-40 text-center">
        <h1 className="text-6xl font-bold">MVST Coffee</h1>
      </div>
    </footer>
  );
};
