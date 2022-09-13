
CREATE TABLE "public"."projects" ("name" text NOT NULL, "description" text NOT NULL, "isPrivate" boolean NOT NULL DEFAULT true, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "owner" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, CONSTRAINT "name length" CHECK (length(name) = 60), CONSTRAINT "description length" CHECK (length(description) = 700));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_projects_updated_at"
BEFORE UPDATE ON "public"."projects"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_projects_updated_at" ON "public"."projects" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."users" add constraint "Email Verify" check (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

alter table "public"."users" drop constraint "Email Verify";
alter table "public"."users" add constraint "Email Verify" check (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text);

alter table "public"."users" drop constraint "Email Verify";
alter table "public"."users" add constraint "Email check" check (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text);

alter table "public"."projects" drop constraint "description length";
alter table "public"."projects" add constraint "description length" check ((length(description) < 700) and (length(description) > 0));

alter table "public"."projects" drop constraint "name length";
alter table "public"."projects" add constraint "name length" check ((length(name) < 60) and (length(name) > 0));
