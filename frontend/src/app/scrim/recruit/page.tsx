import AppLayout from "@/components/layout/AppLayout";

export default function RecruitScrimPage() {
  return (
    <AppLayout>
      {/* Content specific to the RecruitScrimPage */}
      {/* Removed container, mx-auto, p-4 as AppLayout's content container handles this styling */}
      <h1 className="text-2xl font-bold mb-4">スクリムを募集する</h1> {/* Removed mt-4 as AppLayout's content container has mt-8 */}
      <p>このページでは、新しいスクリムを募集し、参加チームを募ることができます。</p>
      {/* TODO: Implement scrim recruitment form and management functionality */}
    </AppLayout>
  );
}
