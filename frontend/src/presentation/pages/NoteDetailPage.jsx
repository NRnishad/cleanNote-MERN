import React from 'react';
import { Link } from 'react-router-dom';
import { useNoteDetail } from '../hooks/useNoteDetail.js';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

function NoteDetailPage() {
  const { note, setNote, loading, saving, handleSave, handleDelete } = useNoteDetail();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    // This case is handled by the hook navigating away, but it's good practice
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <h2 className="text-2xl">Note not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Title</span></label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Content</span></label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className={`btn btn-primary ${saving ? 'loading' : ''}`} disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;