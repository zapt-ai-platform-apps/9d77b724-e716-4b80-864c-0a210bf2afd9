import { createSignal, Show } from 'solid-js';
import { supabase, createEvent } from '../supabaseClient';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import { saveAs } from 'file-saver';

function ResumeGenerator(props) {
  const [loading, setLoading] = createSignal(false);
  const [resumeData, setResumeData] = createSignal(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const generateResume = async (formData) => {
    setLoading(true);
    try {
      const prompt = `Please generate a professional resume in markdown format based on the following information:\n\n${JSON.stringify(formData, null, 2)}`;

      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text'
      });
      setResumeData(result);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = async () => {
    if (!resumeData()) return;

    try {
      const blob = new Blob([resumeData()], { type: "text/markdown;charset=utf-8" });
      saveAs(blob, "resume.md");
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600 cursor-pointer">مولد السيرة الذاتية</h1>
          <button
            class="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleSignOut}
          >
            تسجيل الخروج
          </button>
        </div>
        <ResumeForm onSubmit={generateResume} loading={loading()} />
        <Show when={resumeData()}>
          <ResumePreview resumeData={resumeData()} />
          <button
            class="cursor-pointer mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={downloadResume}
          >
            تحميل السيرة الذاتية
          </button>
        </Show>
      </div>
    </div>
  );
}

export default ResumeGenerator;