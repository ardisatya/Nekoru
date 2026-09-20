import { Prototype } from "./prototype";

export default function PrototypePage() {
  if (process.env.NEKORU_ENABLE_PROTOTYPE !== "true")
    return (
      <main>
        <h1>Prototype tidak aktif</h1>
        <p>
          Set <code>NEKORU_ENABLE_PROTOTYPE=true</code> hanya pada environment
          local/internal.
        </p>
      </main>
    );
  return <Prototype />;
}
