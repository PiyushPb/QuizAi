import { Cover } from "@/components/ui/cover";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="h-[90vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container mx-auto px-3 py-4 w-full h-[70vh] flex justify-center items-center">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Automated quiz generation tool powered by <br />
            <Cover className="cursor-pointer">Google Gemini</Cover>
          </h1>
        </div>
      </div>
      <section className="container mx-auto px-3 py-5">
        <h2 className="text-3xl font-bold mb-5">Technology Used</h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
          <Image
            src="/nextLogo.png"
            alt="Next.js Logo"
            width={200}
            height={200}
            className="object-contain"
          />
          <Image
            src="/geminiLogo.png"
            alt="Google Gemini Logo"
            width={200}
            height={200}
            className="object-contain"
          />
          <Image
            src="https://static.cdnlogo.com/logos/t/34/tailwind-css.svg"
            alt="Tailwind CSS Logo"
            width={200}
            height={200}
            className="object-contain"
          />
          <img
            src="https://next-auth.js.org/img/logo/logo-sm.png"
            alt="NextAuth Logo"
            className="object-contain h-[50px]"
          />
          <Image
            src="https://lucide.dev/library-logos/shadcn-ui-dark.svg"
            alt="ShadCN UI Logo"
            width={200}
            height={200}
            className="object-contain"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg"
            alt="MongoDB Logo"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </section>

      <footer className="container mx-auto px-3 py-5 flex justify-center items-center">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/piyushpardeshi/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            @PiyushPardeshi
          </a>
          , Inspired by an open source project.
        </p>
      </footer>
    </>
  );
}
