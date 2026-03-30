import { Outlet } from 'react-router-dom'
import { JsonLdLocalBusiness } from '../components/seo/JsonLdLocalBusiness'
import { SeoHead } from '../components/seo/SeoHead'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import { WhatsAppFloat } from '../components/WhatsAppFloat'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <SeoHead />
      <JsonLdLocalBusiness />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
