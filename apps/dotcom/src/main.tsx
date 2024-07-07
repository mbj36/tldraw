import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import '../sentry.client.config'
import '../styles/core.css'
import '../styles/globals.css'
import '../styles/tla.css'
import { TlaAppStateBoundary } from './components-tla/TlaAppStateBoundary'
import { Head } from './components/Head/Head'
import { router } from './routes'

const browserRouter = createBrowserRouter(router)

createRoot(document.getElementById('root')!).render(
	<HelmetProvider>
		<Head />
		<TlaAppStateBoundary>
			<RouterProvider router={browserRouter} />
		</TlaAppStateBoundary>
		<VercelAnalytics debug={false} />
	</HelmetProvider>
)

try {
	// we have a dummy service worker that unregisters itself immediately
	// this was needed to remove the service worker we used to have from the cache
	// we can remove this if we ever need a service worker again, or if enough time passes that
	// anybody returning to tldraw.com should not have a service worker running
	navigator.serviceWorker.register('/sw.js', {
		scope: '/',
	})
} catch (e) {
	// ignore
}
