import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock, User, Tag, TrendingUp } from "lucide-react";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black py-8 px-4 md:px-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/?section=blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <div className="mb-6">
            <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Exit Planning
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              How to Plan an Exit Without Breaking the Business
            </h1>
            <div className="flex items-center text-gray-400 text-sm space-x-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Paras Abrol, CPA
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />8 min read
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                March 5, 2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <Image
              src="/coin.jpg"
              alt="Business succession planning"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              priority
            />

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <TrendingUp className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    Exit Planning Success
                  </h3>
                  <p className="text-green-200">
                    70% of family businesses fail during succession. Don&apos;t
                    let yours become a statistic—plan your exit strategically.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <strong>
                Your exit strategy isn&apos;t just about leaving—it&apos;s about
                preserving everything you&apos;ve built.
              </strong>{" "}
              After helping dozens of Melbourne family businesses transition
              successfully, I&apos;ve learned that the best exits are planned
              years in advance, not months.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              The Hidden Costs of Poor Exit Planning
            </h2>

            <p className="mb-6">
              When business owners fail to plan their exit properly, the
              consequences are devastating:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Tax disasters:</strong> CGT bills that consume 30-47% of
                sale proceeds
              </li>
              <li>
                <em>Operational chaos:</em> Key person dependency that destroys
                value
              </li>
              <li>
                <u>Family feuds:</u> Succession disputes that tear families
                apart
              </li>
              <li>Fire sale valuations due to rushed timelines</li>
            </ul>

            <blockquote className="border-l-4 border-green-500 pl-6 mb-6 italic text-gray-300">
              &ldquo;We thought we could sort out the succession in six months.
              Three years later, we&apos;re still untangling the mess—and the
              business has lost half its value.&rdquo; — Transport Company Owner
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              The Strategic Exit Planning Framework
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">
              Phase 1: Foundation Setting (5-7 Years Before Exit)
            </h3>

            <p className="mb-4">
              <strong>Optimize Your Structure</strong>
            </p>

            <p className="mb-6">
              The time to restructure is <em>well before</em> you plan to exit.
              Last-minute changes trigger anti-avoidance provisions and destroy
              CGT concessions.
            </p>

            <p className="mb-4">
              <u>Key structural considerations:</u>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Small Business CGT Concessions:</strong> Ensure you
                qualify for up to $15M in tax-free gains
              </li>
              <li>Asset segregation between operating and investment assets</li>
              <li>Trust arrangements for succession flexibility</li>
              <li>Holding company structures for ongoing wealth management</li>
            </ul>

            <p className="mb-6">
              <em>Case Study:</em> A second-generation clinic owner restructured
              5 years before his planned exit. Result:{" "}
              <strong>$2.3M CGT saving</strong> through proper small business
              concession planning.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">
              Phase 2: Value Creation (3-5 Years Before Exit)
            </h3>

            <p className="mb-6">
              <strong>Reduce Key Person Dependency</strong>
            </p>

            <p className="mb-6">
              Most family businesses suffer from{" "}
              <u>founder dependency syndrome</u>. The business relies so heavily
              on the owner that it becomes unsaleable.
            </p>

            <p className="mb-4">
              <strong>Dependency reduction strategies:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Document all processes and procedures</li>
              <li>Build a strong management team</li>
              <li>Diversify customer relationships</li>
              <li>Create systems-dependent operations</li>
              <li>Develop multiple revenue streams</li>
            </ul>

            <p className="mb-6">
              <strong>Financial Performance Optimization</strong>
            </p>

            <p className="mb-6">
              Buyers pay for <em>sustainable, growing cash flows</em>. Now is
              the time to:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Clean up your financial statements</li>
              <li>Maximize EBITDA through expense optimization</li>
              <li>Demonstrate consistent growth trends</li>
              <li>Build recurring revenue streams</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">
              Phase 3: Preparation (1-2 Years Before Exit)
            </h3>

            <p className="mb-6">
              <strong>Get Your Business Investment-Ready</strong>
            </p>

            <p className="mb-4">
              <u>Due diligence preparation includes:</u>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Financial audits:</strong> Clean, audited financials for
                3+ years
              </li>
              <li>Legal compliance review and rectification</li>
              <li>IP protection and documentation</li>
              <li>Employee agreement updates</li>
              <li>Customer contract renewals</li>
            </ul>

            <p className="mb-6">
              <strong>Valuation and Market Testing</strong>
            </p>

            <p className="mb-6">
              Get a professional valuation to understand your business worth and
              identify <em>value enhancement opportunities</em>.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">
              Phase 4: Execution (Exit Year)
            </h3>

            <p className="mb-6">
              <strong>Sale Process Management</strong>
            </p>

            <p className="mb-6">
              A well-managed sale process typically takes 6-12 months and
              involves:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Information memorandum preparation</li>
              <li>Buyer identification and qualification</li>
              <li>Negotiation and due diligence management</li>
              <li>Legal documentation and completion</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Tax-Effective Exit Strategies
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              Small Business CGT Concessions
            </h3>

            <p className="mb-6">
              These concessions can <strong>save millions in tax</strong>, but
              they&apos;re complex and strictly applied:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>15-year exemption:</strong> Complete CGT exemption for
                assets held 15+ years
              </li>
              <li>
                <strong>50% active asset reduction:</strong> Plus general 50%
                discount
              </li>
              <li>
                <strong>$500,000 retirement exemption:</strong> Tax-free up to
                $500k per individual
              </li>
              <li>
                <strong>Rollover relief:</strong> Defer CGT when reinvesting in
                other businesses
              </li>
            </ul>

            <blockquote className="border-l-4 border-blue-500 pl-6 mb-6 italic text-gray-300">
              &ldquo;Understanding these concessions saved our family business
              $4.2M in CGT when we sold to a competitor. The planning took three
              years, but it was worth every month.&rdquo; — Manufacturing
              Business Owner
            </blockquote>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              Succession vs. Sale Considerations
            </h3>

            <p className="mb-6">
              <strong>Family Succession Benefits:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Potential CGT rollover relief</li>
              <li>Maintain family control and legacy</li>
              <li>Phased transition opportunities</li>
              <li>Ongoing income streams</li>
            </ul>

            <p className="mb-6">
              <strong>Third-Party Sale Benefits:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Market value realization</li>
              <li>Clean exit with no ongoing obligations</li>
              <li>Immediate liquidity</li>
              <li>Risk transfer to buyer</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Common Exit Planning Mistakes
            </h2>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              1. Starting Too Late
            </h3>

            <p className="mb-6">
              <u>Most owners start planning 12-18 months before exit.</u> This
              isn&apos;t enough time to optimize structure, build value, or
              qualify for tax concessions.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              2. Overvaluing the Business
            </h3>

            <p className="mb-6">
              Owners typically overvalue their business by{" "}
              <strong>30-50%</strong>. Get professional valuations and be
              realistic about market conditions.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              3. Ignoring Family Dynamics
            </h3>

            <p className="mb-6">
              <em>Succession disputes destroy value.</em> Address family
              expectations and capabilities honestly and early.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              4. Poor Financial Records
            </h3>

            <p className="mb-6">
              Buyers need <u>clean, audited financials</u>. If your books are
              messy, fix them before going to market.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Your Exit Planning Checklist
            </h2>

            <p className="mb-4">
              <strong>5+ Years Before Exit:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Structure review and optimization</li>
              <li>Family succession discussions</li>
              <li>Key person dependency assessment</li>
              <li>Initial valuation and value enhancement plan</li>
            </ul>

            <p className="mb-4">
              <strong>3-5 Years Before Exit:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Management team development</li>
              <li>Process documentation and systemization</li>
              <li>Financial performance optimization</li>
              <li>Customer base diversification</li>
            </ul>

            <p className="mb-4">
              <strong>1-2 Years Before Exit:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Due diligence preparation</li>
              <li>Professional valuation update</li>
              <li>Tax planning finalization</li>
              <li>Sale process preparation</li>
            </ul>

            <p className="mb-4">
              <strong>Exit Year:</strong>
            </p>

            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Market the business professionally</li>
              <li>Manage buyer due diligence</li>
              <li>Negotiate optimal terms</li>
              <li>Execute sale and transition</li>
            </ul>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">
                Planning Your Exit Strategy?
              </h3>
              <p className="text-gray-300 mb-4">
                Don&apos;t leave your life&apos;s work to chance. Get expert
                exit planning advice from Melbourne&apos;s family business
                specialists.
              </p>
              <Link
                href="/?section=contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Your Exit Planning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
