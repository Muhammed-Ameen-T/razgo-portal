/**
 * Employer Dashboard Page
 * Overview and job management for employers
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Briefcase,
  Eye,
  FileText,
  Plus,
  TrendingUp,
  Users,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Pause,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Job, JobStatus } from '@/types';

// Mock employer job data
const EMPLOYER_JOBS: (Job & { views: number })[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: {
      id: '1',
      name: 'My Company',
      industry: 'Technology',
      size: '50-200',
      location: 'San Francisco, CA',
    },
    location: 'San Francisco, CA',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 150000, max: 200000, currency: 'USD' },
    description: 'We are looking for a Senior Frontend Developer...',
    requirements: ['5+ years React experience'],
    benefits: ['Health Insurance', '401k'],
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'active',
    applicationsCount: 45,
    views: 892,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Product Designer',
    company: {
      id: '1',
      name: 'My Company',
      industry: 'Technology',
      size: '50-200',
      location: 'San Francisco, CA',
    },
    location: 'Remote',
    type: 'remote',
    experienceLevel: 'mid',
    salary: { min: 100000, max: 140000, currency: 'USD' },
    description: 'Looking for a talented Product Designer...',
    requirements: ['3+ years design experience'],
    benefits: ['Remote Work', 'Flexible Hours'],
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    status: 'active',
    applicationsCount: 32,
    views: 567,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: {
      id: '1',
      name: 'My Company',
      industry: 'Technology',
      size: '50-200',
      location: 'San Francisco, CA',
    },
    location: 'New York, NY',
    type: 'full-time',
    experienceLevel: 'senior',
    salary: { min: 140000, max: 180000, currency: 'USD' },
    description: 'Backend engineer needed for our platform...',
    requirements: ['5+ years backend experience'],
    benefits: ['Health Insurance', 'Stock Options'],
    skills: ['Python', 'PostgreSQL', 'AWS'],
    status: 'paused',
    applicationsCount: 18,
    views: 234,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DASHBOARD_STATS = [
  {
    label: 'Active Jobs',
    value: '3',
    change: '+1 this week',
    icon: Briefcase,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    label: 'Total Applications',
    value: '95',
    change: '+12 this week',
    icon: FileText,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    label: 'Job Views',
    value: '1,693',
    change: '+23% vs last week',
    icon: Eye,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Interviews Scheduled',
    value: '8',
    change: '3 this week',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

const getStatusColor = (status: JobStatus) => {
  const colors: Record<JobStatus, string> = {
    active: 'bg-green-100 text-green-700',
    paused: 'bg-yellow-100 text-yellow-700',
    closed: 'bg-gray-100 text-gray-700',
    draft: 'bg-blue-100 text-blue-700',
  };
  return colors[status];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const EmployerDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here's what's happening with your job postings
            </p>
          </div>
          <Button variant="accent" size="lg" asChild>
            <Link to="/employer/post-job">
              <Plus className="mr-2 h-5 w-5" />
              Post a New Job
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 flex items-center text-xs text-muted-foreground">
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Job Postings</CardTitle>
                  <CardDescription>
                    Manage and track all your active and past job listings
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/employer/jobs">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Applications</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EMPLOYER_JOBS.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <Link
                            to={`/employer/jobs/${job.id}`}
                            className="font-medium text-foreground hover:text-accent"
                          >
                            {job.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">{job.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {job.applicationsCount}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          {job.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {formatDate(job.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Applicants
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Job
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              {job.status === 'paused' ? 'Resume' : 'Pause'} Job
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { text: 'New application for Senior Frontend Developer', time: '2 hours ago', icon: FileText },
                  { text: '5 people viewed Product Designer position', time: '4 hours ago', icon: Eye },
                  { text: 'Interview scheduled with John Smith', time: '1 day ago', icon: Users },
                  { text: 'New application for Product Designer', time: '1 day ago', icon: FileText },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="rounded-full bg-accent/10 p-2">
                      <activity.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default EmployerDashboard;
