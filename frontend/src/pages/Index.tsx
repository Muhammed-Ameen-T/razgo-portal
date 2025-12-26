/**
 * Landing Page / Home
 * Public homepage with hero, features, and CTAs
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Globe,
  Rocket,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const STATS = [
  { value: '10,000+', label: 'Active Jobs', icon: Briefcase },
  { value: '5,000+', label: 'Companies', icon: Building2 },
  { value: '50,000+', label: 'Job Seekers', icon: Users },
  { value: '95%', label: 'Success Rate', icon: TrendingUp },
];

const FEATURES = [
  {
    icon: Search,
    title: 'Smart Job Matching',
    description: 'AI-powered recommendations that match your skills with the perfect opportunities.',
  },
  {
    icon: Zap,
    title: 'One-Click Apply',
    description: 'Save time with instant applications using your saved profile and resume.',
  },
  {
    icon: Globe,
    title: 'Remote Opportunities',
    description: 'Find remote and flexible work options from companies worldwide.',
  },
  {
    icon: Shield,
    title: 'Verified Employers',
    description: 'Every company is verified to ensure legitimate job opportunities.',
  },
];

const TESTIMONIALS = [
  {
    quote: "RazGo helped me land my dream job in just two weeks. The matching algorithm is incredible!",
    author: 'Sarah Chen',
    role: 'Senior Developer at TechCorp',
    rating: 5,
  },
  {
    quote: "As an employer, I've never had an easier time finding qualified candidates. Highly recommend!",
    author: 'Michael Rodriguez',
    role: 'HR Director at StartupXYZ',
    rating: 5,
  },
  {
    quote: "The platform's interface is intuitive and the job recommendations are spot-on.",
    author: 'Emily Johnson',
    role: 'UX Designer at DesignStudio',
    rating: 5,
  },
];

const FEATURED_COMPANIES = [
  'TechCorp', 'StartupXYZ', 'DesignStudio', 'DataFlow', 'CloudNine', 'GrowthLab'
];

export const LandingPage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
                <Rocket className="h-4 w-4" />
                Over 10,000 jobs waiting for you
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Find Your Dream Job
              <br />
              <span className="text-accent">Start Your Journey Today</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-primary-foreground/80 md:text-xl"
            >
              Connect with top companies, discover exciting opportunities, and take
              the next step in your career with RazGo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              {isAuthenticated ? (
                <Button size="xl" variant="accent" asChild>
                  <Link to={user?.role === 'employer' ? '/employer/dashboard' : '/jobs'}>
                    {user?.role === 'employer' ? 'Go to Dashboard' : 'Browse Jobs'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="xl" variant="accent" asChild>
                    <Link to="/auth/register">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="xl" variant="hero" asChild>
                    <Link to="/jobs">Browse Jobs</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-primary-foreground/10 p-6 text-center backdrop-blur-sm"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                <p className="text-3xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Why Choose <span className="text-accent">RazGo</span>?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide everything you need to find your next opportunity
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-card transition-all hover:shadow-card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="bg-muted/50 py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                For <span className="text-accent">Employers</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find the perfect candidates for your team with our powerful hiring tools.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'Post jobs and reach thousands of qualified candidates',
                  'Advanced filtering to find the perfect match',
                  'Streamlined applicant tracking system',
                  'Analytics and insights on your job postings',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Button variant="accent" size="lg" className="mt-8" asChild>
                <Link to="/auth/register?mode=register&role=employer">
                  Start Hiring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="gradient-hero rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '500+', label: 'Companies Trust Us' },
                    { value: '48h', label: 'Average Time to Hire' },
                    { value: '92%', label: 'Hiring Success' },
                    { value: '24/7', label: 'Support Available' },
                  ].map((stat, index) => (
                    <div key={index} className="rounded-xl bg-background/10 p-4 backdrop-blur-sm">
                      <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                      <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              What Our Users <span className="text-accent">Say</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Hear from job seekers and employers who found success with RazGo
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mb-6 italic text-foreground">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {FEATURED_COMPANIES.map((company) => (
              <span
                key={company}
                className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-hero mx-auto max-w-4xl rounded-2xl p-8 text-center lg:p-16"
          >
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Take the Next Step?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join thousands of professionals who have found their dream careers through RazGo.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" variant="accent" asChild>
                <Link to="/auth/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="hero" asChild>
                <Link to="/jobs">Explore Jobs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
