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
    name: "Bonney Lake",
    slug: "bonney-lake",
};

const doctors: TeamMember[] = [
    {
        name: "Dr. Madisyn Ossman",
        role: "Cosmetic Dentistry Lead & Co-Owner",
        image: "/images/bonney-lake/people/dr-ossman.jpg",
        bio: `I was raised in Enumclaw, Washington most of my life and my husband and I now live in Bonney Lake. I have been lucky enough to serve this community as a dentist since 2018! My husband and I bought our Enumclaw practice from my dad (Dr. Harding) in 2020 and we have been incredibly fortunate to be able to grow the practice over the past few years with the help of our incredible team!

We are now so grateful to serve both the Enumclaw and Bonney Lake communities!

I believe in a preventative and evidence-based treatment approach, with a focus on patient education. I measure each treatment decision based on what I would recommend to my own family and I strongly believe in the ties between oral care and the overall health of each patient.

I also have a passion for esthetic dentistry and love to help patients transform their self esteem through SureSmile Clear Braces, Veneers, Botox, Filler and other cosmetic services. It's incredible to see the way that a person's confidence improves when they love their smile! I have completed many advanced trainings for SureSmile Clear Braces, Veneers, Botox, Filler and General Restorative Dentistry.

My husband and I love to travel, enjoy the outdoors, try new restaurants, and play with our springer-doodle pup.

I look forward to seeing you at our office soon and can promise that our incredible team will take great care of you.`,
    },
    {
        name: "Dr. Lynda Phan",
        role: "Sleep Medicine Lead & General Dentist",
        image: "/images/bonney-lake/people/dr-phan.jpg",
        bio: `I was born and raised in Lacey, Washington, received my Bachelor of Science degree Magna Cum Laude from Saint Martins University and attended the University of Washington School of Dentistry. After graduation, I practiced in Downtown Seattle where I was recognized by the Seattle Met as being a Top Dentist in 2023 and 2024.

I am truly passionate and committed to bringing high quality care and service to my patients. At every visit, I value the opportunity to meet and listen to what my patients' needs are in order to provide the best long term care for their oral and overall health. I have advanced training in Dental Sleep Medicine helping patients treat their sleep apnea, Botox injections for TMJ pain and cosmetic, CDOC CEREC training for anterior esthetic crowns, and have completed many high level restorative training workshops at one of the best dental continuing educational programs with Spear.

My husband Travis and I love our Chihuahua/Jack Russell named Petey and enjoy taking him on hikes and paddling boarding during our amazing summers and trading in our cold dark winters for sunshine and beach visiting our family in Hawaii.

I'm honored for the opportunity to treat your family and community and looking forward to creating many lasting smiles!`,
    },
    {
        name: "Dr. Vernon Zander",
        role: "Oral Surgery Lead & Co-Owner",
        image: "/images/bonney-lake/people/dr-zander.jpg",
        bio: `I am originally from Maple Valley and am a graduate of both Washington State University (Go Cougs!) and University of Washington's Dental School. I have been serving this local community with OHD since 2021. I enjoy spending time with friends and family and taking advantage of all the great hikes in the PNW. I also skied competitively in college and love having Crystal ski resort so close!

Dr. Zander has received advanced training in general dentistry with a focus on Oral Surgery at one of the top dental residencies in the nation. This additional training has allowed him to develop an expertise in Dental Implants, Wisdom Teeth Extractions, IV Sedation, and Prosthodontics.

We are very excited to now offer these services at our practice! This allows you to save time and money by staying in Enumclaw to accomplish your treatment goals. Adding a doctor will also open up appointment times to allow us to get you in even sooner when you call to schedule.`,
    },
];

const leadership: TeamMember[] = [
    {
        name: "Devin",
        role: "OHD Director of Operations & Co-Owner",
        image: "/images/bonney-lake/people/devin-owner.jpg",
        bio: `My wife and I have owned Ossman Harding Dental since 2020. I have a background in accounting and finance as a CPA and came to the office from a corporate finance role at Starbucks. I believe strongly in taking care of our team and I strive to create an incredible work environment for our team so that they can best serve our patients.

I am thankful to now be a part of the dental profession where the primary goal is to serve our patients and to promote overall wellness! My wife (Dr. Ossman) and I have a 2 year old dog who keeps us busy. I also love WSU and Seahawks football. I am taking Apple Cup bets now!`,
    },
    {
        name: "Rani",
        role: "Tehaleh Office Manager",
        image: "/images/bonney-lake/people/rani-coordinator.jpg",
        bio: `I graduated from White River High School and went on to play basketball at Centralia College, where I received my Associates degree. After that I went to Clover Park Technical College to get my certificate in dental management and administration. I started working for Ossman Harding Dental in February 2014 where I have enjoyed getting to know the patients and working with this wonderful staff!

In my free time I enjoy playing and attending sporting events. I am also the girls' junior varsity basketball coach at White River High School, Go Hornets!`,
    },
];

