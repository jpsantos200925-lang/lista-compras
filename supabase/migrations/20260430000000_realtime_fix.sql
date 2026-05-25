-- expor todas as colunas para filtros por coluna não-PK no realtime (DELETE events)
alter table items replica identity full;

-- adicionar à publicação somente se ainda não estiver
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'items'
  ) then
    alter publication supabase_realtime add table items;
  end if;
end $$;
