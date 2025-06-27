import React, { useState } from 'react';
import { supabase } from '../../lib/supabase/client';
import { downloadTemplate } from '../../lib/download';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  templateId: string;
  className?: string;
  children?: React.ReactNode;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ templateId, className, children }) => {
  const [downloading, setDownloading] = useState(false);
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setDownloading(true);
    // Save email + template_id to Supabase
    const { error } = await supabase.from('download_leads').insert([
      { email, template_id: templateId }
    ]);
    if (error) {
      setError('Failed to record download. Please try again.');
      setDownloading(false);
      return;
    }
    setSubmitted(true);
    // Now trigger the download
    try {
      const downloadUrl = await downloadTemplate(templateId);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `template-${templateId}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (showForm) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-md">
          <h3 className="text-2xl font-bold mb-6 text-white">Download Template</h3>
          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-base font-semibold border border-red-500/20">
              {error}
            </div>
          )}
          {submitted ? (
            <div className="text-center">
              <p className="text-green-400 mb-6 text-lg font-semibold">Download started!</p>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-semibold border border-white/10 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-base font-semibold mb-2 text-white">
                  Enter your email to download
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-zinc-900 text-white text-base focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-zinc-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={downloading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-lg font-bold shadow-lg transition-all duration-300 disabled:opacity-60 text-base border-0 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {downloading ? 'Downloading...' : 'Download'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-semibold border border-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <button 
      onClick={() => setShowForm(true)}
      className={className}
    >
      {children}
    </button>
  );
}; 