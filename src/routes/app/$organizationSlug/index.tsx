import { createFileRoute } from "@tanstack/react-router";
import { ProjectCard } from "./-components/project-card";
import type { Project } from "./-components/project-card";

export const Route = createFileRoute("/app/$organizationSlug/")({
  component: RouteComponent,
});

const projects: Array<Project> = [
  {
    status: "active",
    name: "Fintech Mobile App Redesign",
    description:
      "Complete overhaul of the user interface to improve accessibility and transaction speed.",
    progress: 20,
    deadline: "2025-03-15",
    priority: "high",
    taskStats: { total: 20, completed: 17 },
  },
  {
    status: "active",
    name: "E-commerce AI Integration",
    description:
      "Implementing a recommendation engine powered by machine learning to increase average order value.",
    progress: 45,
    deadline: "2025-04-10",
    priority: "high",
    taskStats: { total: 50, completed: 22 },
  },
  {
    status: "on-hold",
    name: "Legacy System Migration",
    description:
      "Transitioning monolithic on-premise servers to a microservices architecture on AWS.",
    progress: 10,
    deadline: "2025-06-30",
    priority: "medium",
    taskStats: { total: 100, completed: 10 },
  },
  {
    status: "completed",
    name: "Q1 Security Audit",
    description:
      "Comprehensive penetration testing and vulnerability assessment across all cloud infrastructure.",
    progress: 100,
    deadline: "2025-01-20",
    priority: "high",
    taskStats: { total: 15, completed: 15 },
  },
  {
    status: "active",
    name: "HR Employee Portal",
    description:
      "Developing a self-service portal for payroll, benefits enrollment, and time-off requests.",
    progress: 65,
    deadline: "2025-05-12",
    priority: "low",
    taskStats: { total: 30, completed: 19 },
  },
  {
    status: "active",
    name: "Supply Chain Dashboard",
    description:
      "Real-time logistics tracking and inventory management visualization for global warehouses.",
    progress: 30,
    deadline: "2025-07-05",
    priority: "medium",
    taskStats: { total: 40, completed: 12 },
  },
  {
    status: "active",
    name: "Customer Loyalty Program",
    description:
      "Building a points-based reward system with integrated mobile notifications.",
    progress: 80,
    deadline: "2025-02-28",
    priority: "high",
    taskStats: { total: 25, completed: 20 },
  },
  {
    status: "planning",
    name: "Brand Refresh 2025",
    description:
      "Redefining visual guidelines, including new logos, typography, and marketing assets.",
    progress: 5,
    deadline: "2025-09-15",
    priority: "medium",
    taskStats: { total: 12, completed: 0 },
  },
  {
    status: "active",
    name: "Internal Knowledge Base",
    description:
      "Migrating company documentation to a searchable, centralized Wiki platform.",
    progress: 50,
    deadline: "2025-03-20",
    priority: "low",
    taskStats: { total: 22, completed: 11 },
  },
  {
    status: "active",
    name: "Automated Billing System",
    description:
      "Standardizing invoicing processes for subscription-based corporate clients.",
    progress: 40,
    deadline: "2025-04-22",
    priority: "high",
    taskStats: { total: 18, completed: 7 },
  },
  {
    status: "on-hold",
    name: "VR Training Module",
    description:
      "Creating virtual reality simulations for hazardous material handling protocols.",
    progress: 15,
    deadline: "2025-11-01",
    priority: "low",
    taskStats: { total: 45, completed: 6 },
  },
  {
    status: "active",
    name: "Data Privacy Compliance",
    description:
      "Updating data handling protocols to ensure full compliance with GDPR and CCPA updates.",
    progress: 90,
    deadline: "2025-02-15",
    priority: "high",
    taskStats: { total: 35, completed: 31 },
  },
  {
    status: "active",
    name: "Social Media API Bot",
    description:
      "Automated content distribution tool for scheduling posts across multiple social platforms.",
    progress: 75,
    deadline: "2025-03-05",
    priority: "medium",
    taskStats: { total: 20, completed: 15 },
  },
  {
    status: "active",
    name: "Salesforce CRM Sync",
    description:
      "Integrating lead generation forms with internal CRM to automate sales funnels.",
    progress: 55,
    deadline: "2025-05-30",
    priority: "medium",
    taskStats: { total: 14, completed: 8 },
  },
  {
    status: "completed",
    name: "Mobile App Dark Mode",
    description:
      "Implementing system-wide dark theme support for iOS and Android applications.",
    progress: 100,
    deadline: "2025-01-10",
    priority: "low",
    taskStats: { total: 10, completed: 10 },
  },
  {
    status: "planning",
    name: "Smart Warehouse IoT",
    description:
      "Deploying sensor networks to track environmental conditions in temperature-sensitive zones.",
    progress: 0,
    deadline: "2025-10-10",
    priority: "high",
    taskStats: { total: 60, completed: 0 },
  },
  {
    status: "active",
    name: "Video Streaming Optimization",
    description:
      "Reducing latency for live-stream events through edge computing solutions.",
    progress: 35,
    deadline: "2025-08-15",
    priority: "high",
    taskStats: { total: 28, completed: 10 },
  },
  {
    status: "on-hold",
    name: "Chatbot NLP Upgrade",
    description:
      "Improving natural language processing capabilities for the customer support bot.",
    progress: 60,
    deadline: "2025-04-01",
    priority: "medium",
    taskStats: { total: 40, completed: 24 },
  },
  {
    status: "active",
    name: "SEO Content Engine",
    description:
      "Developing an automated pipeline for generating and updating SEO-optimized blog posts.",
    progress: 25,
    deadline: "2025-06-15",
    priority: "low",
    taskStats: { total: 20, completed: 5 },
  },
  {
    status: "active",
    name: "Cybersecurity Training",
    description:
      "Rolling out mandatory phishing awareness and security hygiene training for all staff.",
    progress: 95,
    deadline: "2025-02-01",
    priority: "high",
    taskStats: { total: 100, completed: 95 },
  },
];

function RouteComponent() {
  return (
    <div className="flex flex-col items-center min-h-[90dvh] w-full">
      <div className="grid container mx-auto px-4 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
