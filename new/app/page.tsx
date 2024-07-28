import Image from "next/image";
import Hero from "../components/Hero";



export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-8">
      <Hero />
    </main>
  );
}
