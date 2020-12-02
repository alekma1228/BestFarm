/*****************************************************************
Inserting rows into TA Raw table that were loaded into CME raw
table but not yet TA Raw table

Step 1: Get date diff between TA F Raw and CME F Raw
Step 2: Get date diff between TA FO Raw and CME FO Raw

Step 3: Copy CME F data to TA F 

Step 4: Copy CME FO data to TA FO data
*****************************************************************/


/*************************************************
Step 1:
Get FILE_DATEs being inserted right now
that are in CME history but not in the TA_F_RAW table
*************************************************/

-- Get file dates from Hist file table (Used for step 1 and 2)
drop table if exists tmp_cme_raw_file_dts;
CREATE TABLE tmp_cme_raw_file_dts (
	FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO tmp_cme_raw_file_dts
select BizDt as FILE_DATE 
from cme_rawfiledata A
group by 1
;


-- Get File dates from FHT table
drop table if exists tmp_taf_raw_file_dts;
CREATE  TABLE tmp_taf_raw_file_dts (
	FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;
INSERT INTO tmp_taf_raw_file_dts
select FILE_DATE 
from ta_f_rawfiledata
group by 1
;

-- Create file table of Hist dates not in FHT
drop table if exists tmp_file_dt_not_in_taf_raw;
CREATE  TABLE tmp_file_dt_not_in_taf_raw (
	FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO tmp_file_dt_not_in_taf_raw

select A.FILE_DATE 
from tmp_cme_raw_file_dts A
left join tmp_taf_raw_file_dts B
on A.FILE_DATE = B.FILE_DATE
where
B.FILE_DATE is null

order by 1
;

drop table tmp_taf_raw_file_dts;

/*************************************************
Step 2:
Get FILE_DATEs being inserted right now. Uses tmp_cme_raw_file_dts from above
that are in CME history but not in the TA_FO_RAW table
*************************************************/

-- Get File dates from FHT table
drop table if exists tmp_tafo_raw_file_dts;
CREATE  TABLE tmp_tafo_raw_file_dts (
	FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;
INSERT INTO tmp_tafo_raw_file_dts
select FILE_DATE 
from ta_fo_rawfiledata
group by 1
;

-- Create file table of Hist dates not in FHT
drop table if exists tmp_file_dt_not_in_tafo_raw;
CREATE  TABLE tmp_file_dt_not_in_tafo_raw (
	FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO tmp_file_dt_not_in_tafo_raw

select A.FILE_DATE 
from tmp_cme_raw_file_dts A
left join tmp_tafo_raw_file_dts B
on A.FILE_DATE = B.FILE_DATE
where
B.FILE_DATE is null

order by 1
;

drop table tmp_cme_raw_file_dts;
drop table tmp_tafo_raw_file_dts;

/*************************************************
Step 3:
For missing file dates, convert CME F data to TA F
format and insert into TA_Raw for that filedate
*************************************************/
insert into ta_f_rawfiledata

select 
trim(concat(trim(CommoditySymbol_TA_F_FILE_E), trim(right(year(MatDt), 1)), trim(upper(B.MonthSymbol)))) as FILE_OPTCODE

,A.BIZDT as FILE_DATE
,A.OpeningPrice * 100 as FILE_OPEN
,A.DHighPrice * 100 as FILE_HIGH
,A.DLowPrice * 100 as FILE_LOW
,A.SettlePrice * 100 as FILE_CLOSE
,A.PrevDayVol * 1.0 as FILE_VOLUME
,A.PrevDayOI * 1.0 as FILE_OPEN_INT
	
from cme_rawfiledata A

join setup_monthtype B
on month(A.MatDT) = B.MonthID

join setup_commoditytype C
on A.ID = C.CommoditySymbol_CME_GRP_SYM

join tmp_file_dt_not_in_taf_raw D
on A.BIZDT = D.FILE_DATE

where 
A.SecTyp = 'FUT'
and A.PrevDayOI <> 0
;


/*************************************************
*************************************************/
drop table tmp_file_dt_not_in_taf_raw;

/*************************************************
Step 4:
For missing file dates, convert CME FO data to TA FO
format and insert into TA_Raw for that filedate
*************************************************/
insert into ta_fo_rawfiledata

select
concat(FILE_OC_1, FILE_OC_2, INT_STRKPRX) as FILE_OPTCODE
,A.FILE_DATE
,A.FILE_OPEN
,A.FILE_HIGH
,A.FILE_LOW
,A.FILE_CLOSE
,A.FILE_VOLUME
,A.FILE_OPEN_INT

,A.FILE_A
,A.FILE_B

,A.FILE_STRIKE
,A.FILE_OPTMONTH
,A.FILE_RIGHT
,A.FILE_EXPIRY_STR
,A.FILE_FUTCODE

,coalesce(B.FILE_CLOSE, 0.0) as FILE_FUTPRICE  -- INCOMPLETE

from ( 

	select
	trim(concat( trim(C1.CommoditySymbol_TA_FO_FILE_E), trim(right(year(A.MatDT), 1)), trim(upper(B.MonthSymbol)) )) as FILE_OC_1
	,trim(case when A.PutCall = 0 then 'P' else 'C' end) as FILE_OC_2
	,floor(A.StrkPx * 100.0) as INT_STRKPRX

	-- NEED TO ADD IN INTEGER STRIKE PRICE HERE


	,A.BIZDT as FILE_DATE
	,A.OpeningPrice * 100 as FILE_OPEN
	,A.DHighPrice * 100 as FILE_HIGH
	,A.DLowPrice * 100 as FILE_LOW
	,A.SettlePrice * 100 as FILE_CLOSE
	,A.PrevDayVol * 1.0 as FILE_VOLUME
	,A.PrevDayOI * 1.0 as FILE_OPEN_INT

	,0.0 as FILE_A
	,0.0 as FILE_B

	,(A.StrkPx * 100.0) as FILE_STRIKE  
	,left(B.MonthName,3) as FILE_OPTMONTH 
	,case when A.PutCall = 0 then 'Put' else 'Call' end as FILE_RIGHT
	,cast(DATE_FORMAT(A.LastTrdDt, '%m/%d/%Y') as CHAR(10)) as FILE_EXPIRY_STR
	,concat(trim(C2.CommoditySymbol_TA_F_FILE_E), trim(right(year(A.MatDT), 1)), trim(upper(B.MonthSymbol))) as FILE_FUTCODE
	-- ,0.0 as FILE_FUTPRICE  -- INCOMPLETE


	from cme_rawfiledata A

	join setup_monthtype B
	on floor(right(floor(A.UndlyMMY) ,2)) = B.MonthID -- Cast YYYYMM to get int from MM

	join setup_commoditytype C1
	on trim(A.Sym) = trim(C1.CommoditySymbol_CME_FO_SYM)
	
	join setup_commoditytype C2
	on trim(A.UndlyID) = (C2.CommoditySymbol_CME_GRP_SYM)

	join tmp_file_dt_not_in_tafo_raw D
	on A.BIZDT = D.FILE_DATE

	join (
		select
		BIZDT
		,SYM
		,ID
		,STRKPX
		,UndlyID
		,UNDLYMMY
		,max(MATDT) as MATDT

		from cme_rawfiledata A

		where 
		A.SecTyp = 'OOF'

		group by 1,2,3,4,5,6

	) MAXDT 
	on A.BIZDT = MAXDT.BIZDT
	and A.SYM = MAXDT.SYM
	and A.ID = MAXDT.ID
	and A.STRKPX = MAXDT.STRKPX
	and A.UndlyID = MAXDT.UndlyID
	and A.UNDLYMMY = MAXDT.UNDLYMMY
	and A.MATDT = MAXDT.MATDT

	where 
	A.SecTyp = 'OOF'
	and A.PrevDayOI <> 0
	
) A

left outer join ta_f_rawfiledata B
on A.FILE_DATE = B.FILE_DATE
and A.FILE_FUTCODE = B.FILE_OPTCODE
;



/*************************************************
*************************************************/
drop table tmp_file_dt_not_in_tafo_raw;



