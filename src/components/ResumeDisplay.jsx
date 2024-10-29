import { createSignal, onMount, Show } from 'solid-js';
import { resumeData } from '../stores/resumeStore';
import { useNavigate } from '@solidjs/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ResumeDisplay() {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);

  onMount(() => {
    if (!resumeData()) {
      navigate('/');
    }
  });

  const downloadPDF = async () => {
    if (loading()) return;
    setLoading(true);
    try {
      const resumeElement = document.getElementById('resume-preview');
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h1
            class="text-3xl font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            سيرتك الذاتية
          </h1>
          <div>
            <button
              class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 mr-2"
              onClick={() => navigate('/how-to-use')}
            >
              كيفية الاستخدام
            </button>
            <button
              class={`cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 mr-2 ${
                loading() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={downloadPDF}
              disabled={loading()}
            >
              {loading() ? 'جاري التنزيل...' : 'تنزيل PDF'}
            </button>
            <button
              class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate('/')}
            >
              رجوع
            </button>
          </div>
        </div>
        <div id="resume-preview" class="bg-white p-6 rounded-lg shadow-lg">
          <div class="text-center">
            <h2 class="text-4xl font-bold mb-2 text-gray-800">{resumeData()?.name || ''}</h2>
            <p class="text-gray-600">
              {resumeData()?.email || ''} | {resumeData()?.phone || ''} | {resumeData()?.address || ''}
            </p>
            <p class="text-gray-600">
              {resumeData()?.birthDate ? `تاريخ الميلاد: ${resumeData().birthDate}` : ''}
            </p>
          </div>
          <Show when={resumeData()?.summary}>
            <div class="mt-6 text-right">
              <h3 class="text-2xl font-semibold mb-2 text-purple-600">الملف الشخصي</h3>
              <p class="text-gray-700">{resumeData().summary}</p>
            </div>
          </Show>
          <Show when={resumeData()?.education}>
            <div class="mt-6 text-right">
              <h3 class="text-2xl font-semibold mb-2 text-purple-600">التعليم</h3>
              <p class="text-gray-700 whitespace-pre-wrap">{resumeData().education}</p>
            </div>
          </Show>
          <Show when={resumeData()?.experience}>
            <div class="mt-6 text-right">
              <h3 class="text-2xl font-semibold mb-2 text-purple-600">الخبرات العملية</h3>
              <p class="text-gray-700 whitespace-pre-wrap">{resumeData().experience}</p>
            </div>
          </Show>
          <Show when={resumeData()?.skills}>
            <div class="mt-6 text-right">
              <h3 class="text-2xl font-semibold mb-2 text-purple-600">المهارات</h3>
              <p class="text-gray-700">{resumeData().skills}</p>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default ResumeDisplay;