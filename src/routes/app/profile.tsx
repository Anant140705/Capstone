import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ProfileSection } from "@/components/layout/ProfileSection";
import { PageHeader } from "@/components/travel/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Profile · GoWander" },
      {
        name: "description",
        content: "View and manage your GoWander profile details.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Your profile"
        description="View and manage your personal details."
        actions={
          <Button asChild variant="outline">
            <Link to="/app/settings">
              <ArrowLeft className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        }
      />

      <ProfileSection />
    </div>
  );
}
