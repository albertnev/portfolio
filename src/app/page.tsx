import { Header } from "@/sections/Header";

const Home: React.FC = () => {
  return (
    <div className="lg:flex lg:justify-between lg:gap-5 p-4 md:p-12 lg:p-24 lg:py-0 max-w-screen-xl min-h-screen mx-auto">
      <Header className="py-24 lg:w-1/2" />
      <main className="lg:w-1/2">{/* Rest page */}</main>
    </div>
  );
};

export default Home;
