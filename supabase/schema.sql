create extension if not exists pgcrypto;
create extension if not exists citext;

create type vertical_type as enum (
  'ai_tool',
  'vpn',
  'photo_video',
  'cloud_storage',
  'language_learning',
  'other'
);

create type reminder_status as enum (
  'yes',
  'no',
  'unknown'
);

create type refund_status as enum (
  'yes',
  'no',
  'pending',
  'not_requested'
);

create type event_status as enum (
  'new',
  'needs_more_evidence',
  'validated_low',
  'validated_medium',
  'validated_high',
  'rejected',
  'bounty_approved',
  'paid',
  'included_in_report',
  'lead_opt_in'
);

create type evidence_file_type as enum (
  'trial_proof',
  'payment_proof',
  'other'
);

create type redaction_status as enum (
  'pending_review',
  'no_sensitive_data',
  'redacted',
  'rejected_sensitive_data'
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  country text not null,
  consent_version text not null default 'v1.0',
  research_consent boolean not null default false,
  sensitive_data_confirmation boolean not null default false,
  marketing_opt_in boolean not null default false,
  lead_opt_in boolean not null default false,
  created_at timestamptz not null default now(),

  constraint users_research_consent_required check (research_consent = true),
  constraint users_sensitive_confirmation_required check (sensitive_data_confirmation = true)
);

create unique index users_email_unique_idx
on users (lower(email::text));

create table merchants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  vertical vertical_type not null,
  country_primary text,
  created_at timestamptz not null default now()
);

create unique index merchants_name_url_unique_idx
on merchants (lower(name), lower(url));

create table spite_events (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references users(id) on delete restrict,
  merchant_id uuid not null references merchants(id) on delete restrict,

  country text not null,

  amount numeric(10,2) not null,
  currency char(3) not null,
  charge_date date not null,

  trial_started boolean not null,
  reminder_received reminder_status not null,

  cancel_attempted boolean not null,
  cancel_difficulty smallint,

  refund_requested boolean not null,
  refund_received refund_status not null default 'not_requested',

  switch_intent boolean not null,
  preferred_alternative text,
  user_story text,

  evidence_quality text not null default 'unknown',
  spite_score smallint not null default 0,
  status event_status not null default 'new',
  bounty_amount numeric(10,2) not null default 0,

  created_at timestamptz not null default now(),
  validated_at timestamptz,
  validator_notes text,

  constraint amount_positive check (amount >= 0),
  constraint cancel_difficulty_range check (
    cancel_difficulty is null or cancel_difficulty between 1 and 10
  ),
  constraint spite_score_range check (
    spite_score between 0 and 100
  ),
  constraint bounty_amount_range check (
    bounty_amount >= 0 and bounty_amount <= 3
  )
);

create index spite_events_status_idx on spite_events(status);
create index spite_events_merchant_idx on spite_events(merchant_id);
create index spite_events_created_at_idx on spite_events(created_at);

create table evidence_files (
  id uuid primary key default gen_random_uuid(),

  event_id uuid not null references spite_events(id) on delete cascade,

  storage_path text not null,
  original_filename text,
  file_type evidence_file_type not null,
  mime_type text,
  file_size_bytes bigint,

  contains_sensitive_data boolean,
  redaction_status redaction_status not null default 'pending_review',

  created_at timestamptz not null default now()
);

create index evidence_files_event_idx on evidence_files(event_id);

create table bounties (
  id uuid primary key default gen_random_uuid(),

  event_id uuid not null references spite_events(id) on delete restrict,
  user_id uuid not null references users(id) on delete restrict,

  amount numeric(10,2) not null,
  currency char(3) not null default 'EUR',
  status text not null default 'pending',

  payment_method text,
  payment_reference text,

  created_at timestamptz not null default now(),
  approved_at timestamptz,
  paid_at timestamptz,

  constraint bounties_amount_range check (amount >= 0 and amount <= 3)
);

create unique index bounties_event_unique_idx on bounties(event_id);

create view merchant_metrics as
select
  m.id as merchant_id,
  m.name,
  m.url,
  m.vertical,
  count(se.id) as total_events,
  avg(se.spite_score)::numeric(5,2) as avg_spite_score,
  avg(se.cancel_difficulty)::numeric(5,2) as avg_cancel_difficulty,
  avg(se.amount)::numeric(10,2) as avg_amount_charged,
  count(*) filter (where se.refund_requested = true) as refund_requested_count,
  count(*) filter (where se.refund_received = 'yes') as refund_received_count,
  count(*) filter (where se.switch_intent = true) as switch_intent_count,
  max(se.created_at) as latest_event_at
from merchants m
left join spite_events se on se.merchant_id = m.id
group by m.id, m.name, m.url, m.vertical;
