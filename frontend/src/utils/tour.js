import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const startTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        element: '#tour-logo', 
        popover: { 
            title: 'Welcome to MediSync', 
          description: 'Your advanced clinical documentation and intelligence portal.',
          side: "left",
          align: 'start'
        } 
      },
      { 
        element: '#tour-nav', 
        popover: { 
          title: 'Navigation', 
          description: 'Quickly access dashboard, patients records, and clinical workflows.',
          side: "right",
          align: 'start'
        } 
      },
      { 
        element: '#tour-ai-status', 
        popover: { 
          title: 'AI Connectivity', 
          description: 'Monitor real-time AI analysis status and secure connection health.',
          side: "bottom",
          align: 'start'
        } 
      },
      { 
        element: '#tour-stats', 
        popover: { 
          title: 'Performance Metrics', 
          description: 'Track active cases, critical alerts, and clinician performance scores at a glance.',
          side: "bottom",
          align: 'start'
        } 
      },
      { 
        element: '#tour-search', 
        popover: { 
          title: 'Global Search', 
          description: 'Instantly find any record, patient, or incident across the entire system.',
          side: "bottom",
          align: 'start'
        } 
      },
      { 
        element: '#tour-chat-trigger', 
        popover: { 
          title: 'AI Clinical Assistant', 
          description: 'Need help? Ask our AI for risk analysis, protocol guidance, or report summaries.',
          side: "left",
          align: 'start'
        } 
      },
    ],
  });

  driverObj.drive();
};

