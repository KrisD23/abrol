"use client";

// import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
// import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "tax-optimization-strategies-2025",
    title: "Tax Optimization Strategies for 2025",
    excerpt:
      "Maximize your tax efficiency with proven strategies for individuals and businesses. Learn about deductions, credits, and planning opportunities.",
    content: `
      <h2>Introduction</h2>
      <br>
      <p>As we navigate through 2025, tax optimization remains a critical component of effective financial planning. With evolving tax laws and regulations, it's essential to stay informed about the latest strategies that can help minimize your tax burden while maximizing your financial growth.</p>
      <br>
      <h2>Key Tax Strategies for Individuals</h2>
      <br>
      <h3>1. Maximize Superannuation Contributions</h3>
      <p>Taking advantage of superannuation concessional and non-concessional contribution caps can significantly reduce your taxable income. For 2025, the concessional contribution cap is $27,500, while the non-concessional cap is $110,000.</p>
      <br>
      <h3>2. Income Splitting with Family Members</h3>
      <p>Consider legitimate income splitting opportunities through family trusts, spousal superannuation contributions, and investment structures that can distribute income to family members in lower tax brackets.</p>
      <br>
      <h3>3. Capital Gains Tax Planning</h3>
      <p>Timing the realization of capital gains and losses can help optimize your tax position. Consider the 50% CGT discount for assets held longer than 12 months and explore opportunities for tax-loss harvesting.</p>
      <br>
      <strong><h2>Business Tax Optimization</h2></strong>
      <br>
      <h3>-Small Business CGT Concessions</h3>
      <p>Eligible small businesses can access valuable CGT concessions, including the 15-year exemption, 50% active asset reduction, retirement exemption, and rollover relief.</p>
      <br>
      <h3>-Depreciation and Asset Write-offs</h3>
      <p>Take advantage of instant asset write-offs and accelerated depreciation for eligible business assets. The temporary full expensing measures provide significant opportunities for businesses to reduce their tax liabilities.</p>
      <br>
      <strong><h2>Investment Structure Considerations</h2></strong>
      <p>The choice of investment structure can have significant tax implications. Consider the benefits of:</p>
      <br>
      <ul>
        <li>Family discretionary trusts for income distribution flexibility</li>
        <li>Companies for asset protection and tax planning</li>
        <li>Self-managed super funds for retirement savings</li>
      </ul>
      <br>
      <strong><h2>Conclusion</h2></strong>
      <p>Effective tax optimization requires careful planning and professional advice. Our experienced team can help you develop a comprehensive tax strategy tailored to your specific circumstances and goals.</p>
    `,
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Tax Planning",
    author: "Kiran Abrol",
    image: "/img1.jpg",
  },
  {
    slug: "trust-structures-protecting-wealth",
    title: "Trust Structures: Protecting Your Wealth",
    excerpt:
      "Discover how family discretionary trusts and unit trusts can protect your assets while providing tax advantages and succession planning benefits.",
    content: `
      <h2>Understanding Trust Structures</h2>
      <br>
      <p>Trust structures have long been a cornerstone of effective wealth protection and tax planning strategies in Australia. They offer unique advantages in terms of asset protection, tax efficiency, and succession planning that make them invaluable tools for families and businesses alike.</p>
      <br>
      <h2>Family Discretionary Trusts</h2>
      <br>
      <h3>Key Benefits</h3>
      <p>Family discretionary trusts provide trustees with the flexibility to distribute income and capital to beneficiaries in the most tax-effective manner. This flexibility allows for:</p>
      <br>
      <ul>
        <li>Income splitting among family members</li>
        <li>Tax minimization through strategic distributions</li>
        <li>Asset protection from creditors and legal claims</li>
        <li>Succession planning for future generations</li>
      </ul>
      <br>
      <h3>Distribution Strategies</h3>
      <p>The trustee's discretionary power enables income to be distributed to beneficiaries in lower tax brackets, potentially reducing the overall family tax burden. This is particularly effective when beneficiaries have unused tax-free thresholds or lower marginal tax rates.</p>
      <br>
      <h2>Unit Trusts</h2>
      <br>
      <h3>Fixed Entitlements</h3>
      <p>Unlike discretionary trusts, unit trusts provide fixed entitlements to income and capital based on the number of units held. This structure is particularly suitable for:</p>
      <br>
      <ul>
        <li>Joint ventures and business partnerships</li>
        <li>Investment holding structures</li>
        <li>Situations requiring certainty of distributions</li>
      </ul>
      <br>
      <h2>Asset Protection Benefits</h2>
      <br>
      <p>One of the most significant advantages of trust structures is their ability to protect assets from:</p>
      <br>
      <ul>
        <li>Business creditors and litigation</li>
        <li>Personal guarantees and liabilities</li>
        <li>Relationship property settlements</li>
        <li>Professional indemnity claims</li>
      </ul>
      <br>
      <h2>Succession Planning</h2>
      <br>
      <p>Trusts provide an excellent vehicle for succession planning, allowing wealth to be transferred across generations in a tax-effective manner while maintaining family control over assets.</p>
      <br>
      <h2>Important Considerations</h2>
      <br>
      <p>While trusts offer significant benefits, they also come with ongoing compliance obligations and potential tax implications that must be carefully managed. Professional advice is essential to ensure your trust structure remains effective and compliant.</p>
    `,
    date: "March 10, 2025",
    readTime: "7 min read",
    category: "Asset Protection",
    author: "Kiran Abrol",
    image: "/img2.jpg",
  },
  {
    slug: "business-structure-comparison",
    title: "Business Structure: Company vs Trust vs Partnership",
    excerpt:
      "Compare different business structures and their tax implications. Find the optimal setup for your business goals and risk profile.",
    content: `
      <h2>Choosing the Right Business Structure</h2>
      <br>
      <p>Selecting the appropriate business structure is one of the most important decisions you'll make when starting or restructuring a business. Each structure offers different advantages and disadvantages in terms of tax treatment, liability protection, and operational flexibility.</p>
      <br>
      <h2>Company Structure</h2>
      <br>
      <h3>Tax Benefits</h3>
      <p>Companies are taxed at a flat rate of 25% for eligible small businesses (turnover under $50 million) or 30% for larger companies. Key advantages include:</p>
      <br>
      <ul>
        <li>Predictable tax rates regardless of owner's personal income</li>
        <li>Ability to retain profits within the company</li>
        <li>Access to franking credits for shareholders</li>
        <li>Small business CGT concessions</li>
      </ul>
      <br>
      <h3>Asset Protection</h3>
      <p>Companies provide excellent liability protection, with shareholders' liability generally limited to their shareholding. This separation of personal and business assets is crucial for high-risk businesses.</p>
      <br>
      <h2>Trust Structure</h2>
      <br>
      <h3>Distribution Flexibility</h3>
      <p>Trading trusts can distribute income to beneficiaries in lower tax brackets, potentially reducing the overall tax burden. However, they're subject to specific rules around business income distributions.</p>
      <br>
      <h3>Considerations</h3>
      <ul>
        <li>No limited liability protection for trustees</li>
        <li>Potential trust loss restrictions</li>
        <li>Complexity in ongoing administration</li>
      </ul>
      <br>
      <h2>Partnership Structure</h2>
      <br>
      <h3>Tax Flow-Through</h3>
      <p>Partnerships don't pay tax at the entity level. Instead, income flows through to partners who are taxed at their individual rates. This can be advantageous when partners are in lower tax brackets.</p>
      <br>
      <h3>Simplicity vs Risk</h3>
      <p>While partnerships are relatively simple to establish and operate, partners face unlimited liability for partnership debts and obligations.</p>
      <br>
      <h2>Hybrid Structures</h2>
      <br>
      <p>Many businesses benefit from hybrid structures that combine different entities:</p>
      <br>
      <ul>
        <li>Corporate trustee structures</li>
        <li>Unit trust and company combinations</li>
        <li>Partnership and trust arrangements</li>
      </ul>
      <br>
      <h2>Making the Right Choice</h2>
      <br>
      <p>The optimal business structure depends on various factors including:</p>
      <br>
      <ul>
        <li>Nature and risk profile of the business</li>
        <li>Desired level of asset protection</li>
        <li>Tax planning objectives</li>
        <li>Succession planning requirements</li>
        <li>Compliance and administrative preferences</li>
      </ul>
      <br>
      <h2>Conclusion</h2>
      <br>
      <p>Choosing the right business structure requires careful consideration of your specific circumstances and long-term objectives. Our experienced team can help you evaluate the options and implement the most suitable structure for your business needs.</p>
    `,
    date: "March 5, 2025",
    readTime: "6 min read",
    category: "Business Structure",
    author: "Kiran Abrol",
    image: "/coin.jpg",
  },
  {
    slug: "smsf-compliance-investment-strategies",
    title: "SMSF Compliance and Investment Strategies",
    excerpt:
      "Navigate SMSF regulations and discover investment strategies that maximize returns while maintaining compliance with ATO requirements.",
    content: `
      <h2>Self-Managed Super Fund Fundamentals</h2>
      <br>
      <p>Self-Managed Super Funds (SMSFs) offer unparalleled control over your retirement savings, but with this control comes significant responsibility. Understanding compliance requirements and developing effective investment strategies is crucial for SMSF success.</p>
      <br>
      <h2>Key Compliance Requirements</h2>
      <br>
      <h3>Sole Purpose Test</h3>
      <p>The fundamental requirement is that your SMSF must be maintained for the sole purpose of providing retirement benefits to members. All investment decisions and fund activities must align with this primary objective.</p>
      <br>
      <h3>Investment Restrictions</h3>
      <p>SMSFs must comply with specific investment restrictions:</p>
      <br>
      <ul>
        <li>No loans except limited recourse borrowing arrangements</li>
        <li>No investments in collectibles (with limited exceptions)</li>
        <li>5% limit on investments in related entities</li>
        <li>No direct real estate acquisition from related parties</li>
      </ul>
      <br>
      <h2>Investment Strategies</h2>
      <br>
      <h3>Diversification Principles</h3>
      <p>A well-diversified SMSF portfolio typically includes:</p>
      <br>
      <ul>
        <li>Australian and international shares</li>
        <li>Fixed income securities and cash</li>
        <li>Commercial and residential property</li>
        <li>Alternative investments where appropriate</li>
      </ul>
      <br>
      <h3>Direct Property Investment</h3>
      <p>Many SMSF trustees are attracted to direct property investment for its potential benefits:</p>
      <br>
      <ul>
        <li>Direct control over investment decisions</li>
        <li>Potential for capital growth and rental income</li>
        <li>Tangible asset ownership</li>
        <li>Tax advantages in pension phase</li>
      </ul>
      <br>
      <h2>Limited Recourse Borrowing</h2>
      <br>
      <p>SMSFs can borrow to invest in assets through Limited Recourse Borrowing Arrangements (LRBAs), subject to strict conditions:</p>
      <br>
      <ul>
        <li>Single acquirable asset rule</li>
        <li>Holding trust arrangements</li>
        <li>Limited recourse provisions</li>
        <li>Arm's length terms</li>
      </ul>
      <br>
      <h2>Tax Benefits and Considerations</h2>
      <br>
      <h3>Accumulation Phase</h3>
      <p>During accumulation phase, SMSF investment earnings are taxed at 15%, with potential for reduced rates on capital gains from assets held longer than 12 months.</p>
      <br>
      <h3>Pension Phase</h3>
      <p>Assets supporting pension payments are generally exempt from tax, making the pension phase particularly attractive for investment returns.</p>
      <br>
      <h2>Annual Compliance Obligations</h2>
      <br>
      <p>SMSF trustees must meet various annual obligations:</p>
      <br>
      <ul>
        <li>Annual financial statements and audit</li>
        <li>SMSF annual return lodgment</li>
        <li>Investment strategy review</li>
        <li>Member benefit statements</li>
        <li>Regulatory compliance documentation</li>
      </ul>
      <br>
      <h2>Professional Support</h2>
      <br>
      <p>Given the complexity of SMSF compliance and the significant penalties for breaches, professional support is essential for successful SMSF management. Our team provides comprehensive SMSF services to help you maximize your retirement savings while maintaining full compliance.</p>
    `,
    date: "February 28, 2025",
    readTime: "4 min read",
    category: "Superannuation",
    author: "Kiran Abrol",
    image: "/img4.jpg",
  },
  {
    slug: "financial-planning-high-net-worth",
    title: "Financial Planning for High Net Worth Individuals",
    excerpt:
      "Comprehensive wealth management strategies including estate planning, tax minimization, and asset protection for affluent families.",
    content: `
      <h2>Wealth Management for Affluent Families</h2>
      <br>
      <p>High net worth individuals face unique financial challenges and opportunities. Effective wealth management requires sophisticated strategies that address tax optimization, asset protection, succession planning, and wealth preservation across generations.</p>
      <br>
      <h2>Comprehensive Financial Assessment</h2>
      <br>
      <h3>Wealth Analysis</h3>
      <p>The foundation of effective wealth management begins with a thorough analysis of your financial position, including:</p>
      <br>
      <ul>
        <li>Asset valuation and classification</li>
        <li>Income source diversification</li>
        <li>Risk profile assessment</li>
        <li>Liquidity requirements analysis</li>
        <li>Tax efficiency evaluation</li>
      </ul>
      <br>
      <h2>Advanced Tax Strategies</h2>
      <br>
      <h3>Income Tax Optimization</h3>
      <p>High net worth individuals can benefit from sophisticated tax planning strategies:</p>
      <br>
      <ul>
        <li>Income splitting through trust structures</li>
        <li>Superannuation optimization strategies</li>
        <li>Capital gains tax deferral and minimization</li>
        <li>International tax planning considerations</li>
      </ul>
      <br>
      <h3>Estate Tax Planning</h3>
      <p>While Australia doesn't have inheritance tax, effective estate planning ensures smooth wealth transfer while minimizing tax implications for beneficiaries.</p>
      <br>
      <h2>Asset Protection Strategies</h2>
      <br>
      <h3>Structure Optimization</h3>
      <p>Protecting wealth from potential creditors, litigation, and relationship breakdowns requires careful consideration of ownership structures:</p>
      <br>
      <ul>
        <li>Discretionary family trusts</li>
        <li>Corporate structures for business assets</li>
        <li>International structures where appropriate</li>
        <li>Insurance strategies for risk mitigation</li>
      </ul>
      <br>
      <h2>Investment Portfolio Management</h2>
      <br>
      <h3>Diversification Strategies</h3>
      <p>High net worth portfolios benefit from sophisticated diversification across:</p>
      <br>
      <ul>
        <li>Asset classes and geographical regions</li>
        <li>Investment time horizons</li>
        <li>Currency exposures</li>
        <li>Alternative investment opportunities</li>
      </ul>
      <br>
      <h3>Direct Investment Opportunities</h3>
      <p>Wealthy families often have access to unique investment opportunities including private equity, hedge funds, and direct business investments that require specialized knowledge and due diligence.</p>
      <br>
      <h2>Succession Planning</h2>
      <br>
      <h3>Next Generation Preparation</h3>
      <p>Successful wealth transfer involves more than just legal structures. It requires:</p>
      <br>
      <ul>
        <li>Family governance frameworks</li>
        <li>Financial education for beneficiaries</li>
        <li>Gradual responsibility transition</li>
        <li>Values and vision alignment</li>
      </ul>
      <br>
      <h2>Philanthropic Strategies</h2>
      <br>
      <p>Many high net worth families incorporate philanthropy into their wealth management strategy through:</p>
      <br>
      <ul>
        <li>Private ancillary funds</li>
        <li>Charitable remainder trusts</li>
        <li>Direct giving strategies</li>
        <li>Social impact investments</li>
      </ul>
      <br>
      <h2>International Considerations</h2>
      <br>
      <p>For families with international interests, additional considerations include:</p>
      <br>
      <ul>
        <li>Cross-border tax compliance</li>
        <li>Foreign asset reporting obligations</li>
        <li>Double taxation treaty benefits</li>
        <li>Residence and domicile planning</li>
      </ul>
      <br>
      <h2>Ongoing Review and Adaptation</h2>
      <br>
      <p>Wealth management is not a set-and-forget strategy. Regular reviews ensure your plan adapts to changing circumstances, evolving tax laws, and family dynamics.</p>
      <br>
      <h2>Professional Coordination</h2>
      <br>
      <p>High net worth families benefit from a coordinated team of professionals including accountants, lawyers, investment advisors, and estate planners working together to optimize outcomes.</p>
    `,
    date: "February 20, 2025",
    readTime: "8 min read",
    category: "Financial Planning",
    author: "Kiran Abrol",
    image: "/img1.jpg",
  },
  {
    slug: "gst-bas-obligations-simplified",
    title: "GST and BAS Obligations Made Simple",
    excerpt:
      "Understanding your GST obligations, BAS reporting requirements, and how to maintain compliance while optimizing cash flow.",
    content: `
      <h2>Understanding GST Fundamentals</h2>
      <br>
      <p>Goods and Services Tax (GST) is a broad-based tax of 10% on most goods, services, and other items sold or consumed in Australia. Understanding your GST obligations is crucial for business compliance and cash flow management.</p>
      <br>
      <h2>GST Registration Requirements</h2>
      <br>
      <h3>Mandatory Registration</h3>
      <p>You must register for GST if:</p>
      <br>
      <ul>
        <li>Your business turnover is $75,000 or more ($150,000 for non-profit organizations)</li>
        <li>You provide taxi or ride-sourcing services regardless of turnover</li>
        <li>You want to claim GST credits on business purchases</li>
      </ul>
      <br>
      <h3>Voluntary Registration</h3>
      <p>Even if not required, voluntary GST registration can be beneficial if you make significant business purchases that include GST, as you can claim GST credits.</p>
      <br>
      <h2>BAS Reporting Obligations</h2>
      <br>
      <h3>Reporting Frequencies</h3>
      <p>Business Activity Statements (BAS) must be lodged:</p>
      <br>
      <ul>
        <li>Monthly: For businesses with GST turnover above $20 million</li>
        <li>Quarterly: Most businesses report quarterly</li>
        <li>Annually: Available for some smaller businesses</li>
      </ul>
      <br>
      <h3>Key BAS Components</h3>
      <p>Your BAS includes reporting for:</p>
      <br>
      <ul>
        <li>GST collected on sales</li>
        <li>GST paid on purchases (credits)</li>
        <li>PAYG withholding (if applicable)</li>
        <li>PAYG installments</li>
        <li>Other taxes and levies</li>
      </ul>
      <br>
      <h2>GST Credits and Input Tax Credits</h2>
      <br>
      <h3>Claiming Credits</h3>
      <p>You can claim GST credits for:</p>
      <br>
      <ul>
        <li>Business purchases that include GST</li>
        <li>Goods imported for business use</li>
        <li>Business expenses including GST</li>
      </ul>
      <br>
      <h3>Documentation Requirements</h3>
      <p>To claim GST credits, you need:</p>
      <br>
      <ul>
        <li>Tax invoices for purchases over $82.50</li>
        <li>Receipts or invoices showing GST amount</li>
        <li>Evidence the purchase was for business purposes</li>
      </ul>
      <br>
      <h2>Cash Flow Management</h2>
      <br>
      <h3>GST Collection Strategy</h3>
      <p>Effective GST management involves:</p>
      <br>
      <ul>
        <li>Separate GST collection accounts</li>
        <li>Regular reconciliation processes</li>
        <li>Understanding payment timing requirements</li>
        <li>Optimizing cash flow through strategic timing</li>
      </ul>
      <br>
      <h2>Common GST Mistakes</h2>
      <br>
      <h3>Record Keeping Errors</h3>
      <p>Avoid these common mistakes:</p>
      <br>
      <ul>
        <li>Inadequate supporting documentation</li>
        <li>Mixing personal and business expenses</li>
        <li>Incorrect GST treatment of different supplies</li>
        <li>Failing to account for GST-free or input-taxed sales</li>
      </ul>
      <br>
      <h2>Special GST Situations</h2>
      <br>
      <h3>GST-Free Supplies</h3>
      <p>Some supplies are GST-free, including:</p>
      <br>
      <ul>
        <li>Most basic food items</li>
        <li>Exports</li>
        <li>Medical services</li>
        <li>Educational courses</li>
      </ul>
      <br>
      <h3>Input-Taxed Supplies</h3>
      <p>Input-taxed supplies include:</p>
      <br>
      <ul>
        <li>Financial services</li>
        <li>Residential rent</li>
        <li>Sale of residential premises (in some cases)</li>
      </ul>
      <br>
      <h2>Technology and Automation</h2>
      <br>
      <h3>Digital Solutions</h3>
      <p>Modern accounting software can help with:</p>
      <br>
      <ul>
        <li>Automated GST calculations</li>
        <li>BAS preparation and lodgment</li>
        <li>Real-time GST liability tracking</li>
        <li>Integration with ATO systems</li>
      </ul>
      <br>
      <h2>Penalty Prevention</h2>
      <br>
      <p>Avoid GST penalties by:</p>
      <br>
      <ul>
        <li>Meeting all lodgment deadlines</li>
        <li>Maintaining accurate records</li>
        <li>Making payments on time</li>
        <li>Seeking professional advice when uncertain</li>
      </ul>
      <br>
      <h2>Professional Support</h2>
      <br>
      <p>GST compliance can be complex, particularly for businesses with diverse revenue streams or international transactions. Professional support ensures accuracy and helps optimize your GST position while maintaining full compliance with ATO requirements.</p>
    `,
    date: "February 15, 2025",
    readTime: "6 min read",
    category: "Tax Planning",
    author: "Kiran Abrol",
    image: "/img2.jpg",
  },
];

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: BlogPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <Link
              href="/?section=blog"
              className="text-white hover:text-gray-200"
            >
              Return to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/?section=blog"
              className="inline-flex items-center text-white hover:text-gray-200 mb-8 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>

            <div className="mb-6">
              <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center text-gray-400 space-x-6">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none"
        >
          <div
            className="blog-content text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: "1.8",
              fontSize: "1.125rem",
            }}
          />
        </motion.article>

        {/* Back to Blog CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gray-800 text-center"
        >
          <Link
            href="/?section=blog"
            className="inline-flex items-center bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Read More Articles
          </Link>
        </motion.div>
      </div>

      <Footer />

      <style jsx>{`
        .blog-content {
          max-width: none;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", sans-serif;
        }

        .blog-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #ffffff;
          line-height: 1.3;
          border-bottom: 2px solid #181818;
          padding-bottom: 0.75rem;
          letter-spacing: -0.025em;
        }

        .blog-content h2:first-of-type {
          margin-top: 1rem;
        }

        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #e5e7eb;
          line-height: 1.4;
          letter-spacing: -0.015em;
        }

        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #d1d5db;
          line-height: 1.4;
        }

        .blog-content p {
          margin-bottom: 1.75rem;
          color: #d1d5db;
          text-align: justify;
          text-justify: inter-word;
          line-height: 1.8;
          font-size: 1.1rem;
          max-width: 75ch;
        }

        .blog-content ul {
          margin: 1.5rem 0 2rem 0;
          padding-left: 0;
          list-style: none;
        }

        .blog-content ol {
          margin: 1.5rem 0 2rem 0;
          padding-left: 0;
          list-style: none;
          counter-reset: item;
        }

        .blog-content ul li {
          position: relative;
          margin-bottom: 0.875rem;
          color: #d1d5db;
          text-align: justify;
          text-justify: inter-word;
          line-height: 1.7;
          padding-left: 1.5rem;
          font-size: 1.05rem;
        }

        .blog-content ul li::before {
          content: "•";
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          font-weight: 900;
          font-size: 1.2rem;
        }

        .blog-content ol li {
          position: relative;
          margin-bottom: 0.875rem;
          color: #d1d5db;
          text-align: justify;
          text-justify: inter-word;
          line-height: 1.7;
          padding-left: 2rem;
          font-size: 1.05rem;
          counter-increment: item;
        }

        .blog-content ol li::before {
          content: counter(item) ".";
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .blog-content blockquote {
          border-left: 4px solid #ffffff;
          padding: 1.5rem 2rem;
          margin: 2.5rem 0;
          font-style: italic;
          color: #e5e7eb;
          background: #181818;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .blog-content strong {
          color: #ffffff;
          font-weight: 700;
        }

        .blog-content em {
          color: #e5e7eb;
          font-style: italic;
        }

        .blog-content code {
          background: #181818;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
          color: #ffffff;
          border: 1px solid #333;
        }

        .blog-content pre {
          background: #181818;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid #333;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 1rem;
        }

        .blog-content th,
        .blog-content td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #333;
        }

        .blog-content th {
          background: #181818;
          color: #ffffff;
          font-weight: 600;
        }

        .blog-content td {
          color: #d1d5db;
        }

        .blog-content a {
          color: #ffffff;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s ease;
        }

        .blog-content a:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
