import Footer from "@/components/Footer";
import React from "react";
import Link from "next/link";
import { FaSmile, FaTools, FaHeadset, FaSms } from "react-icons/fa";

const navClass =
  "w-full flex items-center justify-center px-6 py-4 bg-primary shadow-md sticky top-0 z-10";
const logoClass =
  "text-xl font-bold text-primary-foreground tracking-tight flex items-center gap-2";

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Main */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-background">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            Your ABN direct to your inbox in just{" "}
            <span className="text-primary">15 minutes</span>
          </h1>
          <p className="flex items-center justify-center gap-2 text-lg md:text-xl text-secondary-foreground mb-8">
           
            Features instant business name search and registration
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-2xl justify-center">
            <Link href="/abn/individual" className="flex-1">
              <button className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg shadow transition-all text-lg">
                I am an Individual
              </button>
            </Link>
            <Link href="/abn/partnership" className="flex-1">
              <button className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg shadow transition-all text-lg">
                We are a Partnership
              </button>
            </Link>
            <Link href="/abn/company" className="flex-1">
              <button className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg shadow transition-all text-lg">
                I represent a Company
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6 w-full max-w-5xl">
            <div className="flex flex-col items-center text-center">
              <FaSmile className="text-4xl text-primary mb-2" />
              <div className="font-bold text-primary">Stress Free</div>
              <div className="text-muted-foreground text-sm">
                Just fill in our form and
                <br />
                we&apos;ll handle the rest
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaTools className="text-4xl text-primary mb-2" />
              <div className="font-bold text-primary">Troubleshooting</div>
              <div className="text-muted-foreground text-sm">
                Our team resolves ABN
                <br />
                application issues
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaHeadset className="text-4xl text-primary mb-2" />
              <div className="font-bold text-primary">Customer Service</div>
              <div className="text-muted-foreground text-sm">
                Immediate email and
                <br />
                phone access to our team
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaSms className="text-4xl text-primary mb-2" />
              <div className="font-bold text-primary">SMS Alerts</div>
              <div className="text-muted-foreground text-sm">
                Instantly receive vital
                <br />
                updates to your phone
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default page;
