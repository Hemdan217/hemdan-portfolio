
import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";

const ContactApp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
      // Play audio notification
      const audio = new Audio();
      audio.src = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAwKyx8k3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+9DEAAAJaANr9BAAI9kApX56IAAAAABYWFhYWFAAAAAAAAAAAEhMZmdoaGhoaGhoaGgICAAAkJCQAAAJCZ+fn+wkJCkEoJASxcuXLnwTg4T8uXkCBAnym0CdQqXL+XLly5cuXLsXLly5cuXLlyAgICAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICBcICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiYA4LkBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiA4QE/+0MQRgAmmj239BEAO6XOPvzxAABAQEBAQEBAQEBAAAAAAAAAAAAAA7/8uIDgAQICAgICAgICBAQEBAQEBAQEBAQLiAgICAgICAgICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA/wSAgICAgICAgfwAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
      audio.volume = 0.2;
      audio.play().catch(e => console.log("Audio play prevented:", e));
    }, 1500);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex items-center">
          <Mail className="w-8 h-8 mr-3 text-os-accent" />
          <h1 className="text-2xl font-bold">Contact Me</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact form */}
          <div className="border border-border rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-4">Send a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-muted/50 p-4 rounded-md text-center">
                <div className="inline-block p-2 rounded-full bg-green-100 text-green-600 mb-3">
                  <Send size={18} />
                </div>
                <h3 className="font-medium mb-2">Message Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for your message. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-input rounded-md px-3 py-2 bg-background"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-input rounded-md px-3 py-2 bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-input rounded-md px-3 py-2 bg-background resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center py-2 px-4 rounded-md text-white transition-colors ${
                    isSubmitting 
                      ? 'bg-os-accent/70 cursor-not-allowed' 
                      : 'bg-os-accent hover:bg-os-accent-hover'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          
          {/* Contact info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-os-accent/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail size={16} className="text-os-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <a 
                    href="mailto:hemdan219@gmail.com" 
                    className="text-os-accent hover:underline"
                  >
                    hemdan219@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-os-accent/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Phone size={16} className="text-os-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Phone</h3>
                  <a 
                    href="tel:+201090188616" 
                    className="text-os-accent hover:underline"
                  >
                    +201090188616
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-os-accent/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Github size={16} className="text-os-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">GitHub</h3>
                  <a 
                    href="https://github.com/Hemdan219" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-os-accent hover:underline"
                  >
                    github.com/Hemdan219
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-os-accent/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Linkedin size={16} className="text-os-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">LinkedIn</h3>
                  <a 
                    href="https://linkedin.com/in/hemdan-khalifa" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-os-accent hover:underline"
                  >
                    linkedin.com/in/hemdan-khalifa
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-5 bg-muted/30 rounded-lg border border-border">
              <h3 className="text-sm font-medium mb-3">Location</h3>
              <p className="text-sm text-muted-foreground">
                Kafr El-Sheikh, Egypt
              </p>
              <p className="text-sm mt-4 text-muted-foreground">
                I'm currently available for freelance work and interesting projects.
                Feel free to reach out to discuss potential opportunities!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;
