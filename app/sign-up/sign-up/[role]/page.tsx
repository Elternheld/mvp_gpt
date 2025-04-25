import { SignUp } from "@clerk/nextjs";

export default function RoleBasedSignUpPage({ params }: { params: { role: string } }) {
  const { role } = params;

  return (
    <div>
      <h1>Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
      <SignUp />
    </div>
  );
}