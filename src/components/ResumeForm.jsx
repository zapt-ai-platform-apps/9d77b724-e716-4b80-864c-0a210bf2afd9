import { createSignal } from 'solid-js';

function ResumeForm(props) {
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: '',
    experience: '',
    skills: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData());
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <input
        type="text"
        placeholder="الاسم"
        value={formData().name}
        onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        required
      />
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={formData().email}
        onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        required
      />
      <input
        type="text"
        placeholder="رقم الهاتف"
        value={formData().phone}
        onInput={(e) => setFormData({ ...formData(), phone: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      />
      <input
        type="text"
        placeholder="العنوان"
        value={formData().address}
        onInput={(e) => setFormData({ ...formData(), address: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      />
      <textarea
        placeholder="ملخص"
        value={formData().summary}
        onInput={(e) => setFormData({ ...formData(), summary: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      ></textarea>
      <textarea
        placeholder="التعليم"
        value={formData().education}
        onInput={(e) => setFormData({ ...formData(), education: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      ></textarea>
      <textarea
        placeholder="الخبرات العملية"
        value={formData().experience}
        onInput={(e) => setFormData({ ...formData(), experience: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      ></textarea>
      <textarea
        placeholder="المهارات"
        value={formData().skills}
        onInput={(e) => setFormData({ ...formData(), skills: e.target.value })}
        class="box-border w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      ></textarea>
      <button
        type="submit"
        class={`cursor-pointer flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ${props.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={props.loading}
      >
        {props.loading ? 'جاري التحميل...' : 'توليد السيرة الذاتية'}
      </button>
    </form>
  );
}

export default ResumeForm;