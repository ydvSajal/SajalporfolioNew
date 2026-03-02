export const setNoStore = (res: any) => {
  res.setHeader("Cache-Control", "no-store");
};

export const sendJson = (res: any, status: number, payload: unknown) => {
  setNoStore(res);
  return res.status(status).json(payload);
};

export const ensureMethod = (req: any, res: any, methods: string[]) => {
  if (!methods.includes(req.method)) {
    res.setHeader("Allow", methods);
    sendJson(res, 405, { error: "Method not allowed" });
    return false;
  }
  return true;
};

export const parseBody = <T>(req: any): T => {
  if (!req.body) {
    return {} as T;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body) as T;
  }

  return req.body as T;
};

export const readCookie = (req: any, key: string): string | null => {
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader) {
    return null;
  }

  const values = cookieHeader.split(";").map((entry: string) => entry.trim());
  const found = values.find((entry: string) => entry.startsWith(`${key}=`));
  if (!found) {
    return null;
  }

  return decodeURIComponent(found.slice(key.length + 1));
};

export const getRequestIp = (req: any): string => {
  const forwarded = req.headers["x-forwarded-for"];
  if (Array.isArray(forwarded)) {
    return forwarded[0] ?? "unknown";
  }
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return req.socket?.remoteAddress ?? "unknown";
};
