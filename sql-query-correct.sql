select t.user_id, t.date, t.first_value, te.last_value from
(
select DISTINCT a.user_id, to_date(cast(a.created_at as TEXT),'YYYY-MM-DD') as date, a.value as first_value from test a
join
    (select user_id, MIN(created_at) date from test
    group by 1, to_date(cast(created_at as TEXT),'YYYY-MM-DD')) min on a.user_id = min.user_id AND a.created_at = min.date

) t

join
(
select DISTINCT a.user_id, to_date(cast(a.created_at as TEXT),'YYYY-MM-DD') as date, a.value as last_value from test a
join
    (select user_id, MAX(created_at) date from test
    group by 1, to_date(cast(created_at as TEXT),'YYYY-MM-DD')) min on a.user_id = min.user_id AND a.created_at = min.date

) te ON t.user_id = te.user_id AND t.date = te.date
