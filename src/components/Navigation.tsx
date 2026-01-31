import { BrowserRouter, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import logo from './assets/logo.jpeg';

/* ---------------- HOME PAGE ---------------- */
function Home() {
  return (
    <section className="pt-32 max-w-7xl mx-auto px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Regenesis Green Energy
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl">
        Powering tomorrow with clean, sustainable energy solutions.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <Stat title="Total Installed Capacity" value="26+ MW" />
        <Stat title="Projects Completed" value="5+" />
        <Stat title="Renewable Portfolio by 2028" value="100+ MW" />
      </div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-xl p-6 text-center shadow-sm">
      <div className="text-3xl font-bold text-green-600">{value}</div>
      <div className="font-semibold text-gray-800 mt-2">{title}</div>
    </div>
  );
}

/* ---------------- PROJECTS PAGE ---------------- */
function Projects() {
  const [params] = useSearchParams();
  const status = params.get('status') || 'all';

  const projects = [
    { name: 'Solar Plant – Karnataka', status: 'operational' },
    { name: 'Solar Park – Telangana', status: 'completed' },
    { name: 'Open Access Project – AP', status: 'operational' },
    { name: 'Upcoming Solar Farm – MH', status: 'upcoming' },
    { name: 'Hybrid Project – TN', status: 'upcoming' },
  ];

  const filtered =
    status === 'all'
      ? projects
      : projects.filter((p) => p.status === status);

  return (
    <section className="pt-32 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-10">Projects</h1>

      {/* FILTER TABS */}
      <div className="flex gap-4 mb-10">
        {['all', 'operational', 'completed', 'upcoming'].map((type) => (
          <Link
            key={type}
            to={`/projects?status=${type}`}
            className={`px-6 py-2 rounded-lg border font-medium
              ${
                status === type
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {type.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* PROJECT LIST */}
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((p, i) => (
          <div key={i} className="border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-2">{p.name}</h3>
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100">
              {p.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- NAVIGATION ---------------- */
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="h-12" />
          <div>
            <div className="font-bold text-green-700">Regenesis Green Energy</div>
            <div className="text-xs text-yellow-600">Clean Power Solutions</div>
          </div>
        </Link>

        <div className="flex gap-8 font-medium">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/projects" className="hover:text-green-600">Projects</Link>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- ROOT APP ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
