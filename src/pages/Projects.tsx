import { useEffect, useState } from 'react';
import { supabase, Project } from '../lib/supabase';
import { MapPin, Zap, Calendar, CheckCircle } from 'lucide-react';

type TabContent = {
  tab: string;
  image_url: string;
  title: string;
  description: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [tabContent, setTabContent] = useState<TabContent[]>([]);

  useEffect(() => {
    fetchProjects();
    fetchTabContent();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) setProjects(data);
  };

  const fetchTabContent = async () => {
    const { data } = await supabase
      .from('project_tab_content')
      .select('tab, image_url, title, description');

    if (data) setTabContent(data);
  };

  const filteredProjects = projects.filter((project) =>
    filter === 'all' ? true : project.status === filter
  );

  const currentTabContent = tabContent.find(
    (item) => item.tab === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Discover our comprehensive portfolio of solar energy installations across the India.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-3 flex-wrap">
          {['all', 'Operational', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                filter === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'all' ? 'All Projects' : tab}
            </button>
          ))}
        </div>
      </section>

      {/* ✅ Operational / Completed Banner (FIXED & VISIBLE) */}
      {(filter === 'Operational' || filter === 'Completed') && currentTabContent && (
        <section className="py-12 bg-white border-b border-gray-200 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">

            {/* Image with overlay + title */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
              <img
                src={currentTabContent.image_url}
                alt={currentTabContent.title}
                className="w-full h-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

              {/* Title on image */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {currentTabContent.title}
                </h3>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {filter} Projects
              </h2>
              <p className="text-gray-600 text-lg">
                {currentTabContent.description}
              </p>
            </div>

          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg border overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={project.image_url}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1.5 text-sm rounded-full border flex items-center gap-1 ${getStatusColor(
                    project.status
                  )}`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <p className="mb-4 text-gray-700">{project.description}</p>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    {project.capacity}
                  </div>
                  {project.completion_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      {new Date(project.completion_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
