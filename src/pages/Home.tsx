import { useEffect, useState } from 'react';
import { supabase, Project, SiteContent } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';

import founder from '../assets/f1.png';
import founder2 from '../assets/f2.png';
import legalAdvisor from '../assets/l1.png';

import partner1 from '../assets/b1.png';
import partner2 from '../assets/b2.png';
import partner3 from '../assets/b3.png';

export default function Home() {
  const [heroContent, setHeroContent] = useState<SiteContent | null>(null);
  const [aboutContent, setAboutContent] = useState<SiteContent | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchContent();
    fetchFeaturedProjects();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from<SiteContent>('site_content').select('*');
    if (data && Array.isArray(data)) {
      setHeroContent(data.find((c) => c.section === 'hero') || null);
      setAboutContent(data.find((c) => c.section === 'about') || null);
    }
  };

  const fetchFeaturedProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })
      .limit(5);

    if (data) setFeaturedProjects(data);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {heroContent?.title || 'Powering Tomorrow with Clean Energy'}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {heroContent?.content ||
              'Leading the renewable energy revolution with innovative solar solutions'}
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Explore Projects <ArrowRight />
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-green-600">26+ MW</div>
            <div className="font-semibold text-black">Total Installed Capacity</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">5+</div>
            <div className="font-semibold text-black">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">70k+</div>
            <div className="font-semibold text-black">CO₂ Emissions Reduced</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">100+ MW</div>
            <div className="font-semibold text-black">Renewable Portfolio by 2028</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 space-y-24">

          {/* Company Overview */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Company Overview
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {aboutContent?.content ||
                'We are a renewable energy company focused on developing, operating, and managing large-scale solar power projects with a strong commitment to sustainability, innovation, and long-term value creation.'}
            </p>
          </div>

          {/* CORPORATE HIGHLIGHTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Experience',
                value: '40+ Years',
                desc: 'Proven leadership in transmission, distribution, and renewable energy infrastructure.',
              },
              {
                title: 'Core Focus',
                value: 'Renewable Energy',
                desc: 'Solar power generation, open access power sale, and clean energy solutions.',
              },
              {
                title: 'Operations',
                value: 'Multi-State',
                desc: 'Strong coordination with state utilities and regulatory authorities.',
              },
              {
                title: 'Vision',
                value: 'Sustainable Growth',
                desc: 'Building long-term value through compliant, scalable clean energy projects.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-100 border border-gray-200 rounded-xl p-6
                           hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase font-semibold text-yellow-600">
                    {item.title}
                  </span>
                  <span className="text-yellow-500">◆</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                <p className="text-gray-600 text-sm mt-3">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* LEADERSHIP */}
          {[
            {
              img: founder,
              role: 'Managing Director',
              name: 'Sankara Raju Aduluri',
              exp: '40+ Years | Transmission & Distribution',
              desc:
                'He has successfully led and delivered complex infrastructure projects without cost overruns, including assignments in challenging terrains and emergency restoration operations.',
            },
            {
              img: founder2,
              role: 'Managing Partner',
              name: 'Prasad Raju M',
              exp: 'Retd. APTRANSCO | 38 Years Experience',
              desc:
                'Retired APTRANSCO officer with deep expertise in project administration, open access power sale, and state utility coordination.',
            },
            {
              img: legalAdvisor,
              role: 'Legal Advisor',
              name: 'Pranathi Patel GB',
              exp: 'Legal & Regulatory Compliance',
              desc:
                'Provides legal oversight, regulatory guidance, and compliance support to ensure smooth execution of projects and partnerships.',
            },
          ].map((person, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-16 items-center">
              <div className="flex justify-center">
                <div className="w-72 h-[420px] rounded-3xl bg-gradient-to-b from-green-600 to-green-800 p-[4px] shadow-2xl">
                  <div className="w-full h-full rounded-2xl bg-gray-100 overflow-hidden">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-600 pl-8">
                <span className="text-sm uppercase font-semibold text-green-600">
                  {person.role}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {person.name}
                </h3>
                <p className="inline-block mt-3 mb-6 px-4 py-1 text-sm font-semibold 
                              bg-yellow-100 text-yellow-700 rounded-full">
                  {person.exp}
                </p>
                <p className="text-gray-700 text-lg">{person.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUSTAINABLE GROWTH PLAN */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Sustainable Growth Plan
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="rounded-xl shadow-lg overflow-hidden">
                <img src={project.image_url} className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{project.location}</span>
                    <span>{project.capacity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC ASSOCIATIONS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Strategic Associations
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {[partner1, partner2, partner3].map((logo, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6
                           shadow-sm hover:shadow-md transition"
              >
                <img
                  src={logo}
                  alt={`Strategic Partner ${i + 1}`}
                  className="h-16 object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
