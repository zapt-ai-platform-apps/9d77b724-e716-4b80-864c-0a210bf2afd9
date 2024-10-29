import { createSignal } from 'solid-js';

function ResumeForm(props) {
  const [formData, setFormData] = createSignal({
    name: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
  });

  const handleNext = (e) => {
    e.preventDefault();
    props.onNext(formData());
  };

  return (
    <form onSubmit={handleNext} class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold mb-4 text-purple-600">المعلومات الأساسية</h2>
        <input
          type="text"
          placeholder="الاسم"
          value={formData().name}
          onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
          class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
          required
        />
        <input
          type="date"
          placeholder="تاريخ الازدياد"
          value={formData().birthDate}
          onInput={(e) => setFormData({ ...formData(), birthDate: e.target.value })}
          class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={formData().email}
          onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
          class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
          required
        />
        <input
          type="text"
          placeholder="رقم الهاتف"
          value={formData().phone}
          onInput={(e) => setFormData({ ...formData(), phone: e.target.value })}
          class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
        />
        <input
          type="text"
          placeholder="العنوان"
          value={formData().address}
          onInput={(e) => setFormData({ ...formData(), address: e.target.value })}
          class="box-border w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
        />
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