import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, Phone, Calendar, MapPin } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { formatPhoneDisplay, formatPhoneLink } from "@/lib/phone";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main id="main-content" className="flex-grow flex items-center justify-center px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Tooth Icon */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
                            <svg
                                className="w-12 h-12 text-primary-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 4c-1.5 0-3 1-3 3.5 0 2 1 3.5 1.5 5 .5 2 1 5 2 7.5.5 1 1 2 2 2 .5 0 1-.5 1.5-1.5.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5c.5 1 1 1.5 1.5 1.5 1 0 1.5-1 2-2 1-2.5 1.5-5.5 2-7.5.5-1.5 1.5-3 1.5-5 0-2.5-1.5-3.5-3-3.5-1.5 0-2.5.5-3.5 1.5-.5.5-1.5 1-2.5 1s-2-.5-2.5-1C9.5 4.5 8.5 4 7 4z"/>
                            </svg>
                        </div>
                    </div>

                    {/* 404 Badge */}
                    <div className="inline-block px-4 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full mb-4">
                        404 Error
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                        Oops! The page you&apos;re looking for seems to have gone missing.
                        Don&apos;t worry, let&apos;s get you back on track.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-button-600 to-button-700 rounded-xl shadow-lg hover:shadow-xl hover:from-button-700 hover:to-button-800 transition-all duration-300"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Go Back Home
                        </Link>
                        <Link
                            href="/appointments"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-md"
                        >
                            <Calendar className="w-5 h-5 mr-2" />
                            Schedule Appointment
                        </Link>
                    </div>

                    {/* Helpful Links */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Looking for something specific?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <Link
                                href="/services"
                                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                    <svg className="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 4c-1.5 0-3 1-3 3.5 0 2 1 3.5 1.5 5 .5 2 1 5 2 7.5.5 1 1 2 2 2 .5 0 1-.5 1.5-1.5.5-1.5 1-2.5 2-2.5s1.5 1 2 2.5c.5 1 1 1.5 1.5 1.5 1 0 1.5-1 2-2 1-2.5 1.5-5.5 2-7.5.5-1.5 1.5-3 1.5-5 0-2.5-1.5-3.5-3-3.5-1.5 0-2.5.5-3.5 1.5-.5.5-1.5 1-2.5 1s-2-.5-2.5-1C9.5 4.5 8.5 4 7 4z"/>
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold text-gray-900 group-hover:text-primary-700">Our Services</span>
                                    <p className="text-sm text-gray-500">Explore dental services</p>
                                </div>
                            </Link>
                            <Link
                                href="/locations"
                                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                    <MapPin className="w-5 h-5 text-primary-600" />
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold text-gray-900 group-hover:text-primary-700">Our Locations</span>
                                    <p className="text-sm text-gray-500">Find an office near you</p>
                                </div>
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold text-gray-900 group-hover:text-primary-700">About Us</span>
                                    <p className="text-sm text-gray-500">Meet our team</p>
                                </div>
                            </Link>
                            <Link
                                href="/new-patients"
                                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <span className="font-semibold text-gray-900 group-hover:text-primary-700">New Patients</span>
                                    <p className="text-sm text-gray-500">Getting started info</p>
                                </div>
                            </Link>
                        </div>

                        {/* Contact Info */}
                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-gray-600 mb-3">Need help? Give us a call:</p>
                            <a
                                href={`tel:${formatPhoneLink(businessConfig.phone)}`}
                                className="inline-flex items-center text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                {formatPhoneDisplay(businessConfig.phone)}
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
