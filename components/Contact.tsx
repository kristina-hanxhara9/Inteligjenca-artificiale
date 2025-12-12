
import React from 'react';
import { Translation } from '../types';

interface ContactProps {
  content: Translation['contact'];
}

const Contact: React.FC<ContactProps> = ({ content }) => {
  // Static, no-backend email forwarding via formsubmit.co (free tier).
  // First submission will ask you to confirm the email address.
  const formAction = 'https://formsubmit.co/kristinazhi97@gmail.com';

  return (
    <section id="contact" className="py-24 px-6 bg-[#FDFBF7] relative">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-xl shadow-2xl border-4 border-double border-red-600/10 relative">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-600/20 -mt-2 -ml-2"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-600/20 -mb-2 -mr-2"></div>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-4">{content.title}</h2>
          <p className="text-neutral-500 max-w-lg mx-auto">{content.desc}</p>
        </div>

        <form 
            className="space-y-6" 
            action={formAction} 
            method="POST"
        >
          {/* FormSubmit extras */}
          <input type="hidden" name="_subject" value="New inquiry from AI Albania site" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{content.form.name}</label>
              <input 
                type="text" 
                name="name"
                required
                className="w-full bg-[#F9F9F9] border border-neutral-200 rounded-lg p-4 text-base text-[#1a1a1a] focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-neutral-400" 
                placeholder="John Doe" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{content.form.email}</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full bg-[#F9F9F9] border border-neutral-200 rounded-lg p-4 text-base text-[#1a1a1a] focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-neutral-400" 
                placeholder="john@example.com" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{content.form.business}</label>
            <input 
                type="text" 
                name="company"
                className="w-full bg-[#F9F9F9] border border-neutral-200 rounded-lg p-4 text-base text-[#1a1a1a] focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-neutral-400" 
                placeholder="Company Ltd" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{content.form.message}</label>
            <textarea 
                rows={4} 
                name="message"
                required
                className="w-full bg-[#F9F9F9] border border-neutral-200 rounded-lg p-4 text-base text-[#1a1a1a] focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-all placeholder:text-neutral-400" 
                placeholder="Tell us about your business goals..."
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-[#1a1a1a] text-white font-bold py-4 rounded-lg transition-all uppercase tracking-wide shadow-lg hover:shadow-xl text-sm border-b-4 border-red-800 active:border-b-0 active:translate-y-1 active:shadow-none"
          >
            {content.form.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
