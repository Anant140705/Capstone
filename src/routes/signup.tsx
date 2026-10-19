import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/layout/AuthPage";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up · GoWander" },
      { name: "description", content: "Create a GoWander account and start planning India trips." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return <AuthPage mode="signup" />;
}
