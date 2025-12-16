import { SignupForm } from "@/components/signup-form";
export default function SignupPage() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />

      <div className="z-10 relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-5xl">
          {" "}
          {/* hoặc max-w-6xl */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
