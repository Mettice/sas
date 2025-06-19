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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Download Template</h3>
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {submitted ? (
            <div className="text-center">
              <p className="text-green-600 dark:text-green-400 mb-4">Download started!</p>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Enter your email to download
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={downloading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {downloading ? 'Downloading...' : 'Download'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
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