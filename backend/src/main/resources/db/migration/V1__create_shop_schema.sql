create table categories (
  id bigserial primary key,
  slug varchar(255) not null unique,
  name varchar(255) not null,
  description varchar(1000),
  image_url varchar(1000),
  sort_order integer default 0,
  active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table products (
  id bigserial primary key,
  category_id bigint not null references categories(id),
  slug varchar(255) not null unique,
  name varchar(255) not null,
  sku varchar(120) unique,
  description text,
  price numeric(12, 2) not null,
  sale_price numeric(12, 2),
  image_url varchar(1000),
  stock_quantity integer default 0,
  featured boolean default false,
  active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table customers (
  id bigserial primary key,
  full_name varchar(255) not null,
  phone varchar(50) not null,
  email varchar(255),
  address varchar(1000),
  notes varchar(1000),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_customers_phone on customers(phone);

create table orders (
  id bigserial primary key,
  customer_id bigint not null references customers(id),
  recipient_name varchar(255) not null,
  recipient_phone varchar(50) not null,
  delivery_address varchar(1000) not null,
  delivery_date date,
  delivery_time_slot varchar(100),
  note text,
  subtotal numeric(12, 2) not null,
  shipping_fee numeric(12, 2) not null,
  total numeric(12, 2) not null,
  status varchar(40) not null default 'NEW',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table order_items (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id bigint not null references products(id),
  product_name varchar(255) not null,
  unit_price numeric(12, 2) not null,
  quantity integer not null,
  line_total numeric(12, 2) not null
);
