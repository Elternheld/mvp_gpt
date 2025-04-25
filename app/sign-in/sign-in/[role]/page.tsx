import { SignIn } from "@clerk/nextjs";

export default function RoleBasedSignInPage({ params }: { params: { role: string } }) {
  const { role } = params;

  return (
    <div>
      <h1>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
      <SignIn />
    </div>
  );
}