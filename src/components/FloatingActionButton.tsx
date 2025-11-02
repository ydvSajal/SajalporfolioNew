import { useState } from 'react';
import { Mail, Github, Linkedin, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Mail, label: 'Email', href: 'mailto:sajalkumar1765@gmail.com', color: 'from-red-500 to-orange-500' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/ydvSajal', color: 'from-gray-600 to-gray-800' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sajal-yadav-6a0b5930a', color: 'from-blue-500 to-blue-700' },
    { icon: MessageSquare, label: 'Contact', href: '#contact', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      {/* Action Buttons */}
      <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
        {actions.map((action, index) => (
          <a
            key={action.label}
            href={action.href}
            target={action.href.startsWith('http') ? '_blank' : undefined}
            rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group relative"
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
          >
            <Button
              size="icon"
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <action.icon className="h-5 w-5" />
            </Button>
            {/* Tooltip */}
            <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card border border-card-border rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {action.label}
            </span>
          </a>
        ))}
      </div>

      {/* Main FAB Button */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  );
};
