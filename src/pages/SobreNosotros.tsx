import { JsonLd } from '../components/seo/JsonLd'
import { buildBreadcrumb } from '../lib/schema'

const OFFER: readonly string[] = [
  'Oficinas privadas, por día o con contrato anual.',
  'Pase de coworking por día ($300 MXN) y salas de juntas.',
  'Clases de Pilates mat, yoga, Tai Chi, Sound Healing, Belly Dance y Stretching en grupos reducidos.',
  'Cafetería, áreas comunes y un Run Club gratuito.',
]

export function SobreNosotros() {
  return (
    <main className="bg-[#fbfbfc] pb-20">
      <JsonLd data={buildBreadcrumb([{ name: 'Inicio', path: '/' }, { name: 'Sobre nosotros', path: '/sobre-nosotros' }])} />
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <h1 className="font-heading text-[30px] font-bold leading-[1.4] text-[#1f2937] md:text-4xl">
          Sobre Estudio Popnest
        </h1>
        <div className="mt-10 space-y-6 font-body leading-relaxed text-body">
          <p>
            Estudio Popnest es un espacio de oficinas y bienestar en la colonia Del Carmen,
            Coyoacán, Ciudad de México, a unos pasos del Museo Frida Kahlo. Antes se conocía como
            Popnest Wellness.
          </p>
          <h2 className="font-heading text-2xl font-bold text-[#1f2937]">Qué ofrecemos</h2>
          <ul className="list-disc space-y-2 pl-6">
            {OFFER.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="font-heading text-2xl font-bold text-[#1f2937]">Dónde estamos</h2>
          <p>
            Londres 105, Col. Del Carmen, Coyoacán, 04100, Ciudad de México. Horario: lunes a
            viernes de 9:00 a 19:00 y sábados de 9:00 a 17:00. Teléfono y WhatsApp: +52 55 5437
            9644.
          </p>
          <h2 className="font-heading text-2xl font-bold text-[#1f2937]">Pet friendly</h2>
          <p>
            Somos un espacio pet friendly: tu perro es bienvenido en las áreas de oficinas y
            coworking.
          </p>
        </div>
      </div>
    </main>
  )
}
