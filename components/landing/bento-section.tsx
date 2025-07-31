"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ConnectDataSourceAnimation } from "@/components/connect-data-source-animation";
import { AIDataFlowAnimation } from "@/components/ai-data-flow-animation";

// Strategic features configuration
const bentoSection = {
  title: "The Marketing Platform That Actually Gets You",
  description:
    "From universal integrations to AI-generated dashboards, built for marketers who demand more than just another analytics tool.",
  items: [
    {
      id: 1,
      content: <ConnectDataSourceAnimation />,
      title: "Connect Every Data Source",
      description:
        "Integrate Meta Ads, Google Ads, Shopify, anything. See your entire marketing ecosystem in one place.",
    },
    {
      id: 2,
      content: (
        <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg">AI Dashboards</h4>
          </div>
        </div>
      ),
      title: "Build Dashboards by Typing",
      description:
        "Just say what you need: 'ROAS by geography with creative performance' and watch the dashboard appear in seconds.",
    },
    {
      id: 3,
      content: <AIDataFlowAnimation />,
      title: "AI That Knows What You Need",
      description:
        "We handle the complex context engineering. You get perfectly timed insights without the technical complexity.",
    },
    {
      id: 4,
      content: (
        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-lg">Elite Workflows</h4>
          </div>
        </div>
      ),
      title: "Pro-Level Workflows, Pre-built",
      description:
        "Launch strategies refined by marketers managing millions in ad spend. Expertise encoded directly into the platform.",
    },
  ],
};

export function BentoSection() {
  const { title, description, items } = bentoSection;

  return (
    <section
      id="bento"
      className="flex flex-col items-center justify-center w-full relative px-5 md:px-10"
    >
      <div className="border-x mx-5 md:mx-10 relative max-w-4xl">
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-primary/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>

        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1">
            {title}
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium">
            {description}
          </p>
        </SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start justify-end min-h-[600px] md:min-h-[500px] p-0.5 relative before:absolute before:-left-0.5 before:top-0 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] group cursor-pointer max-h-[400px] group"
            >
              <div className="relative flex size-full items-center justify-center h-full overflow-hidden">
                {item.content}
              </div>
              <div className="flex-1 flex-col gap-2 p-6">
                <h3 className="text-base tracking-tighter font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
