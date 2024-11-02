import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Signup() {
  return (
    <div className="w-full container mx-auto py-5 px-3 flex justify-center items-center h-[90vh]">
      <div className="max-w-[500px] w-full">
        <Card>
          <CardHeader>
            <CardTitle>Sign in required!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              In order to access the appliaction you need to sign in, please use
              the below signin button.
            </p>
          </CardContent>
          <CardFooter>
            <SignInButton text="Sign in with GitHub" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
