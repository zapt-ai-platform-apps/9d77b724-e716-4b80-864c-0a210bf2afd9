import { useNavigate } from '@solidjs/router';

function HowToUse() {
  const navigate = useNavigate();

  return (
    <div class="h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-4">
          <h1
            class="text-3xl font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            كيفية الاستخدام
          </h1>
          <button
            class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate(-1)}
          >
            رجوع
          </button>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-4 text-purple-600">خطوات الاستخدام</h2>
          <ol class="list-decimal list-inside text-gray-800 space-y-2">
            <li>
              <strong>البدء:</strong> افتح التطبيق وستظهر لك الصفحة الرئيسية التي تحتوي على نموذج لإدخال معلوماتك.
            </li>
            <li>
              <strong>إدخال المعلومات الأساسية:</strong> قم بإدخال اسمك، تاريخ الازدياد، البريد الإلكتروني، رقم الهاتف، والعنوان.
            </li>
            <li>
              <strong>الملخص الشخصي:</strong> اكتب نبذة مختصرة عن نفسك لتعطي انطباعًا أوليًا قويًا.
            </li>
            <li>
              <strong>التعليم والخبرات:</strong> أدخل تفاصيل تعليمك وخبراتك العملية السابقة.
            </li>
            <li>
              <strong>المهارات:</strong> أضف مهاراتك الأساسية التي تميزك.
            </li>
            <li>
              <strong>توليد السيرة الذاتية:</strong> بعد إكمال جميع الخطوات، اضغط على زر "توليد السيرة الذاتية".
            </li>
            <li>
              <strong>معاينة وتنزيل:</strong> ستُعرض عليك السيرة الذاتية التي تم توليدها. يمكنك معاينتها والتأكد من صحة المعلومات.
            </li>
            <li>
              <strong>تنزيل PDF:</strong> إذا كنت راضيًا عن السيرة الذاتية، يمكنك تنزيلها بصيغة PDF للاستخدام الشخصي.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;