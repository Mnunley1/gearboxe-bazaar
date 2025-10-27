"use client";

import { Button } from "@car-market/ui/button";
import { Card } from "@car-market/ui/card";
import { Input } from "@car-market/ui/input";
import { Label } from "@car-market/ui/label";
import { Textarea } from "@car-market/ui/textarea";
import { ChevronDown, ChevronUp, Clock, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Footer } from "../../../components/footer";
import { Navbar } from "../../../components/navbar";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I list my vehicle for sale?",
    answer:
      "To list your vehicle, sign up for an account and navigate to your dashboard. Click 'New Listing' and fill out the vehicle information form. Once submitted, our team will review and approve your listing within 24-48 hours.",
  },
  {
    question: "What are the fees for selling a vehicle?",
    answer:
      "We charge a flat fee of $50 per vehicle listing. This includes listing your vehicle on our platform, featuring it at our monthly events, and providing marketing support. Payment is due when your listing is approved.",
  },
  {
    question: "How do I attend a car market event?",
    answer:
      "Browse our upcoming events page and click 'Register' on any event you'd like to attend. Registration is free for buyers. If you're selling, you'll need to have an approved vehicle listing first.",
  },
  {
    question: "What types of vehicles can I sell?",
    answer:
      "We accept all types of vehicles including cars, trucks, motorcycles, and specialty vehicles. All vehicles must be legally owned by the seller and have a clean title. We do not accept vehicles with salvage titles or significant damage.",
  },
  {
    question: "How long does it take to approve a listing?",
    answer:
      "Our team typically reviews and approves vehicle listings within 24-48 hours during business days. You'll receive an email notification once your listing is approved or if we need additional information.",
  },
  {
    question: "Can I edit my vehicle listing after it's approved?",
    answer:
      "Yes, you can edit your listing at any time through your dashboard. Changes to price, description, or photos will be reviewed and updated within 24 hours.",
  },
  {
    question: "What happens if my vehicle doesn't sell?",
    answer:
      "Your listing will remain active on our platform for 90 days. After that, you can renew your listing for another 90 days for a reduced fee of $25. You can also attend multiple events to showcase your vehicle.",
  },
  {
    question: "How do I contact a seller?",
    answer:
      "Use our built-in messaging system to contact sellers directly. Click the 'Message' button on any vehicle listing to start a conversation. All communications are monitored for safety and quality.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 font-bold text-4xl text-gray-900 md:text-5xl">
                Contact Us
              </h1>
              <p className="mx-auto max-w-2xl text-gray-600 text-xl">
                Have questions about our car market events or need help with
                your listing? We're here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  Email Us
                </h3>
                <p className="text-gray-600">support@gearboxemarket.com</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  Call Us
                </h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  Business Hours
                </h3>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and FAQ */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-6 font-bold text-3xl text-gray-900">
                  Send us a message
                </h2>
                <Card className="border-gray-200 bg-white p-8">
                  {submitted ? (
                    <div className="py-8 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <Mail className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We'll get back to you
                        within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            className="font-medium text-gray-700 text-sm"
                            htmlFor="name"
                          >
                            Full Name *
                          </Label>
                          <Input
                            className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            className="font-medium text-gray-700 text-sm"
                            htmlFor="email"
                          >
                            Email Address *
                          </Label>
                          <Input
                            className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                            type="email"
                            value={formData.email}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            className="font-medium text-gray-700 text-sm"
                            htmlFor="phone"
                          >
                            Phone Number
                          </Label>
                          <Input
                            className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                            id="phone"
                            name="phone"
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            type="tel"
                            value={formData.phone}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            className="font-medium text-gray-700 text-sm"
                            htmlFor="subject"
                          >
                            Subject *
                          </Label>
                          <Input
                            className="border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                            id="subject"
                            name="subject"
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            required
                            value={formData.subject}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          className="font-medium text-gray-700 text-sm"
                          htmlFor="message"
                        >
                          Message *
                        </Label>
                        <Textarea
                          className="min-h-[120px] border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary"
                          id="message"
                          name="message"
                          onChange={handleInputChange}
                          placeholder="Tell us how we can help you..."
                          required
                          value={formData.message}
                        />
                      </div>

                      <Button
                        className="w-full bg-primary py-3 font-medium text-base text-white hover:bg-primary/90"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </Card>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="mb-6 font-bold text-3xl text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <Card className="border-gray-200 bg-white" key={index}>
                      <button
                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                        onClick={() => toggleFAQ(index)}
                      >
                        <h3 className="pr-4 font-semibold text-gray-900 text-lg">
                          {faq.question}
                        </h3>
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 flex-shrink-0 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
