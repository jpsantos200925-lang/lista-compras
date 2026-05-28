-- Tabela de listas personalizáveis
create table if not exists lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  primary_color text not null default '#22c55e',
  secondary_color text not null default '#16a34a',
  bg_color text not null default '#0f0f0f',
  logo_url text,
  created_at timestamptz not null default now()
);

create index if not exists lists_user_id_idx on lists(user_id);
create index if not exists lists_slug_idx on lists(slug);

alter table lists enable row level security;

create policy "Usuário vê apenas suas listas"
  on lists for select to authenticated
  using (user_id = auth.uid());

create policy "Usuário cria suas listas"
  on lists for insert to authenticated
  with check (user_id = auth.uid());

create policy "Usuário edita suas listas"
  on lists for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Usuário deleta suas listas"
  on lists for delete to authenticated
  using (user_id = auth.uid());

-- Adicionar list_id na tabela items
alter table items add column if not exists list_id uuid references lists(id) on delete cascade;

create index if not exists items_list_id_idx on items(list_id);

-- Bucket para logos (criado via migration não é suportado pelo Supabase local,
-- então apenas documentamos aqui que precisa ser criado manualmente: bucket "list-logos" público)
