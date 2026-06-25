import { AuthSummary, RegisterForm } from "@/components/auth-forms";
import { SectionHeader } from "@/components/ui";

export default function RegisterPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container">
        <SectionHeader
          align="center"
          eyebrow="Register"
          title="Join InfluenceHub"
          copy="Create a brand account to unlock contacts or build a creator profile to get discovered."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <RegisterForm />
          <aside className="grid gap-4 lg:sticky lg:top-24">
            <AuthSummary role="brand" />
            <AuthSummary role="influencer" />
          </aside>
        </div>
      </div>
    </section>
  );
}
