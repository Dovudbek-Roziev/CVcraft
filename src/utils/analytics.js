import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

let initialized = false;

export function initAnalytics() {
  if (!initialized && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    initialized = true;
  }
}

export function trackPageView(path) {
  if (!initialized) return;
  ReactGA.send({ hitType: 'pageview', page: path });
}

export function trackEvent(category, action, label = '') {
  if (!initialized) return;
  ReactGA.event({ category, action, label });
}

// Specific CV events
export function trackTemplateSelect(templateName) {
  trackEvent('Template', 'select', templateName);
}

export function trackPDFDownload(templateName) {
  trackEvent('PDF', 'download', templateName);
}

export function trackPremiumClick(source) {
  trackEvent('Premium', 'click', source);
}

export function trackCVComplete() {
  trackEvent('CV', 'complete');
}

export function trackAIUse(action) {
  trackEvent('AI', action);
}
