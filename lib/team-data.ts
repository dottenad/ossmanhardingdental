import { getTeamMembers, groupTeamMembersByCategory, SanityTeamMember, urlFor } from "./sanity";
import { TeamMember } from "@/components/TeamMemberCard";

// Fallback data for Enumclaw (existing hardcoded data)
const enumclawFallbackData = {
    doctors: [
        {
            name: "Dr. Madisyn Ossman",
            role: "Cosmetic Dentistry Lead & Co-Owner",
            image: "/images/enumclaw/people/madi.jpg",
            bio: `I was raised in Enumclaw, Washington most of my life and my husband and I now live in Bonney Lake. I have been lucky enough to serve this community as a dentist since 2018! My husband and I bought our Enumclaw practice from my dad (Dr. Harding) in 2020 and we have been incredibly fortunate to be able to grow the practice over the past few years with the help of our incredible team!

We are now so grateful to serve both the Enumclaw and Bonney Lake communities!

I believe in a preventative and evidence-based treatment approach, with a focus on patient education. I measure each treatment decision based on what I would recommend to my own family and I strongly believe in the ties between oral care and the overall health of each patient.

I also have a passion for esthetic dentistry and love to help patients transform their self esteem through SureSmile Clear Braces, Veneers, Botox, Filler and other cosmetic services. It's incredible to see the way that a person's confidence improves when they love their smile! I have completed many advanced trainings for SureSmile Clear Braces, Veneers, Botox, Filler and General Restorative Dentistry.

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
    ],
    leadership: [
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
    ],
    frontOffice: [
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
    ],
    hygienists: [
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
    ],
    assistants: [
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
    ],
};

// Local image fallback mapping (name -> image path)
const localImageMap: Record<string, { enumclaw?: string; "bonney-lake"?: string }> = {
    "Dr. Madisyn Ossman": { enumclaw: "/images/enumclaw/people/madi.jpg", "bonney-lake": "/images/bonney-lake/people/dr-ossman.jpg" },
    "Dr. Vernon Zander": { enumclaw: "/images/enumclaw/people/dr-zander.jpg", "bonney-lake": "/images/bonney-lake/people/dr-zander.jpg" },
    "Dr. Michael Ornelas": { enumclaw: "/images/enumclaw/people/dr-ornelas.jpg" },
    "Dr. Steve Harding": { enumclaw: "/images/enumclaw/people/dr-harding.jpg" },
    "Dr. Lynda Phan": { "bonney-lake": "/images/bonney-lake/people/dr-phan.jpg" },
    "Devin": { enumclaw: "/images/enumclaw/people/devin-owner.jpg", "bonney-lake": "/images/bonney-lake/people/devin-owner.jpg" },
    "Alexa": { enumclaw: "/images/enumclaw/people/alexa-coordinator.jpg" },
    "Rani": { "bonney-lake": "/images/bonney-lake/people/rani-coordinator.jpg" },
    "Kate": { enumclaw: "/images/enumclaw/people/kate.jpg" },
    "Breanna": { enumclaw: "/images/enumclaw/people/breanna.jpg" },
    "Caley": { enumclaw: "/images/enumclaw/people/caley.jpg" },
    "Madilyn": { "bonney-lake": "/images/bonney-lake/people/madi-dental-assistant.jpg" },
    "Jordan": { "bonney-lake": "/images/bonney-lake/people/jordan.jpg" },
    "Erica": { enumclaw: "/images/enumclaw/people/ERICA.jpg", "bonney-lake": "/images/bonney-lake/people/team-member-1.jpg" },
    "Jen": { enumclaw: "/images/enumclaw/people/JEN.jpg" },
    "Megan": { enumclaw: "/images/enumclaw/people/megan-hygienist.jpg" },
    "Karyn": { enumclaw: "/images/enumclaw/people/karyn-hygienist.jpg" },
    "Leslie": { enumclaw: "/images/enumclaw/people/leslie-hygienist.jpg" },
    "Carli": { enumclaw: "/images/enumclaw/people/carli.jpg" },
    "Ashley": { "bonney-lake": "/images/bonney-lake/people/ash.jpg" },
    "Krystin": { "bonney-lake": "/images/bonney-lake/people/krystin.jpg" },
    "Amber": { "bonney-lake": "/images/bonney-lake/people/amber.jpg" },
    "Faith": { "bonney-lake": "/images/bonney-lake/people/faith.jpg" },
    "Heidi": { enumclaw: "/images/enumclaw/people/heidi-dental-assistant.jpg" },
    "Lexi": { enumclaw: "/images/enumclaw/people/lexi.jpg" },
    "Stephanie": { enumclaw: "/images/enumclaw/people/steph.jpg" },
    "Hailey": { enumclaw: "/images/enumclaw/people/hailey.jpg" },
    "Alicia": { "bonney-lake": "/images/bonney-lake/people/alicia.jpg" },
    "Kenzi": { "bonney-lake": "/images/bonney-lake/people/kenzi.jpg" },
    "Andrea": { "bonney-lake": "/images/bonney-lake/people/andrea.jpg" },
    "Alissa": { "bonney-lake": "/images/bonney-lake/people/alissa.jpg" },
    "Sonia": { "bonney-lake": "/images/bonney-lake/people/pacho.jpg" },
};

// Get local image path for a team member
function getLocalImage(name: string, location: "enumclaw" | "bonney-lake"): string {
    const mapping = localImageMap[name];
    if (mapping) {
        // Try the specific location first, then the other location as fallback
        return mapping[location] || mapping.enumclaw || mapping["bonney-lake"] || "/images/placeholder-person.jpg";
    }
    return "/images/placeholder-person.jpg";
}

// Convert Sanity team member to the format expected by TeamMemberCard
function sanityToTeamMember(member: SanityTeamMember, location: "enumclaw" | "bonney-lake"): TeamMember {
    return {
        name: member.name,
        role: member.role,
        image: member.image ? urlFor(member.image).width(400).height(400).url() : getLocalImage(member.name, location),
        bio: member.bio,
    };
}

// Get team data for a location, with fallback to hardcoded data
export async function getTeamData(location: "enumclaw" | "bonney-lake") {
    try {
        // Try to fetch from Sanity
        const sanityMembers = await getTeamMembers(location);

        console.log(`[TeamData] Fetched ${sanityMembers?.length || 0} team members from Sanity for ${location}`);

        // If we have Sanity data, use it
        if (sanityMembers && sanityMembers.length > 0) {
            const grouped = groupTeamMembersByCategory(sanityMembers);
            console.log(`[TeamData] Using Sanity data - doctors: ${grouped.doctors.length}, leadership: ${grouped.leadership.length}, frontOffice: ${grouped.frontOffice.length}, hygienists: ${grouped.hygienists.length}, assistants: ${grouped.assistants.length}`);
            return {
                doctors: grouped.doctors.map(m => sanityToTeamMember(m, location)),
                leadership: grouped.leadership.map(m => sanityToTeamMember(m, location)),
                frontOffice: grouped.frontOffice.map(m => sanityToTeamMember(m, location)),
                hygienists: grouped.hygienists.map(m => sanityToTeamMember(m, location)),
                assistants: grouped.assistants.map(m => sanityToTeamMember(m, location)),
                source: "sanity" as const,
            };
        } else {
            console.warn(`[TeamData] Sanity returned empty data for ${location}, falling back to hardcoded data`);
        }
    } catch (error) {
        console.error("[TeamData] Failed to fetch from Sanity, using fallback data:", error);
    }

    // Fallback to hardcoded data
    console.warn(`[TeamData] Using FALLBACK hardcoded data for ${location}`);
    if (location === "enumclaw") {
        return { ...enumclawFallbackData, source: "fallback" as const };
    }

    // Bonney Lake fallback data
    return { ...bonneyLakeFallbackData, source: "fallback" as const };
}

// Fallback data for Bonney Lake
const bonneyLakeFallbackData = {
    doctors: [
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
    ],
    leadership: [
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
    ],
    frontOffice: [
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
    ],
    hygienists: [
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
    ],
    assistants: [
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
    ],
};
