import React, { useState } from "react";
import { CheckCircle, Sun, Wifi, Shield, Cloud, Cpu } from "lucide-react";
import Header from "../components/Header";

export default function IoTNoticeBoardLanding() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-white text-gray-900 font-sans">
            {/* Mobile Responsive Header */}
            <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

            <main className="">
                {/* Hero Section */}
                <section className="w-full min-h-screen bg-gray-100   ">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10">

                        <div className="w-full md:w-6/12 flex justify-center items-center flex-col pt-20 md:pt-0 md:order-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 md:hidden">Smarter Public Messaging with IoT</h1>
                            <p className="text-base md:text-lg mb-8 md:hidden">
                                A solar-powered, remotely managed digital notice board for universities and public spaces.
                            </p>

                            <img src="\Rectangle.png" alt="Notice Board Mockup" className="w-3/5 " />
                        </div>
                        <div className="flex flex-col sm:flex-row w-full gap-4 md:hidden mt-10">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Request Demo</button>
                            <button className="border border-gray-300 px-6 py-3 rounded-lg">See It Live</button>
                        </div>
                        <div className="max-w-xl mb-10 md:mb-0 hidden md:block">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smarter Public Messaging with IoT</h1>
                            <p className="text-base md:text-lg mb-8">
                                A solar-powered, remotely managed digital notice board for universities and public spaces.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Request Demo</button>
                                <button className="border border-gray-300 px-6 py-3 rounded-lg">See It Live</button>
                            </div>
                        </div>

                    </div>

                </section>

                {/* Features Section */}
                <section id="features" className="px-6 md:px-10 py-20 bg-white">
                    <h2 className="text-3xl font-semibold text-center mb-12">Core Features</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            { icon: Wifi, title: "Remote Updates" },
                            { icon: Sun, title: "Solar-Powered" },
                            { icon: Shield, title: "Weatherproof" },
                            { icon: Cloud, title: "Real-time Display" },
                            { icon: Cpu, title: "IoT ESP32" },
                            { icon: CheckCircle, title: "Secure Admin Panel" },
                        ].map(({ icon: Icon, title }) => (
                            <div key={title} className="border rounded-xl p-6 text-center shadow-sm">
                                <Icon className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
                                <h3 className="font-medium text-lg">{title}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how" className="bg-gray-50 px-6 md:px-10 py-20">
                    <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4  md:flex-row items-center justify-center gap-8 text-center md:max-w-5xl mx-auto">
                        {["Admin Device", "Web Portal", "ESP32 Module", "LED Board"].map((step, i) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-2">Step {i + 1}</div>
                                <div className="font-semibold text-lg">{step}</div>
                                {i < 4 && <div className="w-10 h-px bg-blue-400 my-4" />}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Use Cases Section */}
                <section id="usecases" className="px-6 md:px-10 py-20 bg-white">
                    <h2 className="text-3xl font-semibold text-center mb-12">Use Cases</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
                        {[
                            {
                                title: "Campus Notice Boards",
                                subheading: "Display academic schedules, events, and updates across university premises."
                            },
                            {
                                title: "City Transport Schedules",
                                subheading: "Provide commuters with real-time bus, train, and metro information at stops."
                            },
                            {
                                title: "Smart City Alerts",
                                subheading: "Deliver live public service alerts such as traffic, weather, and health updates."
                            },
                            {
                                title: "Corporate Communication",
                                subheading: "Enable internal messaging in industrial parks, office complexes, and building entrances."
                            },
                            {
                                title: "Event Announcements in Public Parks",
                                subheading: "Promote concerts, festivals, and local events in open public gathering spaces."
                            },
                            {
                                title: "Emergency Broadcasts in Disaster-Prone Areas",
                                subheading: "Issue immediate safety instructions and warnings during emergencies like floods or fires."
                            }
                        ].map((useCase) => (
                            <div key={useCase} className="border rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {useCase.subheading}                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section id="contact" className="px-6 md:px-10 py-20 bg-yellow-100 text-center">
                    <h2 className="text-3xl font-semibold mb-6">Ready to Modernize Your Notice Board?</h2>
                    <p className="mb-8">Experience the future of public communication with our smart display solution.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">Request a Demo</button>
                        <button className="border border-gray-300 px-6 py-3 rounded-lg">Download Brochure</button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white px-6 md:px-10 py-8 text-center">
                Presented by Tope
                <p className="text-xs" >&copy; 2025 IoT Notice Board Project. All rights reserved.</p>
            </footer>
        </div>
    );
}
