import { AuthSummary, LoginForm } from "@/components/auth-forms";

export default function LoginPage() {
  return (
    <section className="pb-20 pt-32">
      <div className="site-container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-magenta">Welcome back</p>
          <h1 className="mt-4 text-5xl font-black leading-tight tracking-normal text-ink md:text-7xl">Login to manage creator deals</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Access the right workspace for brand campaigns or creator profile management.
          </p>
          <div className="mt-8 max-w-xl">
            <AuthSummary />
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
