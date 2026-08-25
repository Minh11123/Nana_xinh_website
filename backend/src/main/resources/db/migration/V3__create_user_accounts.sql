create table user_accounts (
  id bigserial primary key,
  email varchar(255) not null unique,
  password_hash varchar(255) not null,
  full_name varchar(255) not null,
  role varchar(40) not null,
  active boolean default true,
  password_reset_token varchar(255),
  password_reset_expires_at timestamp with time zone,
  last_login_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_user_accounts_email on user_accounts(lower(email));
create index idx_user_accounts_reset_token on user_accounts(password_reset_token);
