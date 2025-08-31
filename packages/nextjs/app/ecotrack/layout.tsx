"use client";

export default function EcoTrackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow p-4" data-theme="exampleUi">
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        {children}
      </div>
    </div>
  );
}
