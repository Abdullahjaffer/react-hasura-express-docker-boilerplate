
alter table "public"."projects" drop constraint "name length";
alter table "public"."projects" add constraint "name length" check (CHECK (length(name) = 60));

alter table "public"."projects" drop constraint "description length";

alter table "public"."users" drop constraint "Email check";
alter table "public"."users" add constraint "Email Verify" check (CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text));

alter table "public"."users" drop constraint "Email Verify";
alter table "public"."users" add constraint "Email Verify" check (CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text));

alter table "public"."users" drop constraint "Email Verify";

DROP TABLE "public"."projects";
