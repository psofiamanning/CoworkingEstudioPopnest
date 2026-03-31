import { Outlet } from 'react-router-dom'
import { CookieConsentProvider } from '../components/CookieConsent'
import { JsonLdLocalBusiness } from '../components/seo/JsonLdLocalBusiness'
import { SeoHead } from '../components/seo/SeoHead'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import { WhatsAppFloat } from '../components/WhatsAppFloat'

export function MainLayout() {
  return (
    <CookieConsentProvider>
      <div
        className="min-h-screen bg-[#fbfbfc] bg-[radial-gradient(ellipse_at_top,_rgba(183,61,55,0.10),_transparent_55%)] bg-no-repeat"
      >
        <SeoHead />
        <JsonLdLocalBusiness />
        <SiteHeader />
        <Outlet />
        <SiteFooter />
        <WhatsAppFloat />
      </div>
    </CookieConsentProvider>
  )
}