const frontOffice: TeamMember[] = [
    {
        name: "Madilyn",
        role: "Scheduling & Treatment Coordinator",
        image: "/images/bonney-lake/people/madi-dental-assistant.jpg",
        bio: `I have been with Ossman Harding Dental since 2020! I graduated from Tahoma High School in 2021 and also Green River Community College with my AA degree. I enjoy playing soccer, hanging out with my family and friends, and shopping!

I am on the path to becoming a Dental Hygienist, and I cannot wait to continue my journey in the dental field! I love being able to work with people on a day to day basis, and help others out.`,
    },
    {
        name: "Jordan",
        role: "Scheduling & Treatment Coordinator",
        image: "/images/bonney-lake/people/jordan.jpg",
        bio: `I was born and raised in Maple Valley and moved to Enumclaw about 3 years ago. I graduated from Tahoma High School in 2016 and went on to earn my AA in Business at Green River. I ventured into the dental field in 2023 and joined the Ossman Harding Dental team in 2024. I'm excited to continue my career in dental and help serve the people in this amazing community!

In my free time you can find me cooking, curled up with a good book, or on an adventure with my dog, Stella. I am also always on the lookout for a new hiking spot or a hidden gem for a good meal.`,
    },
];

const hygienists: TeamMember[] = [
    {
        name: "Ashley",
        role: "Hygienist",
        image: "/images/bonney-lake/people/ash.jpg",
        bio: `I have been a Dental Hygienist for Ossman Harding Dental since 2008!! I graduated from Clark College with a degree in Dental Hygiene then went on to receive my Bachelors degree from Eastern WA University.

I love my job because I get to interact with children and adults while providing them with excellent dental care. Our doctors and staff make it exciting to come to work every day, and I enjoy every second working at our office. I am married to my high school sweetheart, Mark and we have 3 amazing children, Brooklyn, Gavin and Blake. We love spending time with friends and family, taking our kids to all their sports and activities and cheering on the Enumclaw Hornets!`,
    },
    {
        name: "Krystin",
        role: "Dental Hygienist & Myofunctional Therapist",
        image: "/images/bonney-lake/people/krystin.jpg",
        bio: `I grew up in Bonney Lake and was part of the first graduating class of Bonney Lake High School in 2007. I began my career in dentistry shortly after as a dental assistant. In 2020, I completed the Dental Hygiene program at Seattle Central College with a Bachelor of Science in Dental Hygiene degree. In 2023, I completed the MyoMentor course to become a Myofunctional Therapist. I am a member of the IAOMT and I am especially interested in sharing holistic approaches to oral health with my patients. I have an immense passion for dentistry and truly enjoy continuing my education in order to provide the best care for my patients.

I started working at OHD in 2021 as a temporary employee, filling in consistently throughout the years and began my permanent career here in 2024.

Outside of work, I enjoy spending time with my husband Ryan, our two daughters, Ainsley and MacKenzie and our chocolate lab, Ellie. We enjoy frequenting Sounders matches & Mariners games, hiking, home karaoke and movie nights!`,
    },
    {
        name: "Amber",
        role: "Hygienist",
        image: "/images/bonney-lake/people/amber.jpg",
        bio: `I graduated in 2015 from the dental hygiene program at Lake Washington Institute in Kirkland, WA. I joined the Ossman-Harding Tehaleh practice in 2024 and am excited to serve the community I live in!

I have a deep passion for oral health and take pride in providing a positive and comfortable experience for all my patients. It's my goal to have patients leave with the education and motivation needed to achieve healthy and confident smiles.

My husband John and I have lived in the Tehaleh community since 2016. We have a busy home with three boys, a Labradoodle, and two Bengal cats. In our spare time, my family is usually busy with school sports and activities. We also enjoy traveling, camping, and spending time with family and friends.`,
    },
    {
        name: "Faith",
        role: "Dental Hygienist",
        image: "/images/bonney-lake/people/faith.jpg",
        bio: `I was born and raised in Southern California and moved to Washington in 2023. I live in the Tehaleh community and joined Ossman Harding Dental 2025.

I went to dental hygiene school at Northern Arizona University where I fell in love with the outdoors. I enjoy hiking, running, and really anything to be outside and active! I enjoy being with my family and friends and feel blessed that I get the opportunity to be surrounded by people and help brighten smiles everyday.`,
    },
    {
        name: "Erica",
        role: "Restorative Hygienist",
        image: "/images/bonney-lake/people/team-member-1.jpg",
        bio: `I have been a Dental Hygienist since 2005 and I have been with Ossman Harding Dental since 2012. I love working with our entire team to help patients improve their smile and have a comfortable, enjoyable, dental experience.

When I am not at work, I enjoy spending time with my husband and our three amazing daughters! We love to be outdoors in the sun and to spend time at our family cabin in eastern Washington.`,
    },
];

