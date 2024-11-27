// Component Imports
import BlankLayout from '@/base/@layouts/BlankLayout'
import NotFound from '@/shared/components/NotFound'
import Providers from '@components/Providers'

// Util Imports
import { getSystemMode, getServerMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()
  const mode = getServerMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
