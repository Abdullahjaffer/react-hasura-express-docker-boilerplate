alter table "public"."boards"
  add constraint "boards_project_id_fkey"
  foreign key ("project_id")
  references "public"."projects"
  ("id") on update restrict on delete restrict;
