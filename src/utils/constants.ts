const ENV = "dev"

export const BASE_URL =
  ENV === "dev"
    ? "http://192.168.0.100:4000/api/v1"
    : "https://animania-server-production.up.railway.app/api/v1"
