/**
 * Job Listing Page
 * Search and filter available jobs
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import type { Job, JobType, ExperienceLevel } from '@/types';

// Mock job data
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: {
      id: '1',
      name: 'TechCorp Inc.',
      logo: undefined,
      industry: 'Technology',
      size: '500-1000',
      location: 'San Francisco, CA',
    },
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 150000, max: 200000, currency: 'USD' },
    description: 'We are looking for a Senior Frontend Developer to join our growing team...',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team leadership'],
    benefits: ['Health Insurance', '401k', 'Remote Friendly'],
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    status: 'active',
    applicationsCount: 45,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Product Manager',
    company: {
      id: '2',
      name: 'StartupXYZ',
      logo: undefined,
      industry: 'SaaS',
      size: '50-200',
      location: 'New York, NY',
    },
    location: 'New York, NY',
    type: 'full-time',
    experienceLevel: 'mid',
    salary: { min: 120000, max: 160000, currency: 'USD' },
    description: 'Join our product team and help shape the future of our platform...',
    requirements: ['3+ years PM experience', 'Agile methodology', 'Technical background'],
    benefits: ['Equity Package', 'Unlimited PTO', 'Learning Budget'],
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
    status: 'active',
    applicationsCount: 67,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'UX Designer',
    company: {
      id: '3',
      name: 'DesignStudio',
      logo: undefined,
      industry: 'Design',
      size: '10-50',
      location: 'Remote',
    },
    location: 'Remote',
    type: 'remote',
    experienceLevel: 'mid',
    salary: { min: 90000, max: 130000, currency: 'USD' },
    description: 'Creative UX Designer needed to craft beautiful user experiences...',
    requirements: ['4+ years UX experience', 'Figma expert', 'Portfolio required'],
    benefits: ['Remote Work', 'Flexible Hours', 'Home Office Stipend'],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    status: 'active',
    applicationsCount: 32,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: {
      id: '4',
      name: 'DataFlow',
      logo: undefined,
      industry: 'Data',
      size: '200-500',
      location: 'Austin, TX',
    },
    location: 'Austin, TX',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 140000, max: 180000, currency: 'USD' },
    description: 'Build scalable backend systems for our data platform...',
    requirements: ['5+ years backend experience', 'Python/Go', 'Cloud infrastructure'],
    benefits: ['Health + Dental', 'Stock Options', 'Gym Membership'],
    skills: ['Python', 'Go', 'PostgreSQL', 'AWS', 'Kubernetes'],
    status: 'active',
    applicationsCount: 28,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Marketing Intern',
    company: {
      id: '5',
      name: 'GrowthLab',
      logo: undefined,
      industry: 'Marketing',
      size: '10-50',
      location: 'Los Angeles, CA',
    },
    location: 'Los Angeles, CA',
    type: 'internship',
    experienceLevel: 'entry',
    salary: { min: 40000, max: 50000, currency: 'USD' },
    description: 'Great opportunity to learn digital marketing from experts...',
    requirements: ['Marketing degree (in progress)', 'Social media knowledge', 'Creative mindset'],
    benefits: ['Mentorship', 'Networking', 'Certificate'],
    skills: ['Social Media', 'Content Creation', 'Analytics', 'SEO'],
    status: 'active',
    applicationsCount: 89,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: {
      id: '6',
      name: 'CloudNine',
      logo: undefined,
      industry: 'Cloud Computing',
      size: '100-200',
      location: 'Seattle, WA',
    },
    location: 'Seattle, WA',
    type: 'contract',
    experienceLevel: 'senior',
    salary: { min: 160000, max: 200000, currency: 'USD' },
    description: 'Lead our DevOps transformation and build CI/CD pipelines...',
    requirements: ['6+ years DevOps experience', 'AWS/GCP certified', 'Terraform expert'],
    benefits: ['Contract Rate', 'Remote Option', 'Extension Possible'],
    skills: ['AWS', 'Terraform', 'Docker', 'CI/CD', 'Linux'],
    status: 'active',
    applicationsCount: 15,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const JOB_TYPES: { value: JobType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' },
];

const EXPERIENCE_LEVELS: { value: ExperienceLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'All Levels' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

const formatSalary = (min: number, max: number, currency: string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)} - ${formatter.format(max)}`;
};

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
};

const getJobTypeColor = (type: JobType) => {
  const colors: Record<JobType, string> = {
    'full-time': 'bg-teal-100 text-teal-700',
    'part-time': 'bg-blue-100 text-blue-700',
    contract: 'bg-orange-100 text-orange-700',
    internship: 'bg-purple-100 text-purple-700',
    remote: 'bg-green-100 text-green-700',
  };
  return colors[type];
};

export const JobListingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedType, setSelectedType] = useState<JobType | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | 'all'>('all');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLocation =
        !locationQuery ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesType = selectedType === 'all' || job.type === selectedType;
      const matchesLevel = selectedLevel === 'all' || job.experienceLevel === selectedLevel;

      return matchesSearch && matchesLocation && matchesType && matchesLevel;
    });
  }, [searchQuery, locationQuery, selectedType, selectedLevel]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Find Your <span className="text-accent">Dream Job</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80">
              Discover thousands of job opportunities from top companies
            </p>

            {/* Search Bar */}
            <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-xl bg-background/10 p-3 backdrop-blur-sm md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-background pl-10"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="City, state, or 'Remote'"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="border-0 bg-background pl-10"
                />
              </div>
              <Button variant="accent" size="lg" className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Search Jobs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filters:</span>
            </div>

            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as JobType | 'all')}>
              <SelectTrigger className="w-40">
                <Briefcase className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as ExperienceLevel | 'all')}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="ml-auto text-sm text-muted-foreground">
              {filteredJobs.length} jobs found
            </span>
          </div>

          {/* Job Cards */}
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group cursor-pointer shadow-card transition-all hover:shadow-card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                            <Building2 className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <Link
                              to={`/jobs/${job.id}`}
                              className="font-semibold text-foreground transition-colors group-hover:text-accent"
                            >
                              {job.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">{job.company.name}</p>
                          </div>
                        </div>

                        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {getTimeAgo(job.createdAt)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className={getJobTypeColor(job.type)}>
                            {job.type.replace('-', ' ')}
                          </Badge>
                          {job.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="font-normal">
                              +{job.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSaveJob(job.id);
                        }}
                        className={savedJobs.has(job.id) ? 'text-accent' : 'text-muted-foreground'}
                      >
                        <Bookmark
                          className="h-5 w-5"
                          fill={savedJobs.has(job.id) ? 'currentColor' : 'none'}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="py-16 text-center">
              <Briefcase className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default JobListingPage;
