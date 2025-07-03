import React, { useState } from "react";
import { Check, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individuals and small teams getting started with AI agents",
    features: [
      "Up to 5 AI agents",
      "1GB storage",
      "Basic templates",
      "Community support",
      "Standard deployment",
      "API access"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing businesses and advanced AI automation",
    features: [
      "Up to 50 AI agents",
      "25GB storage",
      "Premium templates",
      "Priority support",
      "Advanced deployment",
      "Custom integrations",
      "Analytics dashboard",
      "Team collaboration"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations with specific needs",
    features: [
      "Unlimited AI agents",
      "Unlimited storage",
      "Custom development",
      "24/7 dedicated support",
      "Enterprise deployment",
      "White-label options",
      "Advanced security",
      "SLA guarantee",
      "Custom training"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-subtitle mx-auto">
          Choose the perfect plan for your AI automation needs
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center mt-8">
          <span className={cn("text-sm", !isAnnual ? "text-gray-900" : "text-gray-500")}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={cn(
              "mx-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              isAnnual ? "bg-axiom-500" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                isAnnual ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span className={cn("text-sm", isAnnual ? "text-gray-900" : "text-gray-500")}>
            Annual
          </span>
          {isAnnual && (
            <span className="ml-2 text-sm text-axiom-600 font-medium bg-axiom-50 px-2 py-1 rounded-full">
              Save 20%
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={cn(
              "relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg",
              plan.popular 
                ? "border-axiom-500 shadow-lg scale-105" 
                : "border-gray-200 hover:border-axiom-200"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-axiom-500 to-axiom-600 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price === "Custom" ? plan.price : 
                    isAnnual && plan.price !== "Custom" 
                      ? `$${Math.round(parseInt(plan.price.replace('$', '')) * 0.8)}`
                      : plan.price
                  }
                </span>
                {plan.period && (
                  <span className="text-gray-500 ml-1">
                    {isAnnual ? "/year" : plan.period}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="w-5 h-5 text-axiom-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "w-full py-3 px-6 rounded-lg font-medium transition-all duration-300",
                plan.popular
                  ? "bg-axiom-500 hover:bg-axiom-600 text-white shadow-md hover:shadow-lg"
                  : "border-2 border-axiom-500 text-axiom-500 hover:bg-axiom-500 hover:text-white"
              )}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="max-w-3xl mx-auto text-left">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Can I change my plan anytime?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                What's included in the free trial?
              </h4>
              <p className="text-gray-600 text-sm">
                Get full access to the Starter plan for 14 days, no credit card required.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Do you offer enterprise discounts?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes, we offer volume discounts for large teams and custom enterprise solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;