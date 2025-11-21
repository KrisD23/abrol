import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Clock, User, Tag } from "lucide-react";

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
            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Family Business
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              5 Structuring Mistakes to Avoid in Family Businesses
            </h1>
            <div className="flex items-center text-gray-400 text-sm space-x-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Paras Abrol, CPA
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />6 min read
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                March 15, 2025
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
              src="/img1.jpg"
              alt="Family business meeting"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              priority
            />

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <strong>
                Family businesses face unique structural challenges
              </strong>{" "}
              that can cost generations if not addressed properly. After two
              decades of helping Melbourne&apos;s family enterprises, I&apos;ve
              seen the same costly mistakes repeated time and again.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              The High Cost of Poor Structure
            </h2>

            <p className="mb-6">
              When family businesses get their structure wrong, the consequences
              ripple through generations.{" "}
              <em>
                Tax inefficiencies, asset exposure, and succession nightmares
              </em>{" "}
              are just the beginning. Here are the five most dangerous mistakes
              I see—and how to avoid them.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              1. Operating Without Asset Protection
            </h3>

            <blockquote className="border-l-4 border-blue-500 pl-6 mb-6 italic text-gray-300">
              &ldquo;We thought our family business was safe—until a customer
              sued us and our family home was at risk.&rdquo;
            </blockquote>

            <p className="mb-6">
              <strong>The Mistake:</strong> Many family businesses operate as
              sole traders or simple partnerships, leaving personal assets
              exposed to business risks.
            </p>

            <p className="mb-6">
              <strong>The Solution:</strong> Implement proper corporate
              structures with family discretionary trusts. This creates a{" "}
              <u>legal firewall</u> between business operations and family
              wealth.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              2. Ignoring Tax Optimization Opportunities
            </h3>

            <p className="mb-4">
              <strong>Common scenarios we see:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Business profits taxed at individual marginal rates (up to 47%)
              </li>
              <li>
                Missing small business CGT concessions worth{" "}
                <strong>hundreds of thousands</strong>
              </li>
              <li>No income splitting strategies between family members</li>
              <li>Inefficient dividend distribution policies</li>
            </ul>

            <p className="mb-6">
              <em>Case Study:</em> We recently restructured a transport
              family&apos;s operations, moving from a partnership to a
              company/trust structure.{" "}
              <strong>Result: $120,000 annual tax savings</strong> and full
              asset protection.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              3. Failing to Plan for Succession
            </h3>

            <p className="mb-6">
              The second generation often inherits a <u>structural mess</u>{" "}
              rather than a strategic advantage. Without proper succession
              planning:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Family disputes over control and ownership</li>
              <li>Massive CGT events on transfer</li>
              <li>Loss of small business concessions</li>
              <li>Operational disruption during transition</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              4. Mixing Personal and Business Assets
            </h3>

            <p className="mb-6">
              <strong>Red flags we often see:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Family home owned by the trading company</li>
              <li>Business equipment in personal names</li>
              <li>Informal &ldquo;loans&rdquo; between entities</li>
              <li>No clear separation of investment vs. trading activities</li>
            </ul>

            <p className="mb-6">
              This creates <em>unnecessary risks</em> and limits your strategic
              options. Each asset should have a purpose and proper home.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              5. Inadequate Documentation and Governance
            </h3>

            <p className="mb-6">
              Family businesses often operate on <u>handshake agreements</u> and
              assumptions. This works until it doesn&apos;t.
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-6 mb-6 italic text-gray-300">
              &ldquo;Dad always said I&apos;d inherit the business, but when he
              passed, we discovered the structure didn&apos;t reflect his
              intentions.&rdquo;
            </blockquote>

            <p className="mb-6">Proper documentation includes:</p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Trust deeds</strong> that reflect current intentions
              </li>
              <li>Shareholder agreements for family companies</li>
              <li>Clear succession timelines and triggers</li>
              <li>Regular structure reviews (at least every 3 years)</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              The Cost of Inaction
            </h2>

            <p className="mb-6">
              Every year you delay proper structuring, you&apos;re likely:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Paying <strong>tens of thousands</strong> in unnecessary tax
              </li>
              <li>Exposing family wealth to business risks</li>
              <li>Missing wealth creation opportunities</li>
              <li>Making future restructuring more expensive</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Your Next Steps
            </h2>

            <p className="mb-6">
              <strong>
                Don&apos;t let these mistakes cost your family&apos;s future.
              </strong>{" "}
              A proper structure review typically pays for itself within the
              first year through tax savings alone.
            </p>

            <p className="mb-8">
              At Abrol Associates, we specialize in{" "}
              <u>family business structures</u> that protect, optimize, and
              prepare for the future. We&apos;ve helped hundreds of Melbourne
              families avoid these costly mistakes.
            </p>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">
                Ready to Review Your Structure?
              </h3>
              <p className="text-gray-300 mb-4">
                Get a comprehensive structure review from Melbourne&apos;s
                family business specialists.
              </p>
              <Link
                href="/?section=contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Book Your Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
