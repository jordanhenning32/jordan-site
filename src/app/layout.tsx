import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data";
import { PostHogProvider } from "@/components/layout/PostHogProvider";
import { BackToTop } from "@/components/layout/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metaDescription =
  "Jordan Henning — AI Engineering & Delivery Leader who ships production multi-agent AI systems himself, grounded in 17 years leading federal IT delivery at SSA (Branch Chief over IT for 170 offices at 99.9% uptime; $200M+ delivered as a FAC-P/PM PM). RFP Factory compresses 40-hour federal proposals into 2 hours of review. He leads AI delivery teams and builds the AI — federal or commercial. Public Trust cleared. Combat veteran, 101st Airborne.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jordanhenning.com"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: metaDescription,
  keywords: [
    "Jordan Henning",
    "AI Engineering & Delivery Leader",
    "Head of AI",
    "AI Delivery Lead",
    "Director of AI Engineering",
    "GenAI Engineering Manager",
    "Multi-Agent AI Systems",
    "Agentic AI",
    "LLM orchestration",
    "RFP Factory",
    "Federal AI Services",
    "GovCon AI delivery",
    "Federal IT Leadership",
    "FAC-P/PM",
    "FedRAMP",
    "Public Trust clearance",
    "Branch Chief SSA",
    "Quadratic Digital",
    "101st Airborne",
    "service-disabled veteran",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description: metaDescription,
    siteName: profile.name,
    images: [{ url: "/img/executive.jpg", width: 800, height: 800, alt: `${profile.name}, executive portrait` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: metaDescription,
    images: ["/img/executive.jpg"],
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: metaDescription,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: "https://jordanhenning.com",
  image: "https://jordanhenning.com/img/executive.jpg",
  sameAs: [profile.linkedin, profile.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "York",
    addressRegion: "PA",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Quadratic Digital",
    description: "14-person federal services firm serving state, federal, and prime-subcontract clients",
  },
  alumniOf: [
    { "@type": "Organization", name: "Social Security Administration" },
    { "@type": "Organization", name: "U.S. Army · 101st Airborne Division" },
    { "@type": "CollegeOrUniversity", name: "Malone University" },
    { "@type": "CollegeOrUniversity", name: "Kent State University" },
  ],
  hasCredential: [
    "FAC-P/PM (Federal Acquisition Certification for Program & Project Managers)",
    "Public Trust High Risk Clearance (eligible to reinstate)",
    "SSA Commissioner Award (2021)",
  ],
  knowsAbout: [
    "AI delivery and engineering leadership",
    "Multi-agent AI systems",
    "Agentic AI and LLM orchestration",
    "RAG and multi-provider model routing",
    "Federal AI services delivery",
    "FedRAMP and ATO compliance",
    "GSA MAS Schedule, STARS III, 8(a)/SDVOSB/HUBZone procurement vehicles",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PostHogProvider>
          {children}
          <BackToTop />
        </PostHogProvider>
      </body>
    </html>
  );
}
