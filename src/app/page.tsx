import AuthFormContainer from "@/components/authform/AuthFormContainer";

export default async function Home() {
  return (
    <main className="w-full p-8">
      <h1 className="text-4xl font-bold mb-3">Deck Valuer</h1>
      <AuthFormContainer />
    </main>
  );
}
