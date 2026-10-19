import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/layout/AuthPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in · GoWander" },
      { name: "description", content: "Log in to plan your next journey with GoWander." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return <AuthPage mode="login" />;
}
