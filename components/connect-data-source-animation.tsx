import { Icons } from "@/components/icons";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";

export function ConnectDataSourceAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Top and bottom gradient overlays for visual effect */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

      {/* Central Cheeky logo */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 size-16 bg-secondary p-2 rounded-full z-30 md:bottom-0 md:top-auto">
        <Icons.logo className="size-10" />
      </div>

      {/* Orbiting circles container */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          {/* Inner orbit - Main marketing platforms */}
          <OrbitingCircles iconSize={50} radius={100} reverse speed={1}>
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.meta className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.google className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.shopify className="w-6 h-6" />
            </div>
          </OrbitingCircles>

          {/* Middle orbit - Additional platforms */}
          <OrbitingCircles iconSize={45} speed={0.5} radius={160}>
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.linkedin className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.tiktok className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.hubspot className="w-5 h-5" />
            </div>
          </OrbitingCircles>

          {/* Outer orbit - Supporting tools */}
          <OrbitingCircles iconSize={40} radius={220} reverse speed={0.3}>
            <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.mailchimp className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md border border-gray-200">
              <Icons.analytics className="w-4 h-4" />
            </div>
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}
