import Image from "next/image";
import Logo from "../../public/logo.svg"
import HomeSearch from "@/components/homesearch/HomeSearch";

export default async function Home() {
  return (
    <main className="w-full p-8 flex flex-col items-center justify-center gap-3 flex-1 mb-60">
      <div className="flex flex-row sm:flex-col items-center justify-center gap-3">
        <Image src={Logo} alt="logo" width={80} className="max-w-[50px]" />
        <h1 className="text-4xl font-bold mb-3 hidden sm:block">Card Appraiser</h1>
      </div>
      <HomeSearch />
    </main>
  );
}
