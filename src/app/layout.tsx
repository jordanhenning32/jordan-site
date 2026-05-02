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
  "Jordan Henning — Federal Services Delivery Executive. 17 years federal IT at SSA, culminating as Branch Chief over 170 nationwide Hearings Offices serving 7,000+ employees at 99.9% uptime, with a $200M+ portfolio — now layered with two production multi-agent AI systems built hands-on. The leader federal contractors hire when AI capability and federal delivery discipline have to live in the same person.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jordanhenning.com"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: metaDescription,
  keywords: [
    "Jordan Henning",
    "Federal Services Delivery Executive",
    "Federal IT Leadership",
    "Federal AI Services",
    "FAC-P/PM",
    "GSA MAS Schedule",
    "STARS III",
    "8(a) SDVOSB HUBZone",
    "FedRAMP",
    "ATO governance",
    "ITIL service delivery",
    "Multi-Agent AI Systems",
    "RFP Factory",
    "Public Trust clearance",
    "Branch Chief SSA",
    "VP Federal Services",
    "Director Federal Programs",
    "Quadratic Digital",
    "Bronze Star",
    "Purple Heart",
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
    "Bronze Star",
    "Purple Heart",
    "SSA Commissioner Award (2021)",
  ],
  knowsAbout: [
    "Federal services delivery",
    "Multi-agent AI systems",
    "ITIL governance",
    "FedRAMP and ATO compliance",
    "GSA MAS Schedule, STARS III, 8(a)/SDVOSB/HUBZone procurement vehicles",
    "PA Invitation-to-Qualify (ITQ) procurement",
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
