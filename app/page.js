import HomePage from "./pages/homepage/HomePage";
import MenuSettings from "./pages/menu/MenuSettings";

export default function Home() {
  return (
    <main className="flex flex-col relative">
      <HomePage />
      <MenuSettings />
    </main>
  );
}