const assistants: TeamMember[] = [
    {
        name: "Alicia",
        role: "Dental Assistant",
        image: "/images/bonney-lake/people/alicia.jpg",
        bio: `I grew up in Des Moines, WA and completed a dental assisting program in 2018. I have happily been with Ossman Harding Dental since June of 2023.

I knew I wanted to be in the dental field from a young age and have a professional goal of becoming a hygienist. I love working with our amazing team and providing the best possible care for our patients. I love helping to educate people on their oral health and making their visits as stress-free as possible.

I married my husband in August of 2023 and we enjoy spending our time playing board games, cooking, or going on road trips. In my free time I can usually be found reading a book or watching a favorite show with my two black cats.`,
    },
    {
        name: "Kenzi",
        role: "Dental Assistant",
        image: "/images/bonney-lake/people/kenzi.jpg",
        bio: `I have been with the OHD team since 2024 and grew up in Enumclaw where I now have the pleasure of raising my own two kids! I started in the dental field in 2019 with a focus on oral and maxillofacial surgery and earned my dental anesthesia assistant certification in 2022. In the winter I also work at Crystal Mountain on the weekends as a lift operator. My kids and I enjoy snowboarding, hiking, golfing and traveling.

I value patient relationships and strive to deliver a personable and memorable experience! I'm eager to work alongside an amazing team and bring patient care and education to our community. I can't wait to see your smiling face in our chair soon!`,
    },
    {
        name: "Andrea",
        role: "Dental Assistant",
        image: "/images/bonney-lake/people/andrea.jpg",
        bio: `I was born and raised on the island of Kaua'i in Hawai'i. I was an assistant for 2 1/2 years before I decided to move to Washington to continue my education in Dental Hygiene. I joined the OHD team in 2024 and am so excited to serve the patients in our local area!

I love creating genuine relationships with patients, and providing a personal touch for each patient encounter. My goal is to ensure that every patient feels comfortable in the chair.

During my spare time, I love cooking, working out and traveling. I am excited to meet new faces, and give back to the community!!`,
    },
    {
        name: "Alissa",
        role: "Dental Assistant",
        image: "/images/bonney-lake/people/alissa.jpg",
        bio: `I was born and raised in Bonney Lake, WA, and I've been a dental assistant since 2019. Currently, I'm pursuing a career in dental hygiene and I'm excited to further my education in the field. I've had the pleasure of being a part of OHD Tehaleh since its opening in 2024. Outside of work I enjoy playing with my dog, Gus, and cherishing moments with my family.

I truly believe in building stronger relationships with patients and aim to provide a friendly, memorable experience for everyone. I'm excited to collaborate with a fantastic team and contribute to both patient care and education in our community. I look forward to seeing your smiling faces in our office soon!`,
    },
    {
        name: "Sonia",
        role: "Dental Assistant",
        image: "/images/bonney-lake/people/pacho.jpg",
        bio: `I was born and raised in Auburn Washington and I started my dental journey in 2016 and joined the OHD team in April of 2024 when we opened our Tehaleh location. I am passionate about providing quality patient care and making each visit as comfortable as possible. I love being part of a team that helps people feel confident about their smiles, and I'm always looking to learn and grow in my career. My goal is to eventually become an expanded function dental auxiliary.

Outside of work, my life is full of energy and love. I have a 1-year-old son, Enzo, who keeps me on my toes, along with four dogs and a bird. I love spending time outdoors, especially hiking whenever I get the chance. In my downtime, I enjoy reading and relaxing with a good book.`,
    },
];

export const metadata: Metadata = generateSEOMetadata(
    {
        title: `Meet Our ${LOCATION.name} Dental Team | ${businessConfig.name}`,
        description: `Meet the experienced dental professionals at our ${LOCATION.name} office in Tehaleh. Our caring team includes Dr. Madisyn Ossman, Dr. Lynda Phan, Dr. Vernon Zander, and dedicated hygienists and assistants.`,
        keywords: [
            `${LOCATION.name} dentist`,
            `${LOCATION.name} dental team`,
            "Tehaleh dentist",
            "Dr. Ossman",
            "Dr. Phan",
            "Dr. Zander",
            "dental professionals",
        ],
        url: `${businessConfig.website}/${LOCATION.slug}/team`,
    },
    businessConfig
);

export default function BonneyLakeTeamPage() {
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
                                At {businessConfig.name}, our {LOCATION.name} team in Tehaleh brings together
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
                                href="/locations/enumclaw/team"
                                className="text-primary-600 hover:text-primary-700 font-semibold"
                            >
                                Meet our Enumclaw Team →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
