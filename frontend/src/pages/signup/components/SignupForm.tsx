import { UserPlus, Mail, Lock, User, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useSignup } from "../../../lib/queries";
import type { SignupType } from "../../../types/types";
export default function SignupForm() {
  const { mutate: signup, isPending } = useSignup();
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: SignupType = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    signup(data, {
      onSuccess: () => {
        e.currentTarget.reset();
      },
    });
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Full name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300"
        >
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="email"
            type="email"
            name="email"
            required
            className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500
									 focus:border-emerald-500 sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300"
        >
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="password"
            type="password"
            name="password"
            required
            className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-300"
        >
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
            className=" block w-full px-3 py-2 pl-10 bg-gray-700 border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            Loading...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
            Sign up
          </>
        )}
      </button>
    </form>
  );
}
