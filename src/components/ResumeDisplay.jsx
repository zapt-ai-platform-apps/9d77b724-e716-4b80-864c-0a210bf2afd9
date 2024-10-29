import { createSignal } from 'solid-js';
import { resumeData } from '../stores/resumeStore';
import { useNavigate } from '@solidjs/router';
import ResumePreview from './ResumePreview';
import { saveAs } from 'file-saver';

function ResumeDisplay() {
  const navigate = useNavigate();

  if (!resumeData()) {
    navigate('/');
    return null;
  }

  const downloadResume = () => {
    try {
      const blob = new Blob([resumeData()], { type: "text/markdown;charset=utf-8" });
      saveAs(blob, "resume.md");
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-4xl font-bold text-purple-600 cursor-pointer">السيرة الذاتية المولدة</h1>
          <button
            class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate('/')}
          >
            رجوع
          </button>
        </div>
        <ResumePreview resumeData={resumeData()} />
        <button
          class="cursor-pointer mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={downloadResume}
        >
          تحميل السيرة الذاتية
        </button>
      </div>
    </div>
  );
}

export default ResumeDisplay;