import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import BreadcrumbNavbar from './components/BreadcrumbNavbar';
import { Outlet, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Website from './pages/website';
import ViewTable from './components/website/HeroSection/ViewTable';
import BlogPageTable from './components/Blog/BlogPageTable';
import CaseStudyTable from './components/caseStudy/caseStudyTable';
import { Toaster } from './components/ui/sonner';
import Dashboard from './pages/dashBoard';
// Dummy page component for now
const Page = ({ title }: { title: string }) => <div className="px-4 py-6 text-black "><h1 className="text-2xl font-bold text-black">{title}</h1></div>;

function AppLayout() {
  return (
    <div className="flex h-screen w-full m-0 p-0">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TopNavbar />
        <BreadcrumbNavbar />
        <div className="flex-1 overflow-y-auto bg-background">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
}

function App() {
  // Example routes setup for layout rendering
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/website" element={<Website />} >
            <Route path="hero-section" element={<ViewTable />} />
            <Route path="blog-page" element={<BlogPageTable />} />
            <Route path="case-studies" element={<CaseStudyTable />} />
          </Route>
          
          <Route path="/dashboard/product" element={<Page title="Product" />} />
          <Route path="/dashboard/customer" element={<Page title="Customer" />} />
          <Route path="/dashboard/transaction" element={<Page title="Transaction" />} />

          <Route path="/setup/product-setup" element={<Page title="Product Setup" />} />
          <Route path="/setup/configuration" element={<Page title="Configuration" />} />
          <Route path="/setup/product" element={<Page title="Product" />} />
          <Route path="/setup/job-scheduler" element={<Page title="Job Scheduler" />} />

          <Route path="/issuance" element={<Page title="Issuance" />} />
          <Route path="/support" element={<Page title="Support" />} />
          <Route path="/report" element={<Page title="Report" />} />
          <Route path="/processing" element={<Page title="Processing" />} />
          <Route path="/fees-and-limit" element={<Page title="Fees & Limit" />} />
          <Route path="/setting" element={<Page title="Setting" />} />

          <Route index element={<Page title="Dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
