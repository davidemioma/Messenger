import Image from "next/image";
import AuthForm from "./components/authform/AuthForm";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full sm:max-w-md sm:mx-auto">
        <Image
          className="object-cover mx-auto"
          src="/assets/logo.png"
          width={48}
          height={48}
          alt="logo"
        />

        <h2 className="mt-6 text-xl md:text-2xl text-gray-900 text-center font-bold tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
