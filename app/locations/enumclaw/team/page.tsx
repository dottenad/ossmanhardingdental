import { Metadata } from "next";
import Link from "next/link";
import { businessConfig } from "@/lib/config";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/Hero";
import { Breadcrumb } from "@/components/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { TeamSection, TeamMember } from "@/components/TeamMemberCard";

const LOCATION = {
    name: "Enumclaw",
    slug: "enumclaw",
};

const doctors: TeamMember[] = [
    {
        name: "Dr. Madisyn Ossman",
        role: "Cosmetic Dentistry Lead & Co-Owner",
        image: "/images/enumclaw/people/madi.jpg",
        bio: `I was raised in Enumclaw, Washington most of my life and my husband and I now live in Bonney Lake. I have been lucky enough to serve this community as a dentist since 2018! My husband and I bought our Enumclaw practice from my dad (Dr. Harding) in 2020 and we have been incredibly fortunate to be able to grow the practice over the past few years with the help of our incredible team!

We are now so grateful to serve both the Enumclaw and Bonney Lake communities!

I believe in a preventative and evidence-based treatment approach, with a focus on patient education. I measure each treatment decision based on what I would recommend to my own family and I strongly believe in the ties between oral care and the overall health of each patient.

I also have a passion for esthetic dentistry and love to help patients transform their self esteem through Invisalign, Veneers, Botox, Filler and other cosmetic services. It's incredible to see the way that a person's confidence improves when they love their smile! I have completed many advanced trainings for Clear Aligners (Invisalign/SureSmile), Veneers, Botox, Filler and General Restorative Dentistry.

My husband and I love to travel, enjoy the outdoors, try new restaurants, and play with our springer-doodle pup.

I look forward to seeing you at our office soon and can promise that our incredible team will take great care of you.`,
    },
    {
        name: "Dr. Vernon Zander",
        role: "Oral Surgery Lead & Co-Owner",
        image: "/images/enumclaw/people/dr-zander.jpg",
        bio: `I am originally from Maple Valley and am a graduate of both Washington State University (Go Cougs!) and University of Washington's Dental School. I have been serving this local community with OHD since 2021. I enjoy spending time with friends and family and taking advantage of all the great hikes in the PNW. I also skied competitively in college and love having Crystal ski resort so close!

Dr. Zander has received advanced training in general dentistry with a focus on Oral Surgery at one of the top dental residencies in the nation. This additional training has allowed him to develop an expertise in Dental Implants, Wisdom Teeth Extractions, IV Sedation, and Prosthodontics.

We are very excited to now offer these services at our practice! This allows you to save time and money by staying in Enumclaw to accomplish your treatment goals. Adding a doctor will also open up appointment times to allow us to get you in even sooner when you call to schedule.`,
    },
    {
        name: "Dr. Michael Ornelas",
        role: "General Dentist",
        image: "/images/enumclaw/people/dr-ornelas.jpg",
        bio: `I grew up in Denver, Colorado and moved to Washington in 2019. I completed my training with University of Colorado School of Dental Medicine in 2014 and have been practicing dentistry ever since. I have a passion for restorative dentistry, endodontics and oral surgery. I really enjoy getting to know my patients and I look forward to serving this tight-knit community!

I currently live in Maple Valley with my fiancée, Ali, and our rescue dog, Lily. We have been together for three years and we look forward to our wedding in September of this year!

When we are not enjoying concerts together, we enjoy karaoke, trivia, and spending time with family. I've played soccer for most of my life and I am an avid Sounders fan. I also love to ski when time and weather allow. My fiancée tolerates my support for the Denver Broncos and when I'm not cooking delicious food of my own, I will always take the opportunity to enjoy a Chipotle burrito.

I am very excited to meet all of the patients at OHD and to join this incredible community in Enumclaw.`,
    },
    {
        name: "Dr. Steve Harding",
        role: "Founder & Co-Owner (Semi-Retired)",
        image: "/images/enumclaw/people/dr-harding.jpg",
        bio: `I have served our Enumclaw community as a dentist since 2001 and am now semi-retired! I love the small-town atmosphere and the ability to be part of this tight knit community. I have two beautiful daughters, Madisyn and Baylee, who I am extremely proud of!

Madisyn (Dr. Ossman) has worked with me since 2018 and I transitioned the practice to her and her husband in 2020. I spend most of my year living in Roatan Honduras where I enjoy scuba diving, spear fishing and hiking. I am fluent in Spanish and also enjoy volunteering as a dentist at a local clinic here in Honduras.

You can expect to see me at the practice a few weeks a year to say hi to our patients and to cover for Dr. Ossman when she takes time off.

My other daughter, Baylee, is a graduate of the University of Washington school of nursing. She is working as a full time nurse in the NICU for the UW hospital in Seattle.

I promise you that we will give you the most current and best treatment possible at our practice!`,
    },
];

