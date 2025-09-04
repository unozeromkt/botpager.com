// src/app/form/page.tsx

export default function FormPage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://form.jotform.com/252457291198668"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Formulario de Contacto"
      ></iframe>
    </div>
  );
}
