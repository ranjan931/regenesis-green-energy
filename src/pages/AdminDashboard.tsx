import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Project, SiteContent } from '../lib/supabase';
import { LogOut, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'content'>('projects');
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchSiteContent();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (data) setProjects(data);
  };

  const fetchSiteContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .order('section', { ascending: true });
    if (data) setSiteContent(data);
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    setLoading(true);

    if (editingProject.id) {
      await supabase
        .from('projects')
        .update(editingProject)
        .eq('id', editingProject.id);
    } else {
      await supabase.from('projects').insert([editingProject]);
    }

    setEditingProject(null);
    fetchProjects();
    setLoading(false);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  };

  const handleSaveContent = async () => {
    if (!editingContent) return;
    setLoading(true);

    await supabase
      .from('site_content')
      .update({
        title: editingContent.title,
        content: editingContent.content,
        image_url: editingContent.image_url,
        data: editingContent.data,
      })
      .eq('id', editingContent.id);

    setEditingContent(null);
    fetchSiteContent();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'projects'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'content'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Site Content
          </button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Projects</h2>
              <button
                onClick={() =>
                  setEditingProject({
                    title: '',
                    description: '',
                    location: '',
                    capacity: '',
                    image_url: '',
                    status: 'Operational',
                    featured: false,
                    order_index: projects.length,
                  })
                }
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            {editingProject && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingProject.id ? 'Edit Project' : 'New Project'}
                  </h3>
                  <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Capacity (e.g., 150 MW)"
                    value={editingProject.capacity}
                    onChange={(e) => setEditingProject({ ...editingProject, capacity: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Planned">Planned</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={editingProject.image_url}
                    onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none md:col-span-2"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    rows={3}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none md:col-span-2"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingProject.featured}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Featured on homepage</span>
                  </label>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveProject}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Save Project
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow p-6 flex gap-4">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {project.location} • {project.capacity} • {project.status}
                        </p>
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{project.description}</p>
                        {project.featured && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Site Content</h2>

            {editingContent && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Edit {editingContent.section}</h3>
                  <button onClick={() => setEditingContent(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={editingContent.title}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <textarea
                    placeholder="Content"
                    value={editingContent.content}
                    onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (optional)"
                    value={editingContent.image_url || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSaveContent}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingContent(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {siteContent.map((content) => (
                <div key={content.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{content.section}</h3>
                      <p className="text-sm font-medium text-gray-700 mt-2">{content.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{content.content}</p>
                    </div>
                    <button
                      onClick={() => setEditingContent(content)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