const leadership: TeamMember[] = [
    {
        name: "Devin",
        role: "OHD Director of Operations & Co-Owner",
        image: "/images/enumclaw/people/devin-owner.jpg",
        bio: `My wife and I have owned Ossman Harding Dental since 2020. I have a background in accounting and finance as a CPA and came to the office from a corporate finance role at Starbucks. I believe strongly in taking care of our team and I strive to create an incredible work environment for our team so that they can best serve our patients.

I am thankful to now be a part of the dental profession where the primary goal is to serve our patients and to promote overall wellness! My wife (Dr. Ossman) and I have a 2 year old dog who keeps us busy. I also love WSU and Seahawks football. I am taking Apple Cup bets now!`,
    },
    {
        name: "Alexa",
        role: "Enumclaw Office Manager",
        image: "/images/enumclaw/people/alexa-coordinator.jpg",
        bio: `I was born and raised in the Lake Sawyer area and graduated dental assisting school in 2012. I have also been trained as a schedule and treatment coordinator where I enjoy interacting with our patients on a daily basis! I started working for Ossman Harding Dental in 2018 and look forward to coming to work every day with such an awesome group who is like family to me.

My fiancé Andrew and I are getting married in November 2020 and we enjoy traveling, being outdoors, and spending time with our family and friends!`,
    },
];

const frontOffice: TeamMember[] = [
    {
        name: "Kate",
        role: "Scheduling & Treatment Coordinator",
        image: "/images/enumclaw/people/kate.jpg",
        bio: `I was raised right here in Enumclaw, WA and am proud to be able to serve my own community! I graduated high school in 2018 and joined the dental field soon after. I worked as sterile tech and assisted for 3 years before transitioning to the front desk.

I joined Ossman-Harding in March of 2023. One of the best parts about my job is helping patients in every way possible, whether that's discussing their treatment or making them smile when they walk through the doors!

Outside the office, you'll find me working the outpost coffee stand, spending time with my two crazy dogs and Husband Tyler. I also enjoy fishing, hunting, camping, and anything with a motor. As well as spending time with my family and friends.`,
    },
    {
        name: "Breanna",
        role: "Scheduling & Treatment Coordinator",
        image: "/images/enumclaw/people/breanna.jpg",
        bio: `I was born/raised here in Enumclaw and I have been with Ossman Harding Dental since March 2024!

I came from the medical field and absolutely love everything about the dental field. I especially like getting to know our patients and creating a fun, comfortable environment when patients walk through the door. I live in Buckley with my husband, and our two children. I love spending time with my family, enjoying the sunshine and reading a good book.`,
    },
    {
        name: "Caley",
        role: "Scheduling & Treatment Coordinator",
        image: "/images/enumclaw/people/caley.jpg",
        bio: `I grew up in Covington and moved to the Enumclaw area in 2019. Married to my amazing husband Brett and a mom to our beautiful babies, Jackson and Amelia.

I have been at Ossman Harding Dental since 2025 and I worked as a medical assistant for a few years before having my children.

I love learning new things, making new friends, and spending time with my family. I look forward to getting to serve the community that I call home!`,
    },
];

