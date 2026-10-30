import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const ClerkProviderWrapper = ({ children }) => {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkKey) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          showOptionalFields: false,
        },
        variables: {
          colorPrimary: "#dc2626",
          colorBackground: "#ffffff",
          colorText: "#1f2937",
        },
      }}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
