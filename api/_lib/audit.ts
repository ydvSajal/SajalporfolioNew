import { randomUUID } from "crypto";
import { ensurePostgresSchema, hasPostgresConfig, queryPg } from "./postgres.js";

type AuditParams = {
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
};

export const writeAuditLog = async ({
  actorEmail,
  action,
  resourceType,
  resourceId,
  metadata,
}: AuditParams) => {
  if (!hasPostgresConfig()) {
    return;
  }

  await ensurePostgresSchema();

  await queryPg(
    `
      INSERT INTO audit_logs (
        id, actor_email, action, resource_type, resource_id, metadata_json
      ) VALUES ($1, $2, $3, $4, $5, $6::jsonb)
    `,
    [randomUUID(), actorEmail, action, resourceType, resourceId ?? null, JSON.stringify(metadata ?? {})]
  );
};

type CountRow = { count: number | string };

export const getAuditSummary = async () => {
  if (!hasPostgresConfig()) {
    return {
      logins24h: 0,
      failedLogins24h: 0,
      writes24h: 0,
    };
  }

  await ensurePostgresSchema();

  const [logins, failures, writes] = await Promise.all([
    queryPg<CountRow>(
      `
        SELECT COUNT(*)::int AS count
        FROM audit_logs
        WHERE action = 'login_success'
          AND created_at >= NOW() - INTERVAL '24 hours'
      `
    ),
    queryPg<CountRow>(
      `
        SELECT COUNT(*)::int AS count
        FROM audit_logs
        WHERE action = 'login_failed'
          AND created_at >= NOW() - INTERVAL '24 hours'
      `
    ),
    queryPg<CountRow>(
      `
        SELECT COUNT(*)::int AS count
        FROM audit_logs
        WHERE action IN ('post_create', 'post_update', 'post_delete')
          AND created_at >= NOW() - INTERVAL '24 hours'
      `
    ),
  ]);

  return {
    logins24h: Number(logins.rows[0]?.count ?? 0),
    failedLogins24h: Number(failures.rows[0]?.count ?? 0),
    writes24h: Number(writes.rows[0]?.count ?? 0),
  };
};
