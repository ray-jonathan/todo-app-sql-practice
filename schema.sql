
create table users (
    id serial primary key,
    first_name varchar(100), -- "varchar" is equivalent to "character varying"
    last_name varchar(100),  -- "varying" just means that it won't be filled with spaces
    email varchar(200),
    password varchar(500)    -- we don't store passwords, we store "hashes"
                            -- NEVEREVEREVER store passwords unencrypted  
);

create table todo (
    id serial primary key,
    task varchar(200),
    complete boolean default false,
    user_id integer references users(id)
);