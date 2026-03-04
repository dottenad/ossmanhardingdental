"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio?: string;
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
    const [expanded, setExpanded] = useState(false);
    const hasBio = member.bio && member.bio.length > 0;
    const isLongBio = member.bio && member.bio.length > 150;

    // Split bio into paragraphs
    const bioParagraphs = member.bio?.split('\n\n').filter(p => p.trim()) || [];

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-[3/4]">
                <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
                {hasBio && (
                    <>
                        <div
                            className={`text-gray-600 text-sm transition-all duration-300 ${
                                expanded ? "" : "line-clamp-3"
                            }`}
                        >
                            {bioParagraphs.map((paragraph, index) => (
                                <p key={index} className={index > 0 ? "mt-3" : ""}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        {isLongBio && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 transition-colors"
                            >
                                {expanded ? (
                                    <>
                                        Read Less
                                        <ChevronUp className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Read More
                                        <ChevronDown className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export function TeamSection({ title, members }: { title: string; members: TeamMember[] }) {
    if (members.length === 0) return null;
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                {members.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
}
