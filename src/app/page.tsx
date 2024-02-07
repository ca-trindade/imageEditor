
import ServerUploadPage from "./server/page";
import ClientUploadPage from "./client/page"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ServerUploadPage />
      <ClientUploadPage />
    </main>
  );
}
