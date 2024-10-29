import { SolidMarkdown } from 'solid-markdown';

function ResumePreview(props) {
  return (
    <div class="bg-white p-4 rounded-lg shadow-md mt-8">
      <SolidMarkdown children={props.resumeData} />
    </div>
  );
}

export default ResumePreview;