const hygienists: TeamMember[] = [
    {
        name: "Erica",
        role: "Restorative Hygienist",
        image: "/images/enumclaw/people/ERICA.jpg",
        bio: `I have been a Dental Hygienist since 2005 and I have been with Ossman Harding Dental since 2012. I love working with our entire team to help patients improve their smile and have a comfortable, enjoyable, dental experience.

When I am not at work, I enjoy spending time with my husband and our three amazing daughters! We love to be outdoors in the sun and to spend time at our family cabin in eastern Washington.`,
    },
    {
        name: "Jen",
        role: "Hygienist",
        image: "/images/enumclaw/people/JEN.jpg",
        bio: `I grew up in the Puyallup area and currently live in Graham. My husband Denver and I have 2 boys Brantley and Hudson that keep us busy as well.

I completed Dental Hygiene school in 2012 and have been at OHD since 2018. The drive every day is so worth it as I get to work with my best friends and see the most amazing patients in Enumclaw.

I knew I wanted to be a hygienist since age 13 and I'm so glad I followed that path, I truly love what I do. I focus on encouragement and education to help patients create healthy habits for a beautiful smile.

When I'm not cleaning teeth, I'm creating the coffee stains with our small business Retrospresso. A mobile coffee trailer that we tow to local events in Pierce county and allow us to have fun and to be involved in the community.`,
    },
    {
        name: "Megan",
        role: "Hygienist",
        image: "/images/enumclaw/people/megan-hygienist.jpg",
        bio: `I grew up in the Puyallup area and graduated from Pierce College with my Bachelors of Applied Science in Dental Hygiene. I have been with Ossman Harding Dental since 2020.

I love creating relationships with patients and I have a passion for helping people understand more about their teeth. In my free time I enjoy spending time with my family and friends. I also have an adorable cat named Sassy!`,
    },
    {
        name: "Karyn",
        role: "Hygienist",
        image: "/images/enumclaw/people/karyn-hygienist.jpg",
        bio: `I have lived in Enumclaw for over 20 years. After receiving my BS degree in Elementary Education, I chose to change career paths and received my RDH degree in 2012. I have been with Ossman Harding Dental since 2021.

I have a passion for teaching. I feel like helping patients understand the correlation and importance between their oral health and overall health is the most important part of my job.

In my free time, I choose to spend time with my husband, Chris, our two grown daughters, their significant others and our dogs! I enjoy spending time outdoors and am always up for hiking, mountain-biking, paddle-boarding, or snow-shoeing! I also like to escape in a good book or tackle random DIY projects around the house!`,
    },
    {
        name: "Leslie",
        role: "Hygienist",
        image: "/images/enumclaw/people/leslie-hygienist.jpg",
        bio: `I joined Ossman Harding Dental in January 2005! I married my high school sweetheart and we have two boys and one daughter.

I am always striving to learn and I love sunshine, ice cream, discovering new places, and being with my people.`,
    },
    {
        name: "Carli",
        role: "Hygienist",
        image: "/images/enumclaw/people/carli.jpg",
        bio: `I was born and raised in Maple Valley and joined Ossman Harding dental in 2024. I graduated dental hygiene school in 2015 and have taken pride in my patient's oral health in every year since. There's nothing better to me than helping my patients achieve a happy, confident smile!

My husband, Lance and I spend most of our time with our little guy, Cal and our yellow lab Lenny! We love traveling, being near the water, and exploring new food and drinks!`,
    },
];

