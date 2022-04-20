import { Metric } from "web-vitals";

function reportHandler(metric: Metric) {
  const payload = JSON.stringify(metric);
  navigator.sendBeacon("/analytics", payload);
}

export default reportHandler;
