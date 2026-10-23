import { Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileSection() {
  return (
    <section className="surface space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 shrink-0">
          <AvatarFallback className="bg-primary-soft text-lg font-semibold text-primary">
            AR
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Aarav Rathore</h2>
          <p className="text-sm text-muted-foreground">GoWander traveler</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="profile-first-name">First name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="profile-first-name" defaultValue="Aarav" className="pl-9" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-last-name">Last name</Label>
          <Input id="profile-last-name" defaultValue="Rathore" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="profile-email"
              type="email"
              defaultValue="aarav@tripbuddy.ai"
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-phone">Phone number</Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="profile-phone" type="tel" defaultValue="+91 98765 43210" className="pl-9" />
          </div>
        </div>
      </div>

      <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
    </section>
  );
}
