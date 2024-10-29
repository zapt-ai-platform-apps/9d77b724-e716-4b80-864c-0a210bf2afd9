import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';
import ResumeForm from './ResumeForm';
import { useNavigate } from '@solidjs/router';
import { setResumeData } from '../stores/resumeStore';

function ResumeGenerator() {
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const generateResume = async (formData) => {
    setLoading(true);
    try {
      const prompt = `Please generate a professional resume in markdown format based on the following information:\n\n${JSON.stringify(formData, null, 2)}`;

      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text'
      });
      setResumeData(result);
      navigate('/resume');
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600 cursor-pointer">مولد السيرة الذاتية</h1>
        </div>
        <ResumeForm onSubmit={generateResume} loading={loading()} />
      </div>
    </div>
  );
}

export default ResumeGenerator;