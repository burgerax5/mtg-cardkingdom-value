import AuthFormContainer from "@/components/authform/AuthFormContainer";
import { getSets } from "@/lib/card";

export default async function Home() {
  const sets = await getSets()

  return (
    <main className="w-full p-8">
      <h1 className="text-4xl font-bold mb-3">Deck Valuer</h1>
      <AuthFormContainer />
    </main>
  );
}
