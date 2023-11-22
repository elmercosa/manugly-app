import LoginForm from "@/components/auth/login-form";

export default function Page() {
  return (
    <main className="flex">
      <div className="flex flex-col items-center justify-center w-3/5 h-screen">
        <LoginForm></LoginForm>
      </div>
      <div className="flex w-2/5 h-screen rounded-bl-[30%] bg-manugly items-center justify-center">
        <h1 className="text-[200px] font-bold text-white">M</h1>
      </div>
    </main>
  );
}
