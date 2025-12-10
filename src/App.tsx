import { RoutesPage } from "./route";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RoutesPage />
      <Toaster
        position="bottom-left"
        toastOptions={{ duration: 4000 }}
        richColors
      />
    </>
  );
}

export default App;
