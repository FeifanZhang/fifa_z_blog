# INSERT SELECT 联合使用
* 最常见的基础情况，就是向表A中插入表B的数据

## A B两张表字段一致
```sql
-- 将B中全部数据copy至A
INSERT INTO A (SELECT * FROM B);
-- 将B中b > 4的数据copy至B
INSERT INTO A (SELECT * FROM B WHERE b > 4);
```
## A B表字段不一致
```sql
-- 只将B的部分数据插入A
INSERT INTO A(a,b,c) (SELECT a,b,c FROM B);

-- 将B数据中的a字段处理后，插入A
INSERT INTO A(a,b,c) (SELECT LEFT(a,4),b,c FROM B);

-- 将仅存在于B中的数据插入A中
INSERT INTO A(a,b,c) (
    SELECT a,b,c 
    FROM B 
    WHERE NOT EXISTS (
        SELECT a,b,c
        FROM A
        WHERE B.id = A.id
    )
);
/*
SELECT的作用：拿到B表中的所有数据
WHERE NOT EXISTS的作用：将B表中与A相等（B.id=A.id）的项排除
最内层WHERE的作用：目标是将A,B表数据相等的排除，WHERE的作用就是定义什么样的数据称为相等（即A、B的id相等），当然也可以替换成其他条件（如在其他情况下，可能A、B两表的a、b两字段联合主键）
*/

-- 将仅存在于B中的数据处理后，插入B中
INSERT INTO A(a,b,c) (
    SELECT LEFT(a,4),b,c 
    FROM B 
    WHERE NOT EXISTS (
        SELECT a,b,c
        FROM A
        WHERE B.id = A.id
    )
);
```

# UPDATE SELECT 联合使用
* 获取分数表中每个学生的分数，并更新至学生表中
```sql
UPDATE STUDENT
INNER JOIN(
    SELECT *
    FROM SCORE 
) SC  -- update与 inner join连用必须要给内嵌的表新的名称
ON SC.id = STUDENT.id
SET
    STUDENT.score = SC.score;
```

# 参考
* [mysql把A表的数据插入到B表](https://blog.csdn.net/weixin_38192427/article/details/119755236)