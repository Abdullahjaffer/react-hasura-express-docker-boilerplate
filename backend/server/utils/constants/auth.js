export const AuthorizationHeader = "authorization";
export const AuthBearer = "Bearer";
export const XHasuraAdminSecret = "x-hasura-admin-secret";
export const XHasuraRole = "X-Hasura-Role";
export const XHasuraUserID = "X-Hasura-User-Id";
export const XHasuraAllowedRoles = "x-hasura-allowed-roles";
export const ContentType = "Content-type";
export const ContentTypeJson = "application/json";

export const HASURA_ROLE_ADMIN = "admin";
export const HASURA_ROLE_USER = "user";
export const HASURA_ROLE_ANONYMOUS = "public";
export const HASURA_ROLES = [
	HASURA_ROLE_ADMIN,
	HASURA_ROLE_USER,
	HASURA_ROLE_ANONYMOUS,
];

export const GQL_ROLE_ADMIN = HASURA_ROLE_ADMIN.toUpperCase();
export const GQL_ROLE_USER = HASURA_ROLE_USER.toUpperCase();
export const GQL_ROLE_ANONYMOUS = HASURA_ROLE_ANONYMOUS.toUpperCase();

export const STATUS_INACTIVE = "inactive";
export const STATUS_ACTIVE = "active";
export const STATUS_DISABLED = "disabled";
export const STATUS_DELETED = "deleted";

export const STATUSES = [
	STATUS_ACTIVE,
	STATUS_INACTIVE,
	STATUS_DISABLED,
	STATUS_DELETED,
];