const assistants: TeamMember[] = [
    {
        name: "Heidi",
        role: "Dental Assistant",
        image: "/images/enumclaw/people/heidi-dental-assistant.jpg",
        bio: `I've been working in the dental field over 40 years and have been working at Ossman Harding Dental since 2014.

I love helping people with their dental needs and any fears they might have related to dentistry. In my spare time I enjoy spending quality time with family and hiking with my husband.`,
    },
    {
        name: "Lexi",
        role: "Dental Assistant",
        image: "/images/enumclaw/people/lexi.jpg",
        bio: `I was born and raised in Lake Tapps, and graduated from Bonney Lake high school. I have been a dental assistant since 2020. I worked 4.5 years in pediatric dentistry before joining the Ossman-Harding general dentistry team in April of 2024.

I have loved every second of working here and can't wait for many more years to come serving the amazing patients in Enumclaw! I love having the opportunity to help a patient feel better and happier about their teeth and making sure they leave OHD with a big smile on their face!

Outside of work I am usually spending my time with family and friends. I love being outside, working out, cooking/baking, reading and watching my favorite tv shows! P.S Go Hawks!`,
    },
    {
        name: "Stephanie",
        role: "Dental Assistant",
        image: "/images/enumclaw/people/steph.jpg",
        bio: `I was born and raised in Auburn Washington and have been Assisting since 2012. I started working for Ossman Harding Dental in the Fall of 2023.

I am passionate about helping and educating each individual on how to improve their oral health! I love the relationships I have built over the years and look forward to building these ties in Enumclaw. My goal each day is to make every patient feel as comfortable as possible during their procedures. I look forward to coming to work, building trust with my patients and helping every person that I see!

My Husband and I have 2 boys, 3 1/2 and 7 months, who are our whole world! We also have 2 stubborn Fur babies, A yellow lab, Ace and a Rottweiler named Addy.

We moved to Enumclaw in the Spring of 2021 from Black Diamond. We love raising our children in this town, doing DYI projects and spending time with our friends/family. I'm looking forward to meeting you!`,
    },
    {
        name: "Hailey",
        role: "Dental Assistant",
        image: "/images/enumclaw/people/hailey.jpg",
        bio: `I was born & raised in Maple Valley, and I have been assisting since 2016. I joined the OHD team in 2024 and am so excited to serve this community!

My fiancé Zach & I currently live in Enumclaw. Our family includes a 2 year old silver lab, a constant source of joy and laughter. Together, we enjoy spending time outdoors & spending time with family.`,
    },
];

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Meet Our ${LOCATION.name} Dental Team | ${businessConfig.name}`,
        description: `Meet the experienced dental professionals at our ${LOCATION.name} office. Our caring team includes Dr. Ossman, Dr. Zander, Dr. Ornelas, Dr. Harding, and dedicated hygienists and assistants.`,
        keywords: [
            `${LOCATION.name} dentist`,
            `${LOCATION.name} dental team`,
            "Dr. Ossman",
            "Dr. Harding",
            "Dr. Ornelas",
            "Dr. Zander",
            "dental professionals",
        ],
        url: `${businessConfig.website}/${LOCATION.slug}/team`,
    },
    businessConfig
);

export default function EnumclawTeamPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: businessConfig.website },
        { name: `${LOCATION.name} Office`, url: `${businessConfig.website}/${LOCATION.slug}` },
        { name: "Our Team", url: `${businessConfig.website}/${LOCATION.slug}/team` },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <StructuredData data={[breadcrumbSchema]} />
            <main id="main-content" className="flex-grow">
                <Hero
                    backgroundImage={businessConfig.pageHeroImages?.["/about"] || businessConfig.heroImage}
                    title={`Our ${LOCATION.name} Team`}
                    subtitle="Experienced professionals dedicated to your dental health"
                />
                <Breadcrumb
                    items={[
                        { name: "Home", url: "/" },
                        { name: `${LOCATION.name} Office`, url: `/${LOCATION.slug}` },
                        { name: "Our Team", url: `/${LOCATION.slug}/team` },
                    ]}
                />

                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Meet Our {LOCATION.name} Dental Team
                            </h1>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                                At {businessConfig.name}, our {LOCATION.name} team brings together
                                years of experience and a genuine passion for dental care. We believe
                                in treating every patient like family.
                            </p>
                        </div>

                        <TeamSection title="Our Doctors" members={doctors} />
                        <TeamSection title="Leadership" members={leadership} />
                        <TeamSection title="Front Office Team" members={frontOffice} />
                        <TeamSection title="Dental Hygienists" members={hygienists} />
                        <TeamSection title="Dental Assistants" members={assistants} />

                        {/* CTA Section */}
                        <div className="bg-primary-900 text-white p-8 rounded-xl mt-12">
                            <h2 className="text-2xl font-bold mb-4">
                                Schedule Your Visit
                            </h2>
                            <p className="text-primary-100 mb-6">
                                Ready to meet our team in person? Schedule your appointment today
                                and experience the difference of personalized dental care.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/appointments"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-button-600 text-white font-semibold rounded-lg hover:bg-button-700 transition-colors"
                                >
                                    Schedule an Appointment
                                </Link>
                                <Link
                                    href={`/${LOCATION.slug}/services`}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    View Our Services
                                </Link>
                            </div>
                        </div>

                        {/* Back Links */}
                        <div className="flex gap-4 mt-8">
                            <Link
                                href={`/locations/${LOCATION.slug}`}
                                className="text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                ← Back to {LOCATION.name} Office
                            </Link>
                            <Link
                                href="/locations/bonney-lake/team"
                                className="text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                Meet our Bonney Lake Team →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
