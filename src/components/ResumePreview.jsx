import { SolidMarkdown } from 'solid-markdown';

function ResumePreview(props) {
  return (
    <div class="bg-white p-4 rounded-lg shadow-md mt-8">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">السيرة الذاتية المولدة</h2>
      <SolidMarkdown children={props.resumeData} />
    </div>
  );
}

export default ResumePreview;