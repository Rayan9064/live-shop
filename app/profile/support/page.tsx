'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomerSupportPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactForm, setShowContactForm] = useState(false);

  const faqCategories = [
    { id: 'all', name: 'All' },
    { id: 'orders', name: 'Orders' },
    { id: 'payments', name: 'Payments' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'returns', name: 'Returns' },
    { id: 'account', name: 'Account' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order by going to "My Orders" in your profile or using the tracking number sent to your email.'
    },
    {
      id: 2,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.'
    },
    {
      id: 3,
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.'
    },
    {
      id: 4,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days of purchase for a full refund. Items must be in original condition.'
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I change my password?',
      answer: 'Go to Profile > Security & Privacy > Change Password to update your password.'
    }
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-3">
          <Link href="/profile">
            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Customer Support</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-16 bg-white border-b border-gray-100">
        <div className="flex px-4">
          {[
            { key: 'faq', label: 'FAQ' },
            { key: 'contact', label: 'Contact Us' },
            { key: 'live', label: 'Live Chat' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 px-4 py-4">
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {/* Category Filter */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex flex-wrap gap-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCategory === category.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <i className={`ri-arrow-${expandedFaq === faq.id ? 'up' : 'down'}-s-line text-gray-400`}></i>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            {/* Contact Options */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl">
                  <i className="ri-mail-line text-xl text-blue-600"></i>
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-500">support@app.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl">
                  <i className="ri-phone-line text-xl text-green-600"></i>
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-500">1-800-123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl">
                  <i className="ri-time-line text-xl text-orange-600"></i>
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Send us a Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Subject</label>
                  <select className="w-full p-3 border border-gray-200 rounded-xl text-sm">
                    <option>Order Issue</option>
                    <option>Payment Problem</option>
                    <option>Technical Support</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Order Number (if applicable)</label>
                  <input
                    type="text"
                    placeholder="Enter order number"
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your issue or question..."
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none"
                  ></textarea>
                </div>
                
                <button
                  className="w-full py-3 text-white rounded-xl font-medium"
                  style={{ backgroundColor: '#072415' }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="space-y-4">
            {/* Live Chat Status */}
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Live Chat Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with our support team for instant help
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online - Average wait time: 2 minutes</span>
              </div>
              <button
                className="w-full py-3 text-white rounded-xl font-medium"
                style={{ backgroundColor: '#072415' }}
              >
                Start Live Chat
              </button>
            </div>

            {/* Recent Conversations */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Conversations</h3>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    subject: 'Order #12345 Shipping Delay',
                    date: '2024-01-20',
                    status: 'Resolved'
                  },
                  {
                    id: 2,
                    subject: 'Payment Issue',
                    date: '2024-01-18',
                    status: 'Resolved'
                  }
                ].map((conversation) => (
                  <div key={conversation.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{conversation.subject}</p>
                      <p className="text-xs text-gray-500">{conversation.date}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      {conversation.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}