import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';

export default function ContributePage() {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    link: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/contributions/add',
        formData
      );
      setMessage('✅ Contribution submitted successfully!');
      setFormData({ type: '', title: '', link: '', description: '' });
    } catch (err) {
      console.error('❌ Error submitting contribution:', err);
      setMessage('❌ Failed to submit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-black p-8 text-gray-900 dark:text-white">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center">📤 Share Your Resources</h2>

          {message && (
            <div className="text-center text-sm text-green-600 dark:text-green-400">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, type: val }))
                }
              >
                <SelectTrigger className="w-full">
                  <span>{formData.type || 'Select type'}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Notes">Notes</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Link">Link</SelectItem>
                  <SelectItem value="Cheat Sheet">Cheat Sheet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. EDC handwritten notes"
              />
            </div>

            <div>
              <Label htmlFor="link">Link</Label>
              <Input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Google Drive / YouTube / GitHub etc."
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What is this resource about?"
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Submit Contribution
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
