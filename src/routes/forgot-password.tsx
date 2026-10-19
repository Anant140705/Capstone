import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/layout/AuthPage";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password · AI Trip Buddy" },
      { name: "description", content: "Reset your AI Trip Buddy account password." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return <AuthPage mode="reset" />;
}
