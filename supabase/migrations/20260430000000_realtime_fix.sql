-- expor todas as colunas para filtros por coluna não-PK no realtime (DELETE events)
alter table items replica identity full;

-- garantir que a tabela está na publicação do realtime
alter publication supabase_realtime add table items;
