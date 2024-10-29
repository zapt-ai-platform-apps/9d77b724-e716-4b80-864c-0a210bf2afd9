import { createSignal } from 'solid-js';

function ResumeForm(props) {
  const [formData, setFormData] = createSignal({
    name: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleNext = (e) => {
    e.preventDefault();
    props.onNext(formData());
  };

  return (
    <form onSubmit={handleNext} class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4 text-purple-600">المعلومات الأساسية</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">الاسم</label>
          <input
            type="text"
            value={formData().name}
            onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">تاريخ الازدياد</label>
          <input
            type="date"
            value={formData().birthDate}
            onInput={(e) => setFormData({ ...formData(), birthDate: e.target.value })}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={formData().email}
            onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">رقم الهاتف</label>
          <input
            type="text"
            value={formData().phone}
            onInput={(e) => setFormData({ ...formData(), phone: e.target.value })}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">العنوان</label>
          <input
            type="text"
            value={formData().address}
            onInput={(e) => setFormData({ ...formData(), address: e.target.value })}
            class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
          />
        </div>
      </div>
      <button
        type="submit"
        class={`cursor-pointer flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${
          props.loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={props.loading}
      >
        التالي
      </button>
    </form>
  );
}

export default ResumeForm;