import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100">
      <Header />
      
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-700 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with us at SGSITS campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">ojasvagrawal2807@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">
                      Shri Govindram Seksaria Institute of Technology and Science<br />
                      23, Sir M. Visvesvaraya Marg, Indore<br />
                      Madhya Pradesh 452003
                    </p>
                  </div>
                </div>
                
            
              </div>
            </div>
            
            {/* Google Maps */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 pb-0">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Find Us on Campus</h2>
                                <p className="text-gray-600 mb-6">
                  Visit our institute campus to connect in person.
                </p>
              </div>
              <iframe
                title="SGSITS Indore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.2562160393904!2d75.87157267476157!3d22.726274627321434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd8b5b5cee79%3A0x1ce0eb2d007563ff!2sGolden%20Gate%20SGSITS!5e1!3m2!1sen!2sin!4v1750853741448!5m2!1sen!2sin" 
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                className="border-0 w-full"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
