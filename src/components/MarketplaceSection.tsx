import React, { useState } from "react";
import { Search, Filter, Star, Download, Eye, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All", "RAG Agents", "N8N Workflows", "Fine-tuning", "Chatbots", "Analytics", "Automation"
];

const agents = [
  {
    id: 1,
    name: "RAG Knowledge Assistant",
    category: "RAG Agents",
    description: "Advanced retrieval-augmented generation system for document Q&A",
    price: "$49/month",
    rating: 4.8,
    downloads: "1.2k",
    featured: true,
    image: "/placeholder.svg",
    tags: ["Vector DB", "OpenAI", "LangChain"]
  },
  {
    id: 2,
    name: "N8N Sales Automation",
    category: "N8N Workflows",
    description: "Complete CRM integration with lead scoring and email sequences",
    price: "$29/month",
    rating: 4.6,
    downloads: "890",
    featured: false,
    image: "/placeholder.svg",
    tags: ["CRM", "Email", "Analytics"]
  },
  {
    id: 3,
    name: "GPT-4 Fine-tuned Support",
    category: "Fine-tuning",
    description: "Customer support agent trained on your company data",
    price: "$99/month",
    rating: 4.9,
    downloads: "2.1k",
    featured: true,
    image: "/placeholder.svg",
    tags: ["GPT-4", "Support", "Custom"]
  },
  {
    id: 4,
    name: "Smart Chatbot Builder",
    category: "Chatbots",
    description: "No-code chatbot with NLU and multi-platform deployment",
    price: "$19/month",
    rating: 4.3,
    downloads: "3.5k",
    featured: false,
    image: "/placeholder.svg",
    tags: ["No-code", "Multi-platform", "NLU"]
  },
  {
    id: 5,
    name: "Business Analytics AI",
    category: "Analytics",
    description: "AI-powered insights from your business data and metrics",
    price: "$79/month",
    rating: 4.7,
    downloads: "654",
    featured: false,
    image: "/placeholder.svg",
    tags: ["BI", "Insights", "Reports"]
  },
  {
    id: 6,
    name: "Marketing Automation Suite",
    category: "Automation",
    description: "Complete marketing funnel automation with AI optimization",
    price: "$59/month",
    rating: 4.5,
    downloads: "1.8k",
    featured: true,
    image: "/placeholder.svg",
    tags: ["Marketing", "Funnel", "AI"]
  }
];

const MarketplaceSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredAgents = agents
    .filter(agent => 
      (selectedCategory === "All" || agent.category === selectedCategory) &&
      (searchQuery === "" || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    )
    .sort((a, b) => {
      if (sortBy === "featured") return b.featured ? 1 : -1;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "downloads") return parseInt(b.downloads) - parseInt(a.downloads);
      return 0;
    });

  return (
    <section id="marketplace" className="section-container bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="section-title">AI Agents Marketplace</h2>
        <p className="section-subtitle mx-auto">
          Browse our curated collection of AI agents and automation workflows
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents, workflows, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-axiom-500 focus:border-transparent outline-none"
            />
          </div>
          
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-axiom-500 focus:border-transparent outline-none"
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated</option>
            <option value="downloads">Most Downloaded</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === category
                  ? "bg-axiom-500 text-white"
                  : "bg-white text-gray-600 hover:bg-axiom-50 hover:text-axiom-600 border border-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            {/* Featured Badge */}
            {agent.featured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-axiom-500 to-axiom-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Featured
                </span>
              </div>
            )}

            {/* Agent Image */}
            <div className="relative h-48 bg-gradient-to-br from-axiom-50 to-axiom-100 overflow-hidden">
              <img 
                src={agent.image} 
                alt={agent.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Agent Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-axiom-600 transition-colors">
                  {agent.name}
                </h3>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{agent.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {agent.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {agent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-axiom-600">{agent.price}</span>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Download className="w-4 h-4 mr-1" />
                    {agent.downloads} downloads
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-axiom-500 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="bg-axiom-500 hover:bg-axiom-600 text-white p-2 rounded-lg transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="button-primary">
          Load More Agents
        </button>
      </div>
    </section>
  );
};

export default MarketplaceSection;