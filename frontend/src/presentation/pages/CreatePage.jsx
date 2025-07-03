import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { useCreateNote } from '../hooks/useCreateNote';

function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { loading, createNote } = useCreateNote();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNote({ title, content });
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto p-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to="/" className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>
          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title'>Create New Note</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Form inputs are the same as before */}
                <div>
                  <label className='label'><span className='label-text'>Title</span></label>
                  <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='input input-bordered w-full' />
                </div>
                <div>
                  <label className='label'><span className='label-text'>Content</span></label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} className='textarea textarea-bordered w-full h-40' />
                </div>
                <button type='submit' className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;