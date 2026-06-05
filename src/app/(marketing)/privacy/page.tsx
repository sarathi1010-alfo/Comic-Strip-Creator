export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-5xl font-bangers text-primary tracking-wider mb-8">Privacy Policy</h1>
      <div className="prose prose-invert lg:prose-lg font-sans">
        <p>Your privacy is important to us. Because Comic Strip Creator runs entirely in your browser (client-side), we do not store or collect the comics you create on our servers.</p>
        <h2 className="text-2xl font-bangers mt-8 mb-4">Data Storage</h2>
        <p>All comic data is stored locally in your browser using local storage or IndexedDB. If you clear your browser data, your saved projects will be lost unless you have exported them.</p>
      </div>
    </div>
  );
}
