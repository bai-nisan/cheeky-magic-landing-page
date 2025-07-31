import React from "react";
import { PlatformIcon } from "@/components/ui/icons";
import { Workflow, WorkflowContent } from "@/types/workflow";
import { TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataAnalysisPanelProps {
  selectedWorkflow: Workflow;
  workflowContent: WorkflowContent;
  showDataPanel: boolean;
  currentStep: number;
  showImprovedRecommendation: boolean;
  showInitialCharts?: boolean;
}

export function DataAnalysisPanel({
  selectedWorkflow,
  workflowContent,
  showDataPanel,
  currentStep,
  showImprovedRecommendation,
  showInitialCharts = false,
}: DataAnalysisPanelProps) {
  const [showScalabilityChart, setShowScalabilityChart] = React.useState(false);
  const [showChartSkeleton, setShowChartSkeleton] = React.useState(false);

  // Consistent color palette for charts
  const chartColors = {
    primary: "#3b82f6", // Blue - primary actions, main metrics
    success: "#10b981", // Green - positive performance, success states
    warning: "#f59e0b", // Amber - caution, expensive but viable
    danger: "#ef4444", // Red - problems, maxed out states
    neutral: "#6b7280", // Gray - neutral/inactive states
  };

  // Show chart skeleton and then actual chart when AI responds
  React.useEffect(() => {
    if (currentStep >= 5) {
      // Show skeleton first
      setShowChartSkeleton(true);

      // Then show actual chart after delay
      const timer = setTimeout(() => {
        setShowChartSkeleton(false);
        setShowScalabilityChart(true);
      }, 2000); // 2 second loading delay

      return () => clearTimeout(timer);
    } else {
      setShowScalabilityChart(false);
      setShowChartSkeleton(false);
    }
  }, [currentStep]);
  // Incremental CPA data for Demand Gen scaling
  const incrementalCPAData = [
    { budget: "Current", cpa: 58 },
    { budget: "+10%", cpa: 59 },
    { budget: "+25%", cpa: 61 },
    { budget: "+50%", cpa: 65 },
    { budget: "+60%", cpa: 68 },
  ];

  // 30-day historical CPA data (showing stability)
  const generateDailyData = () => {
    const data = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 30);

    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);

      // Generate CPA around $58 ± $4 (stable performance)
      const variation = (Math.random() - 0.5) * 8; // ±4 range
      const cpa = Math.round((58 + variation) * 100) / 100;

      data.push({
        date: currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        cpa: Math.max(54, Math.min(62, cpa)), // Keep within reasonable bounds
      });
    }
    return data;
  };

  const historicalCPAData = generateDailyData();

  // Impression Share data for scalability analysis
  const impressionShareData = [
    {
      campaign: "Demand Gen",
      impressionShare: 73,
      status: "scalable",
      cpa: 58,
      note: "Room to grow ✅",
      color: chartColors.success,
    },
    {
      campaign: "Brand+Product",
      impressionShare: 99.25,
      status: "maxed",
      cpa: 143,
      note: "Maxed out ⚠️",
      color: chartColors.danger,
    },
    {
      campaign: "Generic",
      impressionShare: 45,
      status: "expensive",
      cpa: 202,
      note: "Can scale but expensive",
      color: chartColors.warning,
    },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      // Check if this is impression share data (has campaign property)
      if (data.campaign) {
        return (
          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
            <p className="text-sm font-medium">{data.campaign}</p>
            <p className="text-sm text-primary">{`Impression Share: ${data.impressionShare}%`}</p>
            <p className="text-sm text-muted-foreground">{`CPA: $${data.cpa}`}</p>
            <p className="text-xs text-muted-foreground mt-1">{data.note}</p>
          </div>
        );
      }

      // For budget/date charts
      return (
        <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-primary">{`CPA: $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative bg-background">
      <div className="flex-1 p-4 space-y-6 overflow-y-auto min-h-0">
        {/* Campaign Scalability Analysis - Loading Skeleton */}
        {showChartSkeleton && (
          <Card className="animate-fade-up opacity-0 [--animation-delay:200ms]">
            <CardHeader>
              <CardTitle className="text-sm">
                Campaign Scalability Analysis
              </CardTitle>
              <CardDescription className="text-xs">
                Impression share levels showing which campaigns can handle more
                budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full space-y-3">
                {/* Chart skeleton */}
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
              {/* Status indicators skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </CardFooter>
          </Card>
        )}

        {/* Campaign Scalability Analysis - Actual Chart */}
        {showScalabilityChart && (
          <Card className="animate-fade-up opacity-0 [--animation-delay:200ms]">
            <CardHeader>
              <CardTitle className="text-sm">
                Campaign Scalability Analysis
              </CardTitle>
              <CardDescription className="text-xs">
                Impression share levels showing which campaigns can handle more
                budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={impressionShareData}
                    layout="vertical"
                    margin={{
                      top: 20,
                      right: 50,
                      left: 10,
                      bottom: 20,
                    }}
                  >
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis
                      type="category"
                      dataKey="campaign"
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="impressionShare" radius={[0, 4, 4, 0]}>
                      {impressionShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status indicators */}
              <div className="mt-4 space-y-2">
                {impressionShareData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.campaign}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {item.impressionShare}%
                      </span>
                      {item.status === "scalable" && (
                        <CheckCircle
                          className="w-3 h-3"
                          style={{ color: chartColors.success }}
                        />
                      )}
                      {item.status === "maxed" && (
                        <AlertTriangle
                          className="w-3 h-3"
                          style={{ color: chartColors.danger }}
                        />
                      )}
                      {item.status === "expensive" && (
                        <AlertTriangle
                          className="w-3 h-3"
                          style={{ color: chartColors.warning }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium text-xs">
                <span style={{ color: chartColors.success }}>
                  Demand Gen has room to scale
                </span>
                <CheckCircle
                  className="h-3 w-3"
                  style={{ color: chartColors.success }}
                />
              </div>
              <div className="text-muted-foreground leading-none text-xs">
                Brand+Product maxed out at 99.25% - additional budget won&apos;t
                help
              </div>
              <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded w-full">
                💡 Visual proof of scalability - Demand Gen can absorb +$1,200
                budget effectively
              </div>
            </CardFooter>
          </Card>
        )}

        {/* Incremental CPA Analysis */}
        {showInitialCharts && (
          <Card className="animate-fade-up opacity-0 [--animation-delay:200ms]">
            <CardHeader>
              <CardTitle className="text-sm">
                Incremental CPA Analysis
              </CardTitle>
              <CardDescription className="text-xs">
                Expected CPA at different budget levels for Demand Gen scaling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={incrementalCPAData}
                    margin={{
                      top: 20,
                      right: 40,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <XAxis
                      dataKey="budget"
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={["dataMin - 2", "dataMax + 2"]}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="cpa"
                      stroke={chartColors.primary}
                      strokeWidth={2}
                      dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: chartColors.primary,
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium text-xs">
                <span style={{ color: chartColors.success }}>
                  +21 conversions expected
                </span>
                <TrendingUp
                  className="h-3 w-3"
                  style={{ color: chartColors.success }}
                />
              </div>
              <div className="text-muted-foreground leading-none text-xs">
                Recommendation: +$1,200 budget (+60%) → $68 CPA (+17%)
              </div>
              <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded w-full">
                💡 CPA increase is reasonable and maintains profitability while
                scaling the highest-intent campaign.
              </div>
            </CardFooter>
          </Card>
        )}

        {/* 30-Day Performance Trend */}
        {showInitialCharts && (
          <Card className="animate-fade-up opacity-0 [--animation-delay:400ms]">
            <CardHeader>
              <CardTitle className="text-sm">
                30-Day Performance Trend
              </CardTitle>
              <CardDescription className="text-xs">
                Daily CPA stability for Demand Gen campaign - last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalCPAData}
                    margin={{
                      top: 20,
                      right: 40,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      domain={[52, 64]}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="cpa"
                      stroke={chartColors.success}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        r: 4,
                        stroke: chartColors.success,
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium text-xs">
                <span style={{ color: chartColors.success }}>
                  Stable performance
                </span>
                <TrendingUp
                  className="h-3 w-3"
                  style={{ color: chartColors.success }}
                />
              </div>
              <div className="text-muted-foreground leading-none text-xs">
                Average CPA: $58.2 ± $2.8 (consistent within target range)
              </div>
              <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded w-full">
                💡 Performance is predictable, not volatile - safe to scale with
                confidence
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
