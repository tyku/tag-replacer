select a.user_id, to_date(cast(a.date as TEXT),'YYYY-MM-DD') as date, a.first_value, b.last_value  FROM
(
    select a.user_id, a.created_at as date, a.value as first_value FROM test a
    join
    (select user_id, MIN(created_at) date from test
    group by user_id) t on a.user_id = t.user_id AND a.created_at = t.date
) a

join
(
    select a.user_id, a.created_at as date, a.value as last_value FROM test a
    join
    (select user_id, MAX(created_at) date from test
    group by user_id) t on a.user_id = t.user_id AND a.created_at = t.date
) b ON a.user_id = b.user_id
