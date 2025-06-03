import AppLayout from "@/components/layout/AppLayout";

export default function FindScrimPage() {
  return (
    <AppLayout>
      {/* Content specific to the FindScrimPage */}
      {/* Removed container, mx-auto, p-4 as AppLayout's content container handles this styling */}
      <h1 className="text-2xl font-bold mb-4">スクリムを探す</h1> {/* Removed mt-4 as AppLayout's content container has mt-8 */}
      <p>このページでは、参加可能なスクリムを検索し、詳細を確認できます。</p>
      {/* TODO: Implement scrim searching and listing functionality */}
    </AppLayout>
  );
}
