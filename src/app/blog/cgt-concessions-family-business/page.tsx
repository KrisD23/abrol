import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  Clock,
  User,
  Tag,
  Shield,
  DollarSign,
} from "lucide-react";

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
            <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Tax Planning
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              CGT Concessions Every Family Business Should Know
            </h1>
            <div className="flex items-center text-gray-400 text-sm space-x-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Paras Abrol, CPA
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />9 min read
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                February 28, 2025
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
              src="/bg7.jpg"
              alt="Capital gains tax planning"
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              priority
            />

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <DollarSign className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    Massive Tax Savings
                  </h3>
                  <p className="text-green-200">
                    Small business CGT concessions can save you up to $15M in
                    tax—but only if you qualify and plan properly.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <strong>
                Capital Gains Tax can destroy a family business sale—or be
                completely eliminated with proper planning.
              </strong>{" "}
              After helping Melbourne family businesses save over $50M in CGT
              through these concessions, I can tell you they&apos;re incredibly
              powerful but strictly applied.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              The Four Small Business CGT Concessions
            </h2>

            <p className="mb-6">
              There are four small business CGT concessions that can work
              individually or together to{" "}
              <u>dramatically reduce or eliminate CGT</u>:
            </p>

            <ol className="list-decimal pl-6 mb-8 space-y-4">
              <li>
                <strong>Small Business 15-Year Exemption</strong> — Complete CGT
                exemption
              </li>
              <li>
                <strong>Small Business 50% Active Asset Reduction</strong> —
                Half your CGT liability
              </li>
              <li>
                <strong>Small Business Retirement Exemption</strong> — Up to
                $500,000 tax-free per person
              </li>
              <li>
                <strong>Small Business Rollover</strong> — Defer CGT by
                reinvesting
              </li>
            </ol>

            <blockquote className="border-l-4 border-purple-500 pl-6 mb-8 italic text-gray-300">
              &ldquo;We thought we&apos;d pay $3.2M in CGT when we sold. With
              proper concession planning, we paid zero. It was the difference
              between retirement and working another decade.&rdquo; —
              Third-Generation Retailer
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Concession #1: The 15-Year Exemption
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">
              Complete CGT Elimination
            </h3>

            <p className="mb-6">
              This is the <strong>most powerful concession</strong>—complete CGT
              exemption on business assets you&apos;ve owned for 15+ years.
            </p>

            <p className="mb-4">
              <u>Qualification requirements:</u>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>15-year ownership:</strong> You must have owned the
                asset for at least 15 years
              </li>
              <li>
                <em>Age requirement:</em> You must be 55+ at the time of sale
                (or permanently incapacitated)
              </li>
              <li>The asset must be an active business asset</li>
              <li>Your business must pass the small business tests</li>
            </ul>

            <p className="mb-6">
              <strong>Planning tip:</strong> If you&apos;re under 55, consider
              phased disposal strategies or keeping some assets until you reach
              the age requirement.
            </p>

            <p className="mb-6">
              <em>Case Study:</em> A 58-year-old transport business owner sold
              assets he&apos;d owned for 18 years.{" "}
              <strong>CGT saving: $2.1M</strong> through complete exemption.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Concession #2: The 50% Active Asset Reduction
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
              Stack with General 50% Discount
            </h3>

            <p className="mb-6">
              This concession provides a <u>50% reduction in capital gains</u>{" "}
              and can be combined with the general 50% CGT discount for assets
              held over 12 months.
            </p>

            <p className="mb-6">
              <strong>Combined benefit:</strong> 75% total reduction in capital
              gains (50% + 50% of remaining amount)
            </p>

            <p className="mb-4">
              <strong>Active asset requirements:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Asset must be used in your business for 50%+ of ownership period
              </li>
              <li>Goodwill and business premises automatically qualify</li>
              <li>
                Investment assets (rental properties not used in business)
                don&apos;t qualify
              </li>
              <li>Business must satisfy small business tests</li>
            </ul>

            <p className="mb-6">
              <em>Practical example:</em> $2M capital gain becomes $500K taxable
              gain after both reductions.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Concession #3: The Retirement Exemption
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-yellow-400">
              Up to $500,000 Tax-Free Per Person
            </h3>

            <p className="mb-6">
              This concession allows you to receive up to{" "}
              <strong>$500,000 per individual</strong> completely tax-free from
              eligible capital gains.
            </p>

            <p className="mb-4">
              <u>Key features:</u>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Lifetime limit:</strong> $500,000 per person (not per
                asset)
              </li>
              <li>
                <em>Age restrictions:</em> If under 55, must contribute to super
              </li>
              <li>Can be used with other concessions</li>
              <li>Husband and wife can each claim $500,000</li>
            </ul>

            <p className="mb-6">
              <strong>Strategic planning:</strong> Consider asset ownership
              structures to maximize this concession across family members.
            </p>

            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                    Super Contribution Rules
                  </h3>
                  <p className="text-yellow-200">
                    If you&apos;re under 55, retirement exemption amounts must
                    go into super. Plan carefully around contribution caps and
                    timing.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Concession #4: Small Business Rollover
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-red-400">
              Defer CGT by Reinvesting
            </h3>

            <p className="mb-6">
              This concession allows you to <u>defer CGT indefinitely</u> by
              reinvesting sale proceeds into other business assets.
            </p>

            <p className="mb-4">
              <strong>Rollover requirements:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Must reinvest proceeds within 2 years (4 years for some assets)
              </li>
              <li>Replacement asset must be active business asset</li>
              <li>
                Can be new business assets or interests in other businesses
              </li>
              <li>CGT is deferred, not eliminated</li>
            </ul>

            <p className="mb-6">
              <strong>Strategic use:</strong> Particularly valuable for staged
              business sales or portfolio transitions.
            </p>

            <p className="mb-6">
              <em>Case Study:</em> A manufacturer sold part of his business for
              $5M, used rollover relief to acquire premises for $3M, and applied
              retirement exemption to the remaining $2M.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              The Small Business Tests: Your Gateway to Concessions
            </h2>

            <p className="mb-6">
              To access these concessions, your business must satisfy{" "}
              <strong>at least one</strong> of these tests:
            </p>

            <h3 className="text-xl font-semibold mb-4 text-green-400">
              1. Net Asset Value Test
            </h3>

            <p className="mb-6">
              Net assets of you and related entities must be <u>$6M or less</u>{" "}
              just before the CGT event.
            </p>

            <p className="mb-4">
              <strong>What&apos;s included:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Assets of the business and related businesses</li>
              <li>Your personal assets and those of associates</li>
              <li>
                <em>Excluding:</em> Main residence, superannuation, personal use
                assets
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-green-400">
              2. Active Asset Test
            </h3>

            <p className="mb-6">
              The asset must be an <strong>active asset</strong> (used in the
              business) for 50%+ of your ownership period.
            </p>

            <p className="mb-4">
              <u>Active assets include:</u>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Business premises used in your business</li>
              <li>Goodwill and business licenses</li>
              <li>Trading stock and business equipment</li>
              <li>
                Shares in companies you control (if company assets are active)
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-green-400">
              3. Turnover Test (for Business Sale)
            </h3>

            <p className="mb-6">
              Annual turnover must be <strong>$2M or less</strong> in the income
              year of the CGT event.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Maximizing Concessions: Strategic Planning
            </h2>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-400">
              Concession Stacking Strategies
            </h3>

            <p className="mb-6">
              You can often apply <u>multiple concessions</u> to the same
              capital gain:
            </p>

            <p className="mb-4">
              <strong>Example combination:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Start with $4M capital gain</li>
              <li>Apply 50% active asset reduction = $2M</li>
              <li>Apply general 50% discount = $1M</li>
              <li>Apply $500K retirement exemption = $500K taxable gain</li>
              <li>
                <strong>Total tax saving:</strong> 87.5% reduction
              </li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-400">
              Ownership Structure Optimization
            </h3>

            <p className="mb-4">
              <strong>Joint ownership benefits:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                Husband and wife can each claim $500K retirement exemption
              </li>
              <li>Multiple individuals can access 15-year exemption</li>
              <li>Trust distributions can optimize concession access</li>
            </ul>

            <p className="mb-6">
              <em>Warning:</em> Last-minute ownership changes may trigger
              anti-avoidance provisions. Plan <strong>well in advance</strong>.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-purple-400">
              Timing Considerations
            </h3>

            <p className="mb-4">
              <u>Optimize timing for:</u>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Age requirements:</strong> 15-year exemption needs 55+
                age
              </li>
              <li>Income year management to stay under $2M turnover</li>
              <li>Net asset value timing</li>
              <li>Replacement asset acquisition deadlines (rollover)</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Common Mistakes That Cost Millions
            </h2>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              1. Failing the Net Asset Value Test
            </h3>

            <p className="mb-6">
              Many businesses fail this test because they don&apos;t understand
              what assets are included.{" "}
              <em>
                Personal investment properties and business investments count
              </em>{" "}
              toward the $6M limit.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              2. Passive Asset Contamination
            </h3>

            <p className="mb-6">
              If your business holds too many <u>passive assets</u> (investments
              not used in the business), you may fail the active asset test.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              3. Last-Minute Restructuring
            </h3>

            <p className="mb-6">
              The ATO scrutinizes <strong>artificial arrangements</strong>{" "}
              designed solely to access concessions. Genuine business reasons
              are essential.
            </p>

            <h3 className="text-xl font-semibold mb-4 text-red-400">
              4. Missing Rollover Deadlines
            </h3>

            <p className="mb-6">
              Rollover relief has <em>strict timeframes</em>. Miss the deadline
              and lose the concession permanently.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              CGT Concession Planning Checklist
            </h2>

            <p className="mb-4">
              <strong>Immediate Assessment:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Calculate current net asset value</li>
              <li>Identify active vs passive assets</li>
              <li>Review ownership structures</li>
              <li>Document business use of assets</li>
            </ul>

            <p className="mb-4">
              <strong>Strategic Planning:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Optimize asset ownership for concession access</li>
              <li>Plan disposal timing around age and income requirements</li>
              <li>Consider staged disposal strategies</li>
              <li>Prepare genuine business rationales for any restructuring</li>
            </ul>

            <p className="mb-4">
              <strong>Pre-Sale Preparation:</strong>
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Obtain professional tax advice specific to your situation</li>
              <li>Document concession eligibility</li>
              <li>Prepare for ATO compliance requirements</li>
              <li>Plan post-sale investment strategies</li>
            </ul>

            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    Professional Advice Essential
                  </h3>
                  <p className="text-red-200">
                    CGT concessions involve complex interactions between tax
                    law, business structure, and timing. One mistake can cost
                    millions. Get expert advice early.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
              Real-World Success Stories
            </h2>

            <h3 className="text-xl font-semibold mb-4 text-green-400">
              The $4.2M CGT Elimination
            </h3>

            <p className="mb-6">
              A Melbourne manufacturing family owned their business premises for
              22 years. At age 62, the owner sold for $8M:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Capital gain: $6M</li>
              <li>
                Applied 15-year exemption: <strong>Zero CGT</strong>
              </li>
              <li>Tax saved: $4.2M (compared to no concessions)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-green-400">
              The Strategic Concession Stack
            </h3>

            <p className="mb-6">
              A husband and wife retail team (both under 55) sold their
              business:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Total capital gain: $3M</li>
              <li>50% active asset reduction: $1.5M remaining</li>
              <li>General 50% discount: $750K remaining</li>
              <li>Combined retirement exemptions: $1M available</li>
              <li>
                <strong>Result:</strong> No CGT payable (excess went to super)
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4 text-green-400">
              The Rollover Strategy
            </h3>

            <p className="mb-6">
              A transport operator sold part of his business but wanted to stay
              active:
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Sold depot for $2M (gain: $1.5M)</li>
              <li>Used rollover to purchase new equipment</li>
              <li>CGT deferred until eventual retirement</li>
              <li>
                <strong>Benefit:</strong> Maintained cash flow while deferring
                tax
              </li>
            </ul>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">
                Ready to Maximize Your CGT Concessions?
              </h3>
              <p className="text-gray-300 mb-4">
                Don&apos;t pay unnecessary CGT. Get expert advice on accessing
                small business concessions and protecting your family&apos;s
                wealth.
              </p>
              <Link
                href="/?section=contact"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get Your CGT Strategy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
