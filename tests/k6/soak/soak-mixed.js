import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "5m", target: 50 },
    { duration: "30m", target: 50 },
    { duration: "5m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/login`);

  check(res, {
    "status é 200": (r) => r.status === 200,
    "body contém 'login'": (r) => r.body.includes("login"),
  });

  sleep(1);
}
