import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';
import { setResumeData } from '../stores/resumeStore';
import ResumeForm from './ResumeForm';

function ResumeGenerator() {
  const [loading, setLoading] = createSignal(false);
  const [step, setStep] = createSignal(1);
  const [formData, setFormData] = createSignal({});
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData({ ...formData(), ...data });
    if (step() < 3) {
      setStep(step() + 1);
    } else {
      generateResume();
    }
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      const prompt = `رجاء قم بإنشاء سيرة ذاتية احترافية باللغة العربية استنادًا إلى المعلومات التالية وأعدها بتنسيق JSON:

المعلومات:

${JSON.stringify(formData(), null, 2)}

يرجى استخدام هذا التنسيق للرد:
{
  "name": "",
  "contactInfo": "",
  "summary": "",
  "education": "",
  "experience": "",
  "skills": ""
}
`;

      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json',
      });

      if (result) {
        setResumeData(result);
        navigate('/resume');
      } else {
        console.error('No result received from AI');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="max-w-4xl mx-auto h-full">
        <div class="flex justify-between items-center mb-8">
          <h1
            class="text-3xl font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            منشئ السيرة الذاتية الاحترافية
          </h1>
          <button
            class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate('/how-to-use')}
          >
            كيفية الاستخدام
          </button>
        </div>
        <Show when={step() === 1}>
          <ResumeForm onNext={handleNext} loading={loading()} />
        </Show>
        <Show when={step() === 2}>
          <form class="space-y-6">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">الملخص الشخصي</h2>
            <textarea
              placeholder="اكتب نبذة مختصرة عن نفسك"
              value={formData().summary}
              onInput={(e) =>
                setFormData({ ...formData(), summary: e.target.value })
              }
              class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              rows="4"
            ></textarea>
            <div class="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(step() - 1)}
                class="cursor-pointer flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                رجوع
              </button>
              <button
                type="button"
                onClick={() => handleNext({})}
                class={`cursor-pointer flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading()}
              >
                التالي
              </button>
            </div>
          </form>
        </Show>
        <Show when={step() === 3}>
          <form class="space-y-6">
            <h2 class="text-2xl font-bold mb-4 text-purple-600">المعلومات الإضافية</h2>
            <textarea
              placeholder="التعليم"
              value={formData().education}
              onInput={(e) =>
                setFormData({ ...formData(), education: e.target.value })
              }
              class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              rows="3"
            ></textarea>
            <textarea
              placeholder="الخبرات العملية"
              value={formData().experience}
              onInput={(e) =>
                setFormData({ ...formData(), experience: e.target.value })
              }
              class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              rows="3"
            ></textarea>
            <textarea
              placeholder="المهارات"
              value={formData().skills}
              onInput={(e) =>
                setFormData({ ...formData(), skills: e.target.value })
              }
              class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              rows="3"
            ></textarea>
            <div class="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(step() - 1)}
                class="cursor-pointer flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                رجوع
              </button>
              <button
                type="button"
                onClick={() => handleNext({})}
                class={`cursor-pointer flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading()}
              >
                توليد السيرة الذاتية
              </button>
            </div>
          </form>
        </Show>
      </div>
    </div>
  );
}

export default ResumeGenerator;