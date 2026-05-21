-- After signing up via /admin/login, promote that account to admin.
-- Replace YOUR_EMAIL@HERE with the email used during sign-up.
insert into public.admins (user_id, email)
select id, email from auth.users where email = 'YOUR_EMAIL@HERE'
on conflict (user_id) do nothing;